import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ShoppingCart } from "lucide-react";
import { CartService, setCount } from "@/service/cart.service";
import { API_URL } from "@/lib/api_url";
import { toCurrency } from "@/lib/utils";
import { Button } from "../ui/button";
import { IProduct } from "@/interfaces/product.interface";
import { ICartProduct } from "@/interfaces/purchase.interface";
import { Link } from "@tanstack/react-router";
import { Card } from "../ui/card";

export const Cart = () => {
    const [cart, setCart] = useState<ICartProduct[]>();

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
        setCart(CartService.getCart());
    }, []);
    return (
        <>
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
                                            Number(product.product.price) * product.count
                                        )}
                                    </p>
                                ) : (
                                    <></>
                                )}
                                <p className="text-2xl roboto">
                                    {product.product.discount
                                        ? toCurrency(
                                              Number(
                                                  Math.round(
                                                      Number(
                                                          product.product.price
                                                      ) /
                                                          (product.product
                                                              .discount
                                                              .discount_value /
                                                              100 +
                                                              1)
                                                  )
                                              ) * product.count
                                          )
                                        : toCurrency(
                                              Number(product.product.price) * product.count
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
            <div className="flex justify-end">
                <Link to="/checkout">
                    <Button>Оформить заказ</Button>
                </Link>
            </div>
        </>
    );
};
