import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    IDrumsParamsValues,
    IGuitarParamsValues,
    IPianoParamsValues,
} from "@/interfaces/extra_params.interface";
import { IProduct } from "@/interfaces/product.interface";
import { API_URL } from "@/lib/api_url";
import { subcategories } from "@/lib/extra-values";
import { toCurrency } from "@/lib/utils";
import { CartService } from "@/service/cart.service";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export const CatalogDetails = ({ product }: { product: IProduct }) => {
    const [selectedSubCategory, setSelectedSubCategory] = useState<
        IGuitarParamsValues | IPianoParamsValues | IDrumsParamsValues
    >();
    function findCategory() {
        const subcategoriesParams = subcategories.find(
            (subcategoryParam) =>
                product.category.subcategory == subcategoryParam.name
        );
        setSelectedSubCategory(subcategoriesParams?.extra_params);
    }
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 800px)" });

    const [productInCart, setProductInCart] = useState<boolean | undefined>(
        CartService.existInCart(product)
    );

    useEffect(() => {
        findCategory();
    }, []);

    useEffect(() => {
        setProductInCart(CartService.existInCart(product));
    }, [CartService.getCart()]);

    if (isTabletOrMobile)
        return (
            <Card className="w-[350px] py-4 h-[700px] outline-none border-0">
                <ScrollArea className="h-full">
                    <div className="grid grid-rows-3 h-full">
                        {product.discount ? (
                            <div className="px-10 absolute left-0 right-0 z-10">
                                <div className="flex gap-2">
                                    <Badge>
                                        Скидка {product.discount.discount_value}
                                        %
                                    </Badge>
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
                        <div
                            className="w-[95%] mx-auto h-full bg-contain bg-no-repeat bg-center rounded-lg"
                            style={{
                                backgroundImage: `url(${API_URL}/${product.image})`,
                            }}
                        ></div>
                        <div className="row-span-2">
                            <h1 className="text-3xl font-bold">
                                <span className="text-primary">
                                    {product.brand.name}
                                </span>{" "}
                                {product.model}
                            </h1>
                            <p className="text-lg">
                                {product.category.subcategory}
                            </p>
                            <div className="p-4 pl-0">
                                <div className="h-[50px] flex items-center gap-5">
                                    <p className="text-2xl font-bold text-primary">
                                        {product.discount
                                            ? toCurrency(
                                                  Number(
                                                      Math.round(
                                                          Number(
                                                              product.price
                                                          ) /
                                                              (product.discount
                                                                  .discount_value /
                                                                  100 +
                                                                  1)
                                                      )
                                                  )
                                              )
                                            : toCurrency(Number(product.price))}
                                    </p>

                                    {product.discount ? (
                                        <p className="text-2xl line-through">
                                            {toCurrency(Number(product.price))}
                                        </p>
                                    ) : (
                                        <></>
                                    )}
                                    <Button
                                        size={"sm"}
                                        disabled={productInCart}
                                        onClick={() => {
                                            CartService.addToCart(product);
                                            setProductInCart(true);
                                        }}
                                    >
                                        {productInCart
                                            ? "Товар в корзине"
                                            : "Добавить в корзину"}
                                    </Button>
                                </div>
                                <ScrollArea className="h-full">
                                    <div className="py-4">
                                        <h1 className="text-xl font-bold text-primary">
                                            Описание
                                        </h1>
                                        <p>{product.description}</p>
                                    </div>
                                    <div className="py-4">
                                        {selectedSubCategory &&
                                        product.category.subcategory !=
                                            "Аксессуары" ? (
                                            <>
                                                <h1 className="text-xl font-bold text-primary">
                                                    Характеристики
                                                </h1>
                                                {Object.keys(
                                                    selectedSubCategory
                                                ).map((key) => (
                                                    <div className="flex gap-1 px-2 py-1">
                                                        <p className="font-bold">
                                                            {
                                                                //@ts-ignore
                                                                selectedSubCategory[
                                                                    key
                                                                ].name
                                                            }{" "}
                                                            :{" "}
                                                        </p>

                                                        <p>
                                                            {
                                                                //@ts-ignore
                                                                product
                                                                    .extra_parameters[
                                                                    key
                                                                ]
                                                            }
                                                        </p>
                                                    </div>
                                                ))}
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </ScrollArea>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </Card>
        );

    return (
        <Card className="w-[1200px] py-4 h-[700px] outline-none border-0">
            <div className="grid grid-cols-3 h-full">
                {product.discount ? (
                    <div className="px-10 absolute left-0 right-0 z-10">
                        <div className="flex gap-2">
                            <Badge>
                                Скидка {product.discount.discount_value}%
                            </Badge>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
                <div
                    className="w-[95%] mx-auto h-full bg-contain bg-no-repeat bg-center rounded-lg"
                    style={{
                        backgroundImage: `url(${API_URL}/${product.image})`,
                    }}
                ></div>
                <div className="col-span-2">
                    <h1 className="text-5xl font-bold">
                        <span className="text-primary">
                            {product.brand.name}
                        </span>{" "}
                        {product.model}
                    </h1>
                    <p className="text-xl">{product.category.subcategory}</p>
                    <div className="p-4 pl-0">
                        <div className="h-[50px] flex items-center gap-5">
                            <p className="text-3xl font-bold text-primary">
                                {product.discount
                                    ? toCurrency(
                                          Number(
                                              Math.round(
                                                  Number(product.price) /
                                                      (product.discount
                                                          .discount_value /
                                                          100 +
                                                          1)
                                              )
                                          )
                                      )
                                    : toCurrency(Number(product.price))}
                            </p>

                            {product.discount ? (
                                <p className="text-2xl line-through">
                                    {toCurrency(Number(product.price))}
                                </p>
                            ) : (
                                <></>
                            )}
                            <Button
                                disabled={productInCart}
                                onClick={() => {
                                    CartService.addToCart(product);
                                    setProductInCart(true);
                                }}
                            >
                                {productInCart
                                    ? "Товар в корзине"
                                    : "Добавить в корзину"}
                            </Button>
                        </div>
                        <ScrollArea className="h-full">
                            <div className="py-4">
                                <h1 className="text-xl font-bold text-primary">
                                    Описание
                                </h1>
                                <p>{product.description}</p>
                            </div>
                            <div className="py-4">
                                {selectedSubCategory &&
                                product.category.subcategory != "Аксессуары" ? (
                                    <>
                                        <h1 className="text-xl font-bold text-primary">
                                            Характеристики
                                        </h1>
                                        {Object.keys(selectedSubCategory).map(
                                            (key) => (
                                                <div className="flex gap-1 px-2 py-1">
                                                    <p className="font-bold">
                                                        {
                                                            //@ts-ignore
                                                            selectedSubCategory[
                                                                key
                                                            ].name
                                                        }{" "}
                                                        :{" "}
                                                    </p>

                                                    <p>
                                                        {
                                                            //@ts-ignore
                                                            product
                                                                .extra_parameters[
                                                                key
                                                            ]
                                                        }
                                                    </p>
                                                </div>
                                            )
                                        )}
                                    </>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </Card>
    );
};
