import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { IProduct } from "@/interfaces/product.interface";
import { API_URL } from "@/lib/api_url";
import { ProductCreate } from "./product-create";
import { Card, CardHeader } from "@/components/ui/card";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ProductService } from "@/service/product.service";
import { DiscountCreate } from "./discount-create";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/interfaces/category.interface";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const ProductList = ({
    products,
    categories,
}: {
    products: IProduct[] | null;
    categories: ICategory[];
}) => {
    async function deleteProduct(id: number) {
        let isError = false;
        await ProductService.delete(id).catch((e) => {
            const error = e as AxiosError;
            if (error.response?.status == 500) {
                toast("Произошла ошибка на сервере");
                isError = true;
                return;
            }
        });
        if (!isError) {
            window.location.reload();
        }
    }

    type FilterType = number | "Все";

    const [filtered, setFiltered] = useState<IProduct[] | null>(products);
    const [selectCategory, setSelectedCategory] = useState<FilterType>();

    function filterProducts(products: IProduct[]) {
        if (selectCategory) {
            if (selectCategory == "Все") {
                setFiltered(products);
            } else {
                setFiltered(
                    products.filter(
                        (product) => product.category.id == selectCategory
                    )
                );
            }
        }
    }

    useEffect(() => {
        if (products) {
            filterProducts(products);
        }
    }, [selectCategory]);

    if (products)
        return (
            <Card className="my-10">
                <CardHeader className="text-3xl font-bold flex flex-row items-center gap-4">
                    <p className="min-w-fit">Управление продуктами</p>
                    <Dialog>
                        <DialogTrigger className="flex justify-center">
                            <Button variant={"default"} className="m-0 ">
                                Добавить
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <ProductCreate />
                        </DialogContent>
                    </Dialog>
                    {products ? (
                        <Select
                            onValueChange={(value) => {
                                if (value == "Все") {
                                    setSelectedCategory("Все");
                                } else {
                                    setSelectedCategory(Number(value));
                                }
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Все"></SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Все">Все</SelectItem>
                                {categories.map((category) => (
                                    <SelectItem value={category.id.toString()}>
                                        {category.name} - {category.subcategory}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ) : (
                        <></>
                    )}
                </CardHeader>
                <ScrollArea className="h-[700px]">
                    <Table>
                        <TableCaption>Все продукты</TableCaption>
                        <TableHeader>
                            <TableRow className="text-center">
                                <TableHead className="text-center">
                                    Картинка
                                </TableHead>
                                <TableHead className="text-center">
                                    Модель
                                </TableHead>
                                <TableHead className="text-center">
                                    Стоимость
                                </TableHead>
                                <TableHead className="text-center ">
                                    Управление
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {filtered?.map((product) => (
                                <TableRow className="h-[300px]">
                                    <TableCell className="font-medium h-full">
                                        <div
                                            className="w-full h-[200px] bg-contain bg-no-repeat bg-center rounded-lg"
                                            style={{
                                                backgroundImage: `url(${API_URL}/${product.image})`,
                                            }}
                                        ></div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {product.brand.name} {product.model}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {product.discount ? (
                                            <>
                                                <p>
                                                    {
                                                        product.discount
                                                            .discount_value
                                                    }
                                                    %
                                                </p>
                                                <p className="line-through">
                                                    {product.price}
                                                </p>
                                            </>
                                        ) : (
                                            <></>
                                        )}{" "}
                                        <p>
                                            {product.discount
                                                ? Math.round(
                                                      Number(product.price) /
                                                          (product.discount
                                                              .discount_value /
                                                              100 +
                                                              1)
                                                  )
                                                : product.price}{" "}
                                            {"р. "}
                                        </p>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Popover>
                                            <PopoverTrigger>
                                                <Button variant={"default"}>
                                                    ...
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <div className="flex flex-col justify-center items-center gap-3">
                                                    <Dialog>
                                                        <DialogTrigger>
                                                            <Button
                                                                variant={
                                                                    "outline"
                                                                }
                                                                className="w-full"
                                                            >
                                                                Изменить
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <ProductCreate
                                                                forEdit
                                                                product={
                                                                    product
                                                                }
                                                            />
                                                        </DialogContent>
                                                    </Dialog>
                                                    <Dialog>
                                                        <DialogTrigger className="flex justify-center">
                                                            <Button
                                                                variant={
                                                                    "outline"
                                                                }
                                                                className="w-full"
                                                            >
                                                                Добавить скидку
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DiscountCreate
                                                                product={
                                                                    product
                                                                }
                                                            />
                                                        </DialogContent>
                                                    </Dialog>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger>
                                                            <Button
                                                                variant={
                                                                    "destructive"
                                                                }
                                                            >
                                                                Удалить
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>
                                                                    Подтвердить
                                                                    удаление
                                                                </AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Вы
                                                                    действительно
                                                                    хотите
                                                                    удалить
                                                                    товар{" "}
                                                                    {
                                                                        product
                                                                            .brand
                                                                            .name
                                                                    }{" "}
                                                                    {
                                                                        product.model
                                                                    }
                                                                    ?
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>
                                                                    Отмена
                                                                </AlertDialogCancel>
                                                                <Button
                                                                    variant={
                                                                        "default"
                                                                    }
                                                                    onClick={() =>
                                                                        deleteProduct(
                                                                            product.id
                                                                        )
                                                                    }
                                                                >
                                                                    Подтвердить
                                                                </Button>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </Card>
        );
};
