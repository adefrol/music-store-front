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
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
import { IBanner } from "@/interfaces/banner.interface";
import { API_URL } from "@/lib/api_url";
import { BannerService } from "@/service/banner.service";
import { BannerCreate } from "./banner-create";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const BannerControl = ({ banners }: { banners: IBanner[] | null }) => {
    async function deleteBanner(id: number) {
        let isError = false;
        await BannerService.delete(id).catch((e) => {
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

    return (
        <Card className="my-10">
            <CardHeader className="text-3xl font-bold flex flex-row items-center gap-4">
                <p>Управление баннерами</p>
                <Dialog>
                    <DialogTrigger className="flex justify-center">
                        <Button variant={"default"} className="m-0">
                            Добавить
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <BannerCreate />
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <ScrollArea className="h-[700px]">
                <Table>
                    <TableCaption>Все баннеры</TableCaption>
                    <TableHeader>
                        <TableRow className="text-center">
                            <TableHead className="text-center">
                                Картинка
                            </TableHead>
                            <TableHead className="text-center">
                                Истечёт
                            </TableHead>
                            <TableHead className="text-center ">
                                Управление
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {!banners ? (
                            <div className="w-full h-full flex justify-center items-center">
                                Список пуст
                            </div>
                        ) : (
                            <></>
                        )}
                        {banners?.map((banner) => (
                            <TableRow className="h-[300px]">
                                <TableCell className="font-medium h-full">
                                    <div
                                        className="w-full h-[200px] bg-contain bg-no-repeat bg-center rounded-lg"
                                        style={{
                                            backgroundImage: `url(${API_URL}/${banner.image})`,
                                        }}
                                    ></div>
                                </TableCell>
                                <TableCell className="text-center">
                                    {new Date(
                                        banner.expired_at
                                    ).toLocaleDateString() +
                                        " " +
                                        new Date(
                                            banner.expired_at
                                        ).toLocaleTimeString()}
                                </TableCell>
                                <TableCell className="text-center">
                                    <AlertDialog>
                                        <AlertDialogTrigger>
                                            <Button variant={"destructive"}>
                                                Удалить
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Подтвердить удаление
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Вы действительно хотите
                                                    баннер?
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>
                                                    Отмена
                                                </AlertDialogCancel>
                                                <Button
                                                    variant={"default"}
                                                    onClick={() =>
                                                        deleteBanner(banner.id)
                                                    }
                                                >
                                                    Подтвердить
                                                </Button>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollArea>
        </Card>
    );
};
