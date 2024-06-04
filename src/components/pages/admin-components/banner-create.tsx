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
import { INewBanner } from "@/interfaces/banner.interface";
import { BannerService } from "@/service/banner.service";
import { useState } from "react";

export const BannerCreate = () => {
    const [file, setFile] = useState<File>();

    const [newBanner, setNewBanner] = useState<INewBanner>();

    const [loading, setLoading] = useState<boolean>(false);

    async function handleCreate(e: React.SyntheticEvent) {
        e.preventDefault();

        setLoading(true);
        try {
            if (newBanner && file) {
                await BannerService.create(newBanner, "banners", file);
                window.location.reload();
            }
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }

    if (loading) return <Loading />;

    return (
        <div>
            <div>
                <form onSubmit={(e) => handleCreate(e)}>
                    <Card className={"w-full border-0"}>
                        <CardHeader>
                            <h1 className="font-bold text-xl">
                                Создание баннера
                            </h1>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-4">
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
                                        required
                                    />
                                </div>
                                <div className="">
                                    <Label>Когда истекает</Label>
                                    <Input
                                        type="datetime-local"
                                        onChange={(e) => {
                                            setNewBanner({
                                                ...newBanner,
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
