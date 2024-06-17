import { useEffect, useState } from "react";
import { CartService, setCount } from "@/service/cart.service";
import { API_URL } from "@/lib/api_url";
import { toCurrency } from "@/lib/utils";
import { Button } from "../ui/button";
import { ICartProduct } from "@/interfaces/purchase.interface";
import { Link } from "@tanstack/react-router";
import { Card } from "../ui/card";
import { useMediaQuery } from "react-responsive";
import { ScrollArea } from "../ui/scroll-area";

export const Cart = () => {
    const [cart, setCart] = useState<ICartProduct[]>(CartService.getCart());

    const [mounted, setMounted] = useState<boolean>(false);

    const [counterChange, setCounterChange] = useState<number>(0);

    useEffect(() => {
        setCart(CartService.getCart());
    }, [counterChange]);

    function handleCount(crement: setCount, cartItem: ICartProduct) {
        if (crement == "-") {
            if (cartItem.count != 1) {
                CartService.setCount(crement, cartItem.product);
                setCounterChange(counterChange + 1);
            }
        } else {
            CartService.setCount(crement, cartItem.product);
            setCounterChange(counterChange + 1);
        }
    }

    useEffect(() => {
        /* setCart(); */
        setMounted(true);
    }, []);

    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 800px)" });

    function priceSum() {
        const sum = cart?.reduce((accumulator, object) => {
            if (object.product.discount) {
                return (
                    accumulator +
                    Math.round(
                        Number(object.product.price) -
                            Number(object.product.price) *
                                (object.product.discount.discount_value / 100)
                    ) *
                        object.count
                );
            } else {
                return (
                    accumulator + Number(object.product.price) * object.count
                );
            }
        }, 0);
        return sum;
    }

    if (!mounted) return null;

    if (cart?.length == 0) return <p>Корзина пуста!</p>;

    if (isTabletOrMobile)
        return (
            <>
                <ScrollArea className="h-[500px] min-h-[500px] min-w-none flex items-center justify-center">
                    {cart?.map((product) => (
                        <div className="p-2 my-4 mx-2">
                            <div className="flex h-52 gap-5 items-center">
                                <div
                                    className="w-24 bg-no-repeat bg-center h-52 bg-contain rounded-xl"
                                    style={{
                                        backgroundImage: `url(${API_URL}/${product.product.image})`,
                                    }}
                                ></div>
                                <div className="flex flex-col justify-center gap-4 w-1/6">
                                    <p className="font-bold text-sm">
                                        <span className="text-primary">
                                            {product.product.brand.name}
                                        </span>{" "}
                                        {product.product.model}
                                    </p>
                                    <div className="">
                                        {product.product.discount ? (
                                            <p className="text-sm roboto line-through text-primary">
                                                {toCurrency(
                                                    Number(
                                                        product.product.price
                                                    ) * product.count
                                                )}
                                            </p>
                                        ) : (
                                            <></>
                                        )}
                                        <p className="text-sm roboto">
                                            {product.product.discount
                                                ? toCurrency(
                                                      Math.round(
                                                          Number(
                                                              product.product
                                                                  .price
                                                          ) -
                                                              Number(
                                                                  product
                                                                      .product
                                                                      .price
                                                              ) *
                                                                  (product
                                                                      .product
                                                                      .discount
                                                                      .discount_value /
                                                                      100)
                                                      ) * product.count
                                                  )
                                                : toCurrency(
                                                      Number(
                                                          product.product.price
                                                      ) * product.count
                                                  )}
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    size={"sm"}
                                    variant={"destructive"}
                                    onClick={() => {
                                        CartService.removePiece(product);
                                        setCart(CartService.getCart());
                                    }}
                                >
                                    x
                                </Button>
                                <div className="flex items-center gap-1">
                                    <Button
                                        size={"sm"}
                                        variant={"outline"}
                                        disabled={product.count == 1}
                                        onClick={() =>
                                            handleCount("-", product)
                                        }
                                    >
                                        -
                                    </Button>
                                    <p>{product.count}</p>
                                    <Button
                                        size={"sm"}
                                        variant={"outline"}
                                        onClick={() =>
                                            handleCount("+", product)
                                        }
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="flex items-center justify-around">
                        <div className="flex text-xl font-bold">
                            Итого: {toCurrency(Number(priceSum()))}
                        </div>
                        <div className="flex items-center">
                            <Link to="/checkout">
                                <Button size={"sm"}>Оформить заказ</Button>
                            </Link>
                        </div>
                    </div>
                </ScrollArea>
            </>
        );

    return (
        <div className="w-[670px]">
            <ScrollArea className="h-[500px] max-w-[1000px]">
                {cart?.map((product) => (
                    <Card className="p-2 my-4">
                        <div className="flex h-52 gap-5 items-center">
                            <div
                                className="w-52 bg-no-repeat bg-center h-52 bg-contain rounded-xl"
                                style={{
                                    backgroundImage: `url(${API_URL}/${product.product.image})`,
                                }}
                            ></div>
                            <div className="flex flex-col justify-center gap-4 w-1/3">
                                <p className="font-bold text-xl">
                                    <span className="text-primary">
                                        {product.product.brand.name}
                                    </span>{" "}
                                    {product.product.model}
                                </p>
                                <div className="">
                                    {product.product.discount ? (
                                        <p className="text-lg roboto line-through text-primary">
                                            {toCurrency(
                                                Number(product.product.price) *
                                                    product.count
                                            )}
                                        </p>
                                    ) : (
                                        <></>
                                    )}
                                    <p className="text-2xl roboto">
                                        {product.product.discount
                                            ? toCurrency(
                                                  Math.round(
                                                      Number(
                                                          product.product.price
                                                      ) -
                                                          Number(
                                                              product.product
                                                                  .price
                                                          ) *
                                                              (product.product
                                                                  .discount
                                                                  .discount_value /
                                                                  100)
                                                  ) * product.count
                                              )
                                            : toCurrency(
                                                  Number(
                                                      product.product.price
                                                  ) * product.count
                                              )}
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant={"destructive"}
                                onClick={() => {
                                    CartService.removePiece(product);
                                    setCart(CartService.getCart());
                                }}
                            >
                                x
                            </Button>
                            <div className="flex items-center gap-1">
                                <Button
                                    variant={"outline"}
                                    disabled={product.count == 1}
                                    onClick={() => handleCount("-", product)}
                                >
                                    -
                                </Button>
                                <p>{product.count}</p>
                                <Button
                                    variant={"outline"}
                                    onClick={() => handleCount("+", product)}
                                >
                                    +
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
                <div className="flex justify-between    ">
                    <div className="flex text-3xl font-bold">
                        Итого: {toCurrency(Number(priceSum()))}
                    </div>
                    <div className="flex justify-end">
                        <Link to="/checkout">
                            <Button>Оформить заказ</Button>
                        </Link>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
};
