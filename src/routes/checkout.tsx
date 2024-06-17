import { Header } from "@/components/pages/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    ICartProduct,
    INewPurchase,
    IPurchaseProducts,
} from "@/interfaces/purchase.interface";
import { API_URL } from "@/lib/api_url";
import { toCurrency } from "@/lib/utils";
import { CartService, setCount } from "@/service/cart.service";
import { PurchaseService } from "@/service/purchase.service";
import { UserService } from "@/service/user.service";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/checkout")({
    beforeLoad: async ({ location }) => {
        if (!(await UserService.isLogged())) {
            throw redirect({
                to: "/login",
                search: {
                    redirect: location.href,
                },
            });
        }
    },
    component: Checkout,
});

function Checkout() {
    const [cart, setCart] = useState<ICartProduct[]>(CartService.getCart());

    const [counterChange, setCounterChange] = useState<number>(0);

    useEffect(() => {
        setCart(CartService.getCart());
    }, [counterChange]);

    const [newPurchase, setNewPurchase] = useState<INewPurchase>({
        status: "В обработке",
        sum: priceSum() + 1000,
        products: getId(),
    });

    const [city, setCity] = useState<string>();
    const [address, setAddress] = useState<string>();
    const [index, setIndex] = useState<string>();

    function compareAddress(
        city: string | undefined,
        address: string | undefined,
        index: string | undefined
    ) {
        setNewPurchase({
            ...newPurchase,
            address: `${city ? city : "..."}, ${address ? address : "..."}, ${index ? index : "..."}`,
        });
    }

    useEffect(() => {
        compareAddress(city, address, index);
    }, [city, address, index]);

    function getId() {
        const products: IPurchaseProducts[] = [];

        cart.forEach((product) => {
            if (product) {
                products.push({
                    product: product.product.id,
                    count: product.count,
                });
            }
        });

        return products;
    }

    async function getUserId() {
        const data = await UserService.getProfile();
        setNewPurchase({ ...newPurchase, user: data.id as number });
    }

    useEffect(() => {
        getUserId();
    }, []);

    useEffect(() => {
        setNewPurchase({
            ...newPurchase,
            products: getId(),
            sum: priceSum() + 1000,
        });
    }, [cart]);

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

    function discountSum() {
        const sum = cart?.reduce((accumulator, object) => {
            if (object.product.discount) {
                return (
                    accumulator +
                    Number(object.product.price) *
                        (object.product.discount.discount_value / 100) *
                        object.count
                );
            } else {
                return accumulator;
            }
        }, 0);
        return sum;
    }

    function countSum() {
        return cart?.reduce((accumulator, object) => {
            return accumulator + object.count;
        }, 0);
    }

    async function handleSubmit() {
        const data = await PurchaseService.create(newPurchase);

        console.log(data);
    }

    return (
        <>
            <Header />
            <div className="max-w-[1500px] w-full mx-auto relative">
                <Card>
                    <CardHeader>
                        <h1 className="text-2xl font-bold">
                            Оформление заказа
                        </h1>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-5 flex-col">
                            <div className="flex items-center gap-5">
                                <div className="w-10 h-10 rounded-full bg-primary text-white flex justify-center items-center">
                                    1
                                </div>
                                <h1 className="font-bold text-xl">
                                    Товары в заказе
                                </h1>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="mx-4 px-5 border-l-4 w-full border-primary flex flex-col gap-5">
                                    {cart.map((product) => (
                                        <Card className="p-2 w-[70%]">
                                            <div className="flex h-52 gap-5">
                                                <div
                                                    className="w-52 bg-no-repeat bg-center h-52 bg-contain rounded-xl"
                                                    style={{
                                                        backgroundImage: `url(${API_URL}/${product.product.image})`,
                                                    }}
                                                ></div>
                                                <div className="flex flex-col justify-center gap-2 w-[50%]">
                                                    <p className="font-bold text-xl">
                                                        <span className="text-primary">
                                                            {
                                                                product.product
                                                                    .brand.name
                                                            }
                                                        </span>{" "}
                                                        {product.product.model}
                                                    </p>
                                                    <div className="">
                                                        {product.product
                                                            .discount ? (
                                                            <p className="text-lg roboto line-through text-primary">
                                                                {toCurrency(
                                                                    Number(
                                                                        product
                                                                            .product
                                                                            .price
                                                                    ) *
                                                                        product.count
                                                                )}
                                                            </p>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        <p className="text-2xl roboto">
                                                            {product.product
                                                                .discount
                                                                ? toCurrency(
                                                                      Math.round(
                                                                          Number(
                                                                              product
                                                                                  .product
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
                                                                      ) *
                                                                          product.count
                                                                  )
                                                                : toCurrency(
                                                                      Number(
                                                                          product
                                                                              .product
                                                                              .price
                                                                      ) *
                                                                          product.count
                                                                  )}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-center">
                                                    <Button
                                                        variant={"destructive"}
                                                        disabled={
                                                            cart.length == 1
                                                        }
                                                        onClick={() => {
                                                            CartService.removePiece(
                                                                product
                                                            );
                                                            setCart(
                                                                CartService.getCart()
                                                            );
                                                        }}
                                                    >
                                                        x
                                                    </Button>
                                                </div>
                                                <div className="flex gap-1 items-center justify-center">
                                                    <Button
                                                        variant={"outline"}
                                                        disabled={
                                                            product.count == 1
                                                        }
                                                        onClick={() =>
                                                            handleCount(
                                                                "-",
                                                                product
                                                            )
                                                        }
                                                    >
                                                        -
                                                    </Button>
                                                    <p>{product.count}</p>
                                                    <Button
                                                        variant={"outline"}
                                                        onClick={() =>
                                                            handleCount(
                                                                "+",
                                                                product
                                                            )
                                                        }
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="w-10 h-10 rounded-full bg-primary text-white flex justify-center items-center">
                                    2
                                </div>
                                <h1 className="font-bold text-xl">
                                    Выбор адреса доставки
                                </h1>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="mx-4 px-5 border-l-4 w-full border-primary flex flex-col gap-5">
                                    <div className="">
                                        <Label>Город</Label>
                                        <Input
                                            required
                                            placeholder="г. Иркутск"
                                            onChange={(e) =>
                                                setCity(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="">
                                        <Label>Улица</Label>
                                        <Input
                                            required
                                            placeholder="ул. Ленина, 1"
                                            onChange={(e) =>
                                                setAddress(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="">
                                        <Label>Почтовый индекс</Label>
                                        <Input
                                            required
                                            placeholder="664001"
                                            onChange={(e) =>
                                                setIndex(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="w-10 h-10 rounded-full bg-primary text-white flex justify-center items-center">
                                    3
                                </div>
                                <h1 className="font-bold text-xl">Оплата</h1>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="mx-4 px-5 border-l-4 w-full border-primary flex flex-col gap-5">
                                    <div className="flex flex-col w-[30%] gap-5">
                                        <Button
                                            variant={
                                                newPurchase.payType == "SberPay"
                                                    ? "default"
                                                    : "outline"
                                            }
                                            onClick={() =>
                                                setNewPurchase({
                                                    ...newPurchase,
                                                    payType: "SberPay",
                                                })
                                            }
                                        >
                                            SBERPAY
                                        </Button>
                                        <Button
                                            variant={
                                                newPurchase.payType ==
                                                "QR-код СБП"
                                                    ? "default"
                                                    : "outline"
                                            }
                                            onClick={() =>
                                                setNewPurchase({
                                                    ...newPurchase,
                                                    payType: "QR-код СБП",
                                                })
                                            }
                                        >
                                            QR-КОД СБП
                                        </Button>
                                        <Button
                                            variant={
                                                newPurchase.payType == "Карта"
                                                    ? "default"
                                                    : "outline"
                                            }
                                            onClick={() =>
                                                setNewPurchase({
                                                    ...newPurchase,
                                                    payType: "Карта",
                                                })
                                            }
                                        >
                                            КАРТА
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="w-10 h-10 rounded-full bg-primary text-white flex justify-center items-center">
                                    4
                                </div>
                                <h1 className="font-bold text-xl">
                                    Подтверждение
                                </h1>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="mx-4 px-5 border-l-4 w-full border-primary flex flex-col gap-5">
                                    <div className="text-xl">
                                        <div className="p-2">
                                            <h1 className="font-bold">
                                                Адрес доставки
                                            </h1>
                                            <p>
                                                {newPurchase.address
                                                    ? newPurchase.address
                                                    : "..."}
                                            </p>
                                        </div>

                                        <div className="p-2">
                                            <h1 className="font-bold">
                                                Способ оплаты
                                            </h1>
                                            <p>
                                                {newPurchase.payType
                                                    ? newPurchase.payType
                                                    : "..."}
                                            </p>
                                        </div>

                                        <div className="p-2">
                                            <div className="py-4">
                                                <p>
                                                    <span className="font-bold">
                                                        {countSum()} товара:{" "}
                                                    </span>
                                                    {toCurrency(
                                                        newPurchase.sum - 1000
                                                    )}
                                                </p>
                                                <p
                                                    className="text-lg text-primary"
                                                    key={countSum()}
                                                >
                                                    <span className="font-bold">
                                                        Сумма скидки:{" "}
                                                    </span>
                                                    {toCurrency(discountSum())}
                                                </p>
                                            </div>
                                            <p>
                                                <span className="font-bold">
                                                    Доставка:
                                                </span>{" "}
                                                {toCurrency(1000)}
                                            </p>
                                            <p>
                                                <span className="font-bold">
                                                    К оплате:
                                                </span>{" "}
                                                {toCurrency(newPurchase.sum)}
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        className="w-40"
                                        onClick={() => handleSubmit()}
                                    >
                                        Оформить заказ
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
