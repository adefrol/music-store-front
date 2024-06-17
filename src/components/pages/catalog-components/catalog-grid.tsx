import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IProduct } from "@/interfaces/product.interface";
import { API_URL } from "@/lib/api_url";
import { ShoppingCart } from "lucide-react";
import { Route } from "@/routes/index";
import { useEffect, useState } from "react";
import { ICategory } from "@/interfaces/category.interface";
import { Badge } from "@/components/ui/badge";
import { CatalogDetails } from "./catalog-details";
import { toCurrency } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CartService } from "@/service/cart.service";
import { useMediaQuery } from "react-responsive";

export const CatalogGrid = ({
    products,
}: {
    products: IProduct[] | null;
    categories?: ICategory[] | null;
    extraParams?: Object;
}) => {
    const searchParams = Route.useSearch();

    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 800px)" });

    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>();

    async function filterByCategory() {
        if (products) {
            let filtered = products;
            if (searchParams.category) {
                if (searchParams.subcategory) {
                    filtered = products?.filter((product) => {
                        return product.category.name == searchParams.category;
                    });
                    setFilteredProducts(filteredProducts);
                } else {
                    setFilteredProducts(products);
                }
            }
            if (searchParams.subcategory) {
                filtered = filtered?.filter((product) => {
                    return (
                        product.category.subcategory ==
                            searchParams.subcategory &&
                        product.category.name == searchParams.category
                    );
                });
                setFilteredProducts(filteredProducts);
            } else {
                setFilteredProducts(products);
            }
            localStorage.setItem(
                "max",
                Math.max
                    .apply(
                        null,
                        filtered.map((product) => Number(product.price))
                    )
                    .toString()
            );
            console.log(filtered);
            if (searchParams.brand) {
                filtered = filtered?.filter((product) => {
                    return product.brand.name == searchParams.brand;
                });
            }
            if (searchParams.search) {
                filtered = filtered?.filter((product) => {
                    return (
                        product.model
                            .toLowerCase()
                            .includes(searchParams.search!.toLowerCase()) ||
                        product.brand.name
                            .toLowerCase()
                            .includes(searchParams.search!.toLowerCase())
                    );
                });
            }
            if (searchParams.max) {
                filtered = filtered?.filter((product) => {
                    if (searchParams.max) {
                        return Number(product.price) <= searchParams.max;
                    }
                });
            }
            (Object.keys(searchParams) as Array<keyof typeof searchParams>).map(
                (key) => {
                    if (
                        key != "category" &&
                        key != "subcategory" &&
                        key != "brand" &&
                        key != "max" &&
                        key != "search" &&
                        filtered != null &&
                        searchParams[key] != undefined
                    ) {
                        filtered = filtered.filter((product) => {
                            if (
                                (searchParams[key] as string[]).includes(
                                    //@ts-ignore
                                    product.extra_parameters[key]
                                )
                            ) {
                                return true;
                            }
                        });
                    }
                }
            );

            setFilteredProducts(filtered);
        } else return;
    }

    useEffect(() => {
        filterByCategory();
    }, [searchParams]);

    useEffect(() => {
        filterByCategory();
    }, []);
    return (
        <div
            className={`grid ${isTabletOrMobile ? "grid-cols-1" : "grid-cols-3"} gap-y-5 relative transition-all`}
        >
            {filteredProducts?.map((product) => (
                <Card
                    key={product.id}
                    className="w-[95%] animate-in h-[400px] hover:shadow-2xl group relative transition-all cursor-pointer"
                >
                    {product.discount ? (
                        <div className="p-2 absolute left-0 right-0 z-10">
                            <div className="flex gap-2">
                                <Badge>
                                    Скидка {product.discount.discount_value}%
                                </Badge>
                            </div>
                        </div>
                    ) : (
                        <div className=""></div>
                    )}
                    <div className=" transition-all group-hover:blur-[3px] relative">
                        <div
                            className="w-[95%] mx-auto h-[300px] bg-contain bg-no-repeat bg-center rounded-lg"
                            style={{
                                backgroundImage: `url(${API_URL}/${product.image})`,
                            }}
                        ></div>
                        <p className="text-center font-normal text-xl">
                            <span className="text-primary font-bold">
                                {product.brand.name}
                            </span>{" "}
                            {product.model}
                        </p>
                        <p className="text-center font-semibold text-xl">
                            {product.discount ? (
                                <span className="line-through font-normal">
                                    {toCurrency(Number(product.price))}
                                </span>
                            ) : (
                                <></>
                            )}{" "}
                            {product.discount
                                ? toCurrency(
                                      Number(
                                          Math.round(
                                              Number(product.price) -
                                                  Number(product.price) *
                                                      (product.discount
                                                          .discount_value /
                                                          100)
                                          )
                                      )
                                  )
                                : toCurrency(Number(product.price))}
                        </p>
                    </div>
                    <div className="opacity-0 top-[50%] absolute w-full px-2 group-hover:opacity-100  transition-all">
                        <div className="grid grid-cols-2 gap-5 w-full h-full">
                            <Button
                                onClick={() => {
                                    CartService.addToCart(product);
                                }}
                            >
                                <ShoppingCart />
                            </Button>
                            <Dialog>
                                <DialogTrigger className="flex justify-center">
                                    <Button
                                        className="w-full"
                                        variant={"default"}
                                    >
                                        Подробнее
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="w-fit max-w-none flex items-center justify-center">
                                    <CatalogDetails product={product} />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};
