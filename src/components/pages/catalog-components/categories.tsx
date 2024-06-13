import { API_URL } from "@/lib/api_url";
import { Route } from "@/routes/index";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const categoriesCards = [
    {
        name: "Струнные",
        image: "guitar-category.jpg",
    },
    {
        name: "Клавишные",
        image: "piano-category.jpg",
    },
    {
        name: "Ударные",
        image: "drum-category.jpg",
    },
];

const guitarCategories = [
    {
        name: "Акустические",
        image: "acoustic-guitar-category.jpg",
    },
    {
        name: "Электрогитары",
        image: "electric-guitar-category.jpg",
    },
    {
        name: "Аксессуары",
        image: "accessories-category.jpg",
    },
];

const pianoCategories = [
    {
        name: "Фортепиано",
        image: "fortepiano-category.jpg",
    },
    {
        name: "Синтезаторы",
        image: "syntesizer-category.jpg",
    },
    {
        name: "Аксессуары",
        image: "piano-access-category.jpg",
    },
];

const drumsCategories = [
    {
        name: "Барабаны",
        image: "drums-category.jpg",
    },
    {
        name: "Тарелки",
        image: "cymbal-category.jpg",
    },
    {
        name: "Аксессуары",
        image: "drum-access-category.jpg",
    },
];

export const Categories = () => {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
    const { category, subcategory } = Route.useSearch();
    const navigate = useNavigate({ from: Route.fullPath });

    const [selectedCategory, setSelectedCategory] = useState<Array<any>>();

    function selectCategory() {
        if (category == "Струнные") {
            setSelectedCategory(guitarCategories);
        }

        if (category == "Клавишные") {
            setSelectedCategory(pianoCategories);
        }

        if (category == "Ударные") {
            setSelectedCategory(drumsCategories);
        }
    }

    useEffect(() => {
        console.log(category);
        selectCategory();
    }, [category]);

    if (isTabletOrMobile) {
        return (
            <>
                <div className="flex flex-col justify-center gap-2 py-20">
                    <div className="grid grid-cols-3 font-medium">
                        {categoriesCards.map((category) => (
                            <div
                                key={category.name}
                                className="w-[95%] hover:scale-105 active:scale-100 transition-all cursor-pointer mx-auto rounded-lg relative h-[150px] bg-cover"
                                style={{
                                    backgroundImage: `url(${API_URL}/${category.image})`,
                                }}
                                onClick={() =>
                                    navigate({
                                        search: (prev) => ({
                                            ...prev,
                                            category: category.name,
                                            subcategory: undefined,
                                        }),
                                    })
                                }
                            >
                                <p className="text-white absolute left-0 bottom-0 p-2  text-xl">
                                    {category.name}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-3 font-medium">
                        {selectedCategory?.map((category) => (
                            <div
                                key={category.name}
                                className="w-[95%] hover:scale-105 active:scale-100 transition-all cursor-pointer mx-auto rounded-lg relative h-[145px] bg-cover"
                                style={{
                                    backgroundImage: `url(${API_URL}/${category.image})`,
                                }}
                                onClick={() =>
                                    navigate({
                                        search: (prev) => ({
                                            ...prev,
                                            subcategory: category.name,
                                        }),
                                    })
                                }
                            >
                                <p className="text-white absolute left-0 bottom-0 p-2  text-xl">
                                    {category.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    } else
        return (
            <>
                <div className="flex flex-col justify-center gap-5 py-40">
                    <h1 className="text-center text-5xl font-extrabold">
                        Категории
                    </h1>
                    <div className="grid grid-cols-3 font-medium">
                        {categoriesCards.map((category) => (
                            <div
                                key={category.name}
                                className="w-[90%] hover:scale-105 active:scale-100 transition-all cursor-pointer mx-auto rounded-lg relative h-[245px] bg-cover"
                                style={{
                                    backgroundImage: `url(${API_URL}/${category.image})`,
                                }}
                                onClick={() =>
                                    navigate({
                                        search: (prev) => ({
                                            ...prev,
                                            category: category.name,
                                            subcategory: undefined,
                                        }),
                                    })
                                }
                            >
                                <p className="text-white absolute left-0 bottom-0 p-5  text-5xl">
                                    {category.name}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-3 font-medium">
                        {selectedCategory?.map((category) => (
                            <div
                                key={category.name}
                                className="w-[90%] hover:scale-105 active:scale-100 transition-all cursor-pointer mx-auto rounded-lg relative h-[245px] bg-cover"
                                style={{
                                    backgroundImage: `url(${API_URL}/${category.image})`,
                                }}
                                onClick={() =>
                                    navigate({
                                        search: (prev) => ({
                                            ...prev,
                                            subcategory: category.name,
                                        }),
                                    })
                                }
                            >
                                <p className="text-white absolute left-0 bottom-0 p-5  text-5xl">
                                    {category.name}
                                </p>
                            </div>
                        ))}
                    </div>
                    {!category ? <p className='text-center text-xl text-gray-500 font-bold'>Выберите категорию</p> : <></>}
                    {!subcategory && category ? <p className='text-center text-xl text-gray-500 font-bold'>Выберите подкатегорию</p> : <></>}
                </div>

                {/*             <div className="grid grid-cols-2 pt-5 font-medium">
                <div
                    className="w-[95%] mx-auto rounded-lg relative h-[245px] bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${API_URL}/sound-category.jpg)`,
                    }}
                >
                    <p className="text-white absolute left-0 bottom-0 p-5 text-5xl">
                        Обработка звука
                    </p>
                </div>
                <div
                    className="w-[95%] mx-auto rounded-lg relative h-[245px] bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${API_URL}/record-category.jpg)`,
                    }}
                >
                    <p className="text-white absolute left-0 bottom-0 p-5 text-5xl">
                        Запись звука
                    </p>
                </div>
            </div> */}
            </>
        );
};
