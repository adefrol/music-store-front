import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { IBanner } from "@/interfaces/banner.interface";
import { API_URL } from "@/lib/api_url";
import { BannerService } from "@/service/banner.service";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay"

export const BannerCarousel = () => {
    const [banners, setBanners] = useState<IBanner[]>();

    async function getAllBanners() {
        const data: IBanner[] = (await BannerService.getAll()).sort((a, b) => {
            return (
                new Date(a.expired_at).getTime() -
                new Date(b.expired_at).getTime()
            );
        });
        setBanners(data);
    }

    useEffect(() => {
        getAllBanners();
    }, []);

    return (
        <Carousel
            className="w-[1500px] max-sm:w-[700px]"
            opts={{
                loop: true,
            }} plugins={[Autoplay({delay: 5000})]}
        >
            <CarouselContent>
                <CarouselItem className="h-[700px]">
                    <div
                        className="w-full h-full bg-cover flex items-center justify-center rounded-lg flex-col gap-5"
                        style={{
                            backgroundImage: `url(${API_URL}/bg.jpg)`,
                        }}
                    >
                        <p className="text-white text-7xl font-bold">
                            Music <span className="text-primary">Store</span>
                        </p>
                        <p className="text-white text-xl text-center w-[500px]">
                            Добро пожаловать в магазин музыкального оборудования! Здесь каждая нота звучит особенно, а любимая мелодия заводит сердце! Давай вместе погрузимся в мир музыки и создадим что-то по-настоящему удивительное!
                        </p>
                    </div>
                </CarouselItem>
                {banners?.map((banner) => (
                    <CarouselItem className="h-[700px]">
                        <div
                            className="w-full h-full bg-cover flex items-center justify-center rounded-lg flex-col gap-5"
                            style={{
                                backgroundImage: `url(${API_URL}/${banner.image})`,
                            }}
                        ></div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
};
