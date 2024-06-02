import { useEffect, useState } from "react";
import { ProductList } from "./admin-components/product-control";
import { IProduct } from "@/interfaces/product.interface";
import { ProductService } from "@/service/product.service";
import { AuthAdmin } from "@/providers/auth";
import { BannerControl } from "./admin-components/banner-control";
import { IBanner } from "@/interfaces/banner.interface";
import { BannerService } from "@/service/banner.service";
import { IDiscount } from "@/interfaces/discount.interface";
import { DiscountService } from "@/service/discount.service";
import { DiscountControl } from "./admin-components/discount-control";
import { CategoryService } from "@/service/category.service";
import { BrandService } from "@/service/brand.service";
import { PurchaseService } from "@/service/purchase.service";
import { IPurchase } from "@/interfaces/purchase.interface";
import { PurchaseControl } from "./admin-components/purchase-control";

export function Admin() {
    const [products, setProducts] = useState<IProduct[]>();
    const [banners, setBanners] = useState<IBanner[]>();
    const [disconts, setDiscounts] = useState<IDiscount[]>();
    const [purchases, setPurchases] = useState<IPurchase[]>();
    

    async function getAllProducts() {
        let data: IProduct[] = await ProductService.getAll();
        let parsedData = data.map((product) => {
            if (product.category.subcategory != "Аксессуары") {
                return {
                    ...product,
                    extra_parameters: JSON.parse(
                        product.extra_parameters.toString()
                    ),
                };
            }
            else {
                return {
                    ...product,
                    extra_parameters: {}
                }
            }
        });
        setProducts(parsedData);
    }
    async function getAllBanners() {
        const data: IBanner[] = (await BannerService.getAll()).sort((a, b) => {
            return (
                new Date(a.expired_at).getTime() -
                new Date(b.expired_at).getTime()
            );
        });
        setBanners(data);
    }

    async function getAllDisconts() {
        const data: IDiscount[] = (await DiscountService.getAll()).sort(
            (a, b) => {
                return (
                    new Date(a.expired_at).getTime() -
                    new Date(b.expired_at).getTime()
                );
            }
        );
        return data;
    }

    async function getAllPurchases() {
        const data: IPurchase[] = (await PurchaseService.getAll()).sort(
            (a, b) => {
                return (
                    new Date(a.created_at).getTime() -
                    new Date(b.created_at).getTime()
                );
            }
        );
        setPurchases(data);
    }

    async function typeParse(discounts: IDiscount[]) {
        let name: string[] = [];
        for (const discountPiece of discounts) {
            if (discountPiece.type == "one") {
                const data = await ProductService.getOne(discountPiece.target);
                name.push(data.brand.name + " " + data.model);
            }
            if (discountPiece.type == "category") {
                const data = await CategoryService.getOne(discountPiece.target);
                console.log(data);
                name.push(data.name + " - " + data.subcategory);
            }
            if (discountPiece.type == "brand") {
                const data = await BrandService.getOne(discountPiece.target);
                name.push(data.name);
            }
        }
        localStorage.setItem("targetNames", JSON.stringify(name));
    }

    async function getTypesAndDiscounts() {
        const discounts = await getAllDisconts();
        await typeParse(discounts);
        setDiscounts(discounts);
    }

    useEffect(() => {
        getAllProducts();
        getAllBanners();
        getTypesAndDiscounts();
        getAllPurchases();
    }, []);

    return (
        <AuthAdmin withError>
            <div className="max-w-[1500px] w-full mx-auto">
                {/* <ProductCreate /> */}
                <ProductList products={products ? products : null} />
                <BannerControl banners={banners ? banners : null} />
                <DiscountControl discounts={disconts ? disconts : null} />
                <PurchaseControl purchases={purchases ? purchases : null} />
            </div>
        </AuthAdmin>
    );
}
