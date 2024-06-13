import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/interfaces/category.interface";
import {
    IDrumsParamsValues,
    IGuitarParamsValues,
    IPianoParamsValues,
} from "@/interfaces/extra_params.interface";
import { subcategories } from "@/lib/extra-values";
import { ProductSearch, Route } from "@/routes";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FilterExtra } from "./filter-extra";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useMediaQuery } from "react-responsive";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Filter } from 'lucide-react'

export const FilterForm = ({
    categories,
}: {
    categories: ICategory[] | null;
}) => {
    const { subcategory, category } = Route.useSearch();
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

    const searchParams = Route.useSearch();
    const [selectedSubCategory, setSelectedSubCategory] = useState<
        IGuitarParamsValues | IPianoParamsValues | IDrumsParamsValues
    >();
    const navigate = useNavigate({ from: Route.fullPath });

    const max = Number(localStorage.getItem("max"));

    function findCategory() {
        const subcategoriesParams = subcategories.find(
            (subcategoryParam) => subcategory == subcategoryParam.name
        );
        setSelectedSubCategory(subcategoriesParams?.extra_params);
    }

    const [keyHandle, setKeyHandle] = useState<number>(0);

    const [filters, setFilters] = useState<ProductSearch>();

    function handleParams(params: string) {
        if (params) {
            let parsedParams: object = JSON.parse(params);
            Object.keys(parsedParams).map((key) => {
                // @ts-ignore
                if (parsedParams[key] == "") {
                    /* navigate({
                        search: (prev) => ({
                            ...prev,
                            // @ts-ignore
                            [key]: undefined,
                        }), */
                    setFilters({ ...filters, [key]: undefined });
                    /* } */
                } else {
                    /* navigate({
                        search: (prev) => ({
                            ...prev,
                            // @ts-ignore
                            [key]: parsedParams[key],
                        }),
                    } */ //@ts-ignore
                    setFilters({ ...filters, [key]: parsedParams[key] });
                }
            });
        }
    }

    useEffect(() => {
        setFilters({ category: category, subcategory: subcategory });
    }, [searchParams]);

    useEffect(() => {
        findCategory();
        navigate({ search: { category: category, subcategory: subcategory } });
        setKeyHandle(keyHandle + 1);
    }, [subcategory]);


    if (isTabletOrMobile)
        return (
            <>
                <Sheet>
                    <SheetTrigger asChild className="absolute">
                        <Button className="sticky z-10 top-20 left-1  rounded-full"><Filter/></Button>
                    </SheetTrigger>

                    <div className="relative"></div>
                    <SheetContent side={"left"}>
                        <ScrollArea className="h-full">
                            <SheetHeader>
                                <div className="flex items-center">
                                    <p className="text-2xl font-bold">
                                        Фильтры
                                    </p>
                                </div>
                            </SheetHeader>
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">
                                        Поиск по категории
                                    </Label>
                                    <Input
                                        size={50}
                                        id="name"
                                        placeholder="Найти..."
                                        onChange={(e) => {
                                            setFilters({
                                                ...filters,
                                                search: e.target.value,
                                            });
                                        }}
                                    />
                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="min">
                                        Максимальная цена -{" "}
                                        {filters
                                            ? filters.max
                                                ? filters.max
                                                : max
                                            : max}
                                    </Label>
                                    <Slider
                                        step={100}
                                        max={max}
                                        key={keyHandle}
                                        defaultValue={[max]}
                                        onValueChange={async (value) => {
                                            await new Promise((resolve) =>
                                                setTimeout(resolve, 400)
                                            );
                                            setFilters({
                                                ...filters,
                                                max: Math.round(value[0]),
                                            });
                                        }}
                                    />
                                </div>
                                <div className="">
                                    <Label>Бренд</Label>
                                    <Select
                                        disabled={subcategory ? false : true}
                                        onValueChange={(value) => {
                                            setFilters({
                                                ...filters,
                                                brand: value,
                                            });
                                        }}
                                    >
                                        <SelectTrigger className="">
                                            <SelectValue placeholder="Бренд" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <Input />

                                            {categories ? (
                                                categories
                                                    .find(
                                                        (category) =>
                                                            category.subcategory ==
                                                            subcategory
                                                    )
                                                    ?.brands.map((brand) => (
                                                        <SelectItem
                                                            key={brand.id}
                                                            value={brand.name}
                                                        >
                                                            {brand.name}
                                                        </SelectItem>
                                                    ))
                                            ) : (
                                                <></>
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                                {/* <ParamsForm
                        passData={handleParams}
                        paramsData={selectedSubCategory}
                    /> */}
                                <FilterExtra
                                    key={
                                        searchParams
                                            ? Object.keys(searchParams).length
                                            : Math.random()
                                    }
                                    passData={handleParams}
                                    paramsData={selectedSubCategory}
                                />
                                <div className="flex gap-2 w-full justify-center">
                                    <Button
                                        variant={"default"}
                                        className="w-[45%]"
                                        onClick={() =>
                                            navigate({
                                                search: (prev) => ({
                                                    ...prev,
                                                    ...filters,
                                                }),
                                            })
                                        }
                                    >
                                        Показать
                                    </Button>
                                    <Button
                                        variant={"outline"}
                                        className="w-[45%]"
                                        onClick={() => {
                                            if (filters) {
                                                navigate({
                                                    search: () => ({
                                                        category: category,
                                                        subcategory:
                                                            subcategory,
                                                    }),
                                                });
                                                setKeyHandle(keyHandle + 1);
                                            }
                                        }}
                                    >
                                        Очистить
                                    </Button>
                                </div>
                            </div>
                        </ScrollArea>
                    </SheetContent>
                </Sheet>
            </>
        );

    return (
        <Card className="w-[35%]">
            <CardHeader>
                <div className="flex items-center">
                    <p className="text-2xl font-bold">Фильтры</p>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Поиск по категории</Label>
                        <Input
                            size={50}
                            id="name"
                            placeholder="Найти..."
                            onChange={(e) => {
                                setFilters({
                                    ...filters,
                                    search: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="min">
                            Максимальная цена -{" "}
                            {filters ? (filters.max ? filters.max : max) : max}
                        </Label>
                        <Slider
                            step={100}
                            max={max}
                            key={keyHandle}
                            defaultValue={[max]}
                            onValueChange={async (value) => {
                                await new Promise((resolve) =>
                                    setTimeout(resolve, 400)
                                );
                                setFilters({
                                    ...filters,
                                    max: Math.round(value[0]),
                                });
                            }}
                        />
                    </div>
                    <div className="">
                        <Label>Бренд</Label>
                        <Select
                            disabled={subcategory ? false : true}
                            onValueChange={(value) => {
                                setFilters({ ...filters, brand: value });
                            }}
                        >
                            <SelectTrigger className="">
                                <SelectValue placeholder="Бренд" />
                            </SelectTrigger>
                            <SelectContent>
                                <Input />

                                {categories ? (
                                    categories
                                        .find(
                                            (category) =>
                                                category.subcategory ==
                                                subcategory
                                        )
                                        ?.brands.map((brand) => (
                                            <SelectItem
                                                key={brand.id}
                                                value={brand.name}
                                            >
                                                {brand.name}
                                            </SelectItem>
                                        ))
                                ) : (
                                    <></>
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                    {/* <ParamsForm
                        passData={handleParams}
                        paramsData={selectedSubCategory}
                    /> */}
                    <FilterExtra
                        key={
                            searchParams
                                ? Object.keys(searchParams).length
                                : Math.random()
                        }
                        passData={handleParams}
                        paramsData={selectedSubCategory}
                    />
                    <div className="flex gap-2 w-full justify-center">
                        <Button
                            variant={"default"}
                            className="w-[45%]"
                            onClick={() =>
                                navigate({
                                    search: (prev) => ({ ...prev, ...filters }),
                                })
                            }
                        >
                            Показать
                        </Button>
                        <Button
                            variant={"outline"}
                            className="w-[45%]"
                            onClick={() => {
                                if (filters) {
                                    navigate({
                                        search: () => ({
                                            category: category,
                                            subcategory: subcategory,
                                        }),
                                    });
                                    setKeyHandle(keyHandle + 1);
                                }
                            }}
                        >
                            Очистить
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
