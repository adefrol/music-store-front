import { Card, CardHeader } from "@/components/ui/card";
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
import { IUserPurchases } from "@/interfaces/user.interface";

export const Purchase = ({ profile }: { profile: IUserPurchases }) => {
    return (
        <Card className="my-10">
            <CardHeader className="text-3xl font-bold flex flex-row items-center gap-4">
                <p>Мои заказы</p>
            </CardHeader>
            <ScrollArea className="max-h-[700px]">
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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {profile.purchases?.map((purchase) => (
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollArea>
        </Card>
    );
};
