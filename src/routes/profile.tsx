import { Header } from "@/components/pages/header";
import { ProfileEdit } from "@/components/pages/profile-components/profile-edit";
import { Purchase } from "@/components/pages/profile-components/purchases";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { IUser, IUserPurchases } from "@/interfaces/user.interface";
import { UserService } from "@/service/user.service";
import { Label } from "@radix-ui/react-label";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
    beforeLoad: async ({ location }) => {
        if (!(await UserService.isLogged())) {
            throw redirect({
                to: "/login",
                search: {
                    redirect: location.href,
                },
            });
        }
    },
    component: Profile,
});

function Profile() {
    const [profile, setProfile] = useState<IUserPurchases>();

    const [profileUpdate, setProfileUpdate] = useState<IUser>();

    const navigate = Route.useNavigate();

    async function getProfileAndPurchases() {
        const data = await UserService.getPurchases().catch((e) => {
            const error = e as AxiosError;
            if (error.response?.status == 500) {
                toast("Произошла ошибка на сервере");
                return;
            }
        });
        if (data) {
            setProfile(data);
            setProfileUpdate({
                email: data.email,
                name: data.name,
                phone: data.phone,
                password: "",
                id: data.id,
            });
        }
    }

    useEffect(() => {
        getProfileAndPurchases();
    }, []);

    if (profile)
        return (
            <>
                <Header />
                <div className="max-w-[1500px] py-20 w-full mx-auto">
                    <Card>
                        <CardHeader>
                            <h1 className="font-bold text-3xl">Ваш профиль</h1>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col">
                                    <Label>Имя</Label>
                                    <Input
                                        defaultValue={profile?.name}
                                        readOnly
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <Label>Email</Label>
                                    <Input
                                        defaultValue={profile?.email}
                                        readOnly
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <Label>Номер телефона</Label>
                                    <Input
                                        type="text"
                                        defaultValue={profile?.phone}
                                        readOnly
                                    />
                                </div>
                                <div className="flex justify-start gap-5">
                                    <Button
                                        onClick={() => {
                                            UserService.deleteToken();
                                            navigate({ to: "/" });
                                        }}
                                    >
                                        Выйти
                                    </Button>
                                    <Dialog>
                                        <DialogTrigger>
                                            <Button>Изменить</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <ProfileEdit
                                                userData={profileUpdate!}
                                            />
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                {profile ? (
                                    <Purchase profile={profile} />
                                ) : (
                                    <></>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </>
        );
}
