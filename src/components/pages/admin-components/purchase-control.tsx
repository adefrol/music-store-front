import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { IPurchase, IStatusUpdate } from "@/interfaces/purchase.interface";
import { PurchaseService } from "@/service/purchase.service";
import { useState } from "react";

export const PurchaseControl = ({
    purchases,
}: {
    purchases: IPurchase[] | null;
}) => {
    const [statusUpdate, setStatusUpdate] = useState<IStatusUpdate>();

    async function updateStatus() {
        if (statusUpdate) {
            await PurchaseService.updateStatus(statusUpdate);
        }
    }

    return (
        <Card className="my-10">
            <CardHeader className="text-3xl font-bold flex flex-row items-center gap-4">
                <p>Управление заказами</p>
            </CardHeader>
            <ScrollArea className="h-[700px]">
                <Table>
                    <TableCaption>Все заказы</TableCaption>
                    <TableHeader>
                        <TableRow className="text-center">
                            <TableHead className="text-center">
                                Номер заказа
                            </TableHead>
                            <TableHead className="text-center">
                                Состав
                            </TableHead>
                            <TableHead className="text-center ">
                                Доставка на адрес
                            </TableHead>
                            <TableHead className="text-center ">
                                Тип оплаты
                            </TableHead>
                            <TableHead className="text-center ">
                                Статус заказа
                            </TableHead>
                            <TableHead className="text-center ">
                                Создан
                            </TableHead>
                            <TableHead className="text-center ">
                                Управление
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {purchases?.map((purchase) => (
                            <TableRow className="text-center">
                                <TableCell>{purchase.id}</TableCell>
                                <TableCell>
                                    {purchase.purchaseDetails.map((detail) => (
                                        <p>
                                            {detail.product.brand.name}{" "}
                                            {detail.product.model} -{" "}
                                            {detail.count}
                                        </p>
                                    ))}
                                </TableCell>
                                <TableCell>{purchase.address}</TableCell>
                                <TableCell>{purchase.payType}</TableCell>
                                <TableCell>{purchase.status}</TableCell>
                                <TableCell>
                                    {new Date(
                                        purchase.created_at
                                    ).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <Dialog>
                                        <DialogTrigger>
                                            <Button>Изменить статус</Button>
                                        </DialogTrigger>
                                        <DialogContent className='h-fit'>
                                            <Select
                                                onValueChange={(value) =>
                                                    setStatusUpdate({
                                                        id: purchase.id,
                                                        status: value,
                                                    })
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue
                                                        placeholder={
                                                            purchase.status
                                                        }
                                                    ></SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="В обработке">В обработке</SelectItem>
                                                    <SelectItem value="Собирается">Собирается</SelectItem>
                                                    <SelectItem value="Передан в доставку">Передан в доставку</SelectItem>
                                                    <SelectItem value="Доставлен">Доставлен</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Button onClick={() => updateStatus()}>Изменить</Button>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollArea>
        </Card>
    );
};
