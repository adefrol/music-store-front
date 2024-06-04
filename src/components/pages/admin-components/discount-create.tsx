import { Loading } from "@/components/loading";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { IBrand } from "@/interfaces/brand.interface";
import { ICategory } from "@/interfaces/category.interface";
import { DiscountTypes, INewDiscount } from "@/interfaces/discount.interface";
import { IProduct } from "@/interfaces/product.interface";
import { BrandService } from "@/service/brand.service";
import { CategoryService } from "@/service/category.service";
import { DiscountService } from "@/service/discount.service";
import React, { useEffect, useState } from "react";
import { toast } from 'sonner'

export const DiscountCreate = ({ product }: { product?: IProduct }) => {
    const [newDiscount, setNewDiscount] = useState<INewDiscount | null>(
        product ? { target: product.id, type: "one" } : null
    );

    const [loading, setLoading] = useState<boolean>(false);

    const [categories, setCategories] = useState<ICategory[]>();
    const [brands, setBrands] = useState<IBrand[]>();

    async function getCategoriesBrands() {
        setLoading(true);
        const categoriesData = await CategoryService.getAll();
        const brandsData = await BrandService.getAll();

        setLoading(false);
        setBrands(brandsData);
        setCategories(categoriesData);
    }

    async function handleCreate(e: React.SyntheticEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            if (newDiscount) {
                const data = await DiscountService.create(newDiscount);
                if (data == 404) {
                    toast("Нет товаров для скидки");
                }
                localStorage.removeItem("cart")
                window.location.reload()
            }
        } catch (e) {
            console.log(e);
        }
        
        setLoading(false)
    }

    useEffect(() => {
        getCategoriesBrands();
    }, []);

    function selectedCategory() {
        if (newDiscount?.type) {
            if (newDiscount.type == "category") {
                return (
                    <Select
                        onValueChange={(value) => {
                            setNewDiscount({
                                ...newDiscount,
                                target: Number(value),
                            });
                        }}
                        required
                    >
                        <SelectTrigger>
                            <SelectValue
                                placeholder={"Категории"}
                            ></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {categories?.map((category) => (
                                <SelectItem value={category.id.toString()}>
                                    {category.name} - {category.subcategory}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
            }
            if (newDiscount.type == "brand") {
                return (
                    <Select
                        onValueChange={(value) => {
                            setNewDiscount({
                                ...newDiscount,
                                target: Number(value),
                            });
                        }}
                        required
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={"Бренды"}></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {brands?.map((brand) => (
                                <SelectItem value={brand.id.toString()}>
                                    {brand.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
            }
        }
    }

    if (loading) return <Loading />;

    return (
        <div>
            <div>
                <form onSubmit={(e) => handleCreate(e)}>
                    <Card className={"w-full border-0"}>
                        <CardHeader>
                            <h1 className="font-bold text-xl">
                                Создание скидки
                            </h1>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-4">
                                {product ? (
                                    <div className="">
                                        Скидка для{" "}
                                        {`${product.brand.name} ${product.model}`}
                                    </div>
                                ) : (
                                    <>
                                        <div className="">
                                            <Label>Категория скидки</Label>
                                            <Select
                                                onValueChange={(
                                                    value: DiscountTypes
                                                ) => {
                                                    setNewDiscount({
                                                        ...newDiscount,
                                                        type: value,
                                                    });
                                                }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue
                                                        placeholder={
                                                            "Категория скидки"
                                                        }
                                                    ></SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="category">
                                                        По категории
                                                    </SelectItem>
                                                    <SelectItem value="brand">
                                                        По бренду
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="">
                                            {selectedCategory()}
                                        </div>
                                    </>
                                )}
                                <div className="">
                                    <Label>Название</Label>
                                    <Input
                                        type="text"
                                        onChange={(e) => {
                                            setNewDiscount({
                                                ...newDiscount,
                                                name: e.target.value,
                                            });
                                        }}
                                        required
                                    />
                                </div>
                                <div className="">
                                    <Label>Размер скидки(в процентах)</Label>
                                    <Input
                                        type="number"
                                        onChange={(e) => {
                                            setNewDiscount({
                                                ...newDiscount,
                                                discount_value: Number(
                                                    e.target.value
                                                ),
                                            });
                                        }}
                                        max={100}
                                        min={0}
                                        required
                                    />
                                </div>
                                <div className="">
                                    <Label>Когда истекает</Label>
                                    <Input
                                        type="datetime-local"
                                        onChange={(e) => {
                                            setNewDiscount({
                                                ...newDiscount,
                                                expired_at: e.target.value,
                                            });
                                        }}
                                        required
                                        min={new Date()
                                            .toISOString()
                                            .slice(0, -8)}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit">{"Создать"}</Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </div>
    );
};
