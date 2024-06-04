import { Footer } from '@/components/footer'
import { BannerCarousel } from "@/components/pages/catalog-components/banner-carousel";
import { CatalogGrid } from "@/components/pages/catalog-components/catalog-grid";
import { Categories } from "@/components/pages/catalog-components/categories";
import { FilterForm } from "@/components/pages/catalog-components/filter-form";
import { Header } from "@/components/pages/header";

import { ICategory } from "@/interfaces/category.interface";
import { IProduct } from "@/interfaces/product.interface";
import { CategoryService } from "@/service/category.service";
import { ProductService } from "@/service/product.service";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export type ProductSearch = {
    category?: string | string[];
    subcategory?: string | string[];
    material_fingerboard?: string | string[];
    material_body?: string | string[];
    form_body?: string | string[];
    pickup_config?: string | string[];
    count_string?: string | string[];
    metronome?: string | string[];
    count_keys?: string | string[];
    record?: string | string[];
    material?: string | string[];
    diameter?: string | string[];
    color?: string | string[];
    type?: string | string[];
    search?: string;
    max?: number;
    brand?: string;
};

export const Route = createFileRoute("/")({
    validateSearch: (search: Record<string, unknown>): ProductSearch => {
        return {
            category: search.category as string | string[],
            subcategory: search.subcategory as string | string[],
            material_fingerboard: search.material_fingerboard as
                | string
                | string[],
            material_body: search.material_body as string | string[],
            form_body: search.form_body as string | string[],
            pickup_config: search.pickup_config as string | string[],
            count_string: search.count_string as string | string[],
            metronome: search.metronome as string | string[],
            count_keys: search.count_keys as string | string[],
            record: search.record as string | string[],
            material: search.material as string | string[],
            diameter: search.diameter as string | string[],
            color: search.color as string | string[],
            type: search.type as string | string[],
            search: search.serach as string,
            max: search.max as number,
            brand: search.brand as string,
        };
    },
    component: Index,
});

function Index() {
    const [products, setProducts] = useState<IProduct[]>();
    const [categories, setCategories] = useState<ICategory[]>();

    const { subcategory } = Route.useSearch();

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

    async function getAllCategories() {
        const data = await CategoryService.getAll();
        setCategories(data);
    }

    useEffect(() => {
        getAllProducts();
        getAllCategories();
    }, []);

    return (
        <>
            <Header />
            <div className="max-w-[1500px] w-full mx-auto relative">
                <BannerCarousel />
                <div className="py-40">
                    <Categories />
                </div>
                {subcategory ? (
                    <div className="">
                        <div className="flex justify-between">
                            {products ? (
                                <FilterForm
                                    categories={categories ? categories : null}
                                />
                            ) : (
                                <></>
                            )}
                            <div className="w-[62%]">
                                {products ? (
                                    <CatalogGrid
                                        products={products}
                                        categories={
                                            categories ? categories : null
                                        }
                                    />
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <Footer/>
        </>
    );
}
