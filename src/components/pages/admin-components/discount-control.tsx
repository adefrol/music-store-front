import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { IDiscount } from "@/interfaces/discount.interface";
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
import { DiscountService } from "@/service/discount.service";
import { DiscountCreate } from "./discount-create";

export const DiscountControl = ({
    discounts
}: {
    discounts: IDiscount[] | null;

}) => {
    /* const [loading, setLoading] = useState<boolean>(false); */

    const targetNames:string[] = JSON.parse(localStorage.getItem("targetNames") as string)

    async function deleteDiscount(id: number) {
        await DiscountService.delete(id);
        window.location.reload();
    }


    return (
        <>
            
                <Card className="my-10">
                    <CardHeader className="text-3xl font-bold flex flex-row items-center gap-4">
                        <p>Управление скидками {}</p>
                        <Dialog>
                            <DialogTrigger className="flex justify-center">
                                <Button variant={"default"} className="m-0">
                                    Добавить
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DiscountCreate />
                            </DialogContent>
                        </Dialog>
                    </CardHeader>
                    <ScrollArea className="max-h-[700px]">
                        <Table>
                            <TableCaption>Все скидки</TableCaption>
                            <TableHeader>
                                <TableRow className="text-center">
                                    <TableHead className="text-center">
                                        Название
                                    </TableHead>
                                    <TableHead className="text-center">
                                        Истечёт
                                    </TableHead>
                                    <TableHead className="text-center ">
                                        Тип{" "}
                                    </TableHead>
                                    <TableHead className="text-center ">
                                        Размер скидки
                                    </TableHead>
                                    <TableHead className="text-center ">
                                        Управление
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {discounts?.map((discount, idx) => (
                                    <TableRow key={discount.id} className="">
                                        <TableCell className="font-medium text-center h-full">
                                            <p>{discount.name}</p>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {new Date(
                                                discount.expired_at
                                            ).toLocaleDateString() +
                                                " " +
                                                new Date(
                                                    discount.expired_at
                                                ).toLocaleTimeString()}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <p>{targetNames[idx]}</p>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {discount.discount_value}%
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <AlertDialog>
                                                <AlertDialogTrigger>
                                                    <Button
                                                        variant={"destructive"}
                                                    >
                                                        Удалить
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Подтвердить удаление
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Вы действительно
                                                            хотите баннер?
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            Отмена
                                                        </AlertDialogCancel>
                                                        <Button
                                                            variant={"default"}
                                                            onClick={() =>
                                                                deleteDiscount(
                                                                    discount.id
                                                                )
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
            
        </>
    );
};
