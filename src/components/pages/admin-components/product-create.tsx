import { ParamsForm } from "@/components/params-form";
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
import { Textarea } from "@/components/ui/textarea";
import { ICategory } from "@/interfaces/category.interface";
import {
    IDrumsParamsValues,
    IGuitarParamsValues,
    IPianoParamsValues,
} from "@/interfaces/extra_params.interface";
import { IProduct, IProductCreate } from "@/interfaces/product.interface";
import { subcategories } from "@/lib/extra-values";
import { CategoryService } from "@/service/category.service";
import { ProductService } from "@/service/product.service";
import { useEffect, useState } from "react";

export const ProductCreate = ({
    forEdit,
    product,
}: {
    forEdit?: boolean;
    product?: IProduct;
}) => {
    const [categories, setCategories] = useState<ICategory[]>();

    const [_, setLoading] = useState<boolean>(false);

    const [selectedCategory, setSelectedCategory] = useState<
        ICategory | undefined
    >(product?.category);

    const [selectedSubCategory, setSelectedSubCategory] = useState<
        IGuitarParamsValues | IPianoParamsValues | IDrumsParamsValues
    >();

    const [newProduct, setNewProduct] = useState<IProductCreate>();

    const [productUpdate, setProductUpdate] = useState({...product, brand: product?.brand.id, category: product?.category.id, created_at: undefined, deleted_at: undefined, updated_at: undefined, });

    const [file, setFile] = useState<File>();

    function getExtraData(params: string) {
        if (!product) {
            setNewProduct({ ...newProduct, extra_parameters: params });
        } else {
            setProductUpdate({ ...productUpdate, extra_parameters: params });
        }
    }

    async function getAll() {
        setLoading(true);
        const categories = (await CategoryService.getAll()).sort((a, b) => {
            return a.id - b.id;
        });
        setCategories(categories);
        setLoading(false);
    }

    function findCategory() {
        const subcategoriesParams = subcategories.find(
            (subcategory) => selectedCategory?.subcategory == subcategory.name
        );
        setSelectedSubCategory(subcategoriesParams?.extra_params);
    }

    useEffect(() => {
        findCategory();
    }, [selectedCategory]);

    useEffect(() => {
        getAll();
        findCategory();
    }, []);

    async function handleCreate(e: React.BaseSyntheticEvent) {
        e.preventDefault();

        if (newProduct && !product) {
            if (newProduct && file != undefined) {
                await ProductService.create(
                    newProduct as IProductCreate,
                    "products",
                    file
                );
            } else {
                await ProductService.create(newProduct as IProductCreate);
            }
        }
        if (productUpdate && product) {
            if (productUpdate && file != undefined) {
                await ProductService.update(
                    product.id,
                    productUpdate as IProductCreate,
                    "products",
                    file
                );
            } else {
                await ProductService.update(
                    product.id,
                    productUpdate as IProductCreate
                );
            }
        }
        window.location.reload()
    }

    function handleChange(value: string | number, key: string) {
        if(product) {
            setProductUpdate({...productUpdate, [key] : value})
        }
        else {
            setNewProduct({...newProduct, [key] : value})
        }
    }

    return (
        <div>
            <form onSubmit={(e) => handleCreate(e)}>
                <Card className={"w-full border-0"}>
                    <CardHeader>
                        <h1 className="font-bold text-xl">
                            {forEdit ? "Изменение товара" : "Создание товара"}
                        </h1>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4">
                            <div className="">
                                <Label>Категория</Label>
                                <Select
                                    defaultValue={
                                        product
                                            ? product.category.id.toString()
                                            : undefined
                                    }
                                    onValueChange={(value) => {
                                        handleChange(Number(value), "category")
                                        setSelectedCategory(
                                            categories?.find(
                                                (category) =>
                                                    category.id == Number(value)
                                            )
                                        );
                                    }}
                                >
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Категория" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <Input />
                                        {categories?.map((category) => (
                                            <SelectItem
                                                value={category.id.toString()}
                                            >
                                                {category.name} -{" "}
                                                {category.subcategory}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="">
                                <Label>Бренд</Label>
                                <Select
                                    defaultValue={
                                        product
                                            ? product.brand.id.toString()
                                            : undefined
                                    }
                                    disabled={
                                        newProduct?.category
                                            ? product
                                                ? true
                                                : false
                                            : false
                                    }
                                    onValueChange={(value) => {
                                        handleChange(Number(value), "brand")
                                    }}
                                >
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Бренд" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <Input />
                                        {categories ? (
                                            product ? (
                                                categories
                                                    .find(
                                                        (category) =>
                                                            category.id ==
                                                            product.category.id
                                                    )
                                                    ?.brands.map((brand) => (
                                                        <SelectItem
                                                            value={brand.id.toString()}
                                                        >
                                                            {brand.name}
                                                        </SelectItem>
                                                    ))
                                            ) : (
                                                categories
                                                    .find(
                                                        (category) =>
                                                            category.id ==
                                                            newProduct?.category
                                                    )
                                                    ?.brands.map((brand) => (
                                                        <SelectItem
                                                            value={brand.id.toString()}
                                                        >
                                                            {brand.name}
                                                        </SelectItem>
                                                    ))
                                            )
                                        ) : (
                                            <></>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="">
                                <Label>Модель</Label>
                                <Input
                                    defaultValue={
                                        product ? product.model : undefined
                                    }
                                    placeholder="Модель"
                                    onChange={(e) =>
                                        handleChange(e.target.value, "model")
                                    }
                                />
                            </div>
                            <div className="">
                                <Label>Стоимость</Label>
                                <Input
                                    defaultValue={
                                        product ? product.price : undefined
                                    }
                                    type="number"
                                    placeholder="Стоимость"
                                    onChange={(e) =>
                                        handleChange(e.target.value, "price")
                                    }
                                />
                            </div>
                            <div className="">
                                <Label>Описание</Label>
                                <Textarea
                                    defaultValue={
                                        product
                                            ? product.description
                                            : undefined
                                    }
                                    placeholder="Описание"
                                    onChange={(e) =>
                                        handleChange(e.target.value, "description")
                                    }
                                />
                            </div>
                            <div className="">
                                <Label>Картинка</Label>
                                <Input
                                    type="file"
                                    onChange={(e) =>
                                        setFile(
                                            e.target.files
                                                ? e.target.files[0]
                                                : undefined
                                        )
                                    }
                                />
                            </div>
                            <ParamsForm
                                passData={getExtraData}
                                paramsData={
                                    selectedSubCategory
                                        ? selectedSubCategory
                                        : undefined
                                }
                                selectedParams={product?.extra_parameters}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit">
                            {product ? "Изменить" : "Создать"}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
};
