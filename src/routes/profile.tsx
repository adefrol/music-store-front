import { Header } from "@/components/pages/header";
import { Purchase } from "@/components/pages/profile-components/purchases";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { IUserPurchases } from "@/interfaces/user.interface";
import { UserService } from "@/service/user.service";
import { Label } from "@radix-ui/react-label";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";

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

    const navigate = Route.useNavigate();

    async function getProfileAndPurchases() {
        const data = await UserService.getPurchases();
        setProfile(data);
    }

    useEffect(() => {
        getProfileAndPurchases();
    }, []);

    return (
        <>
            <Header />
            <div className="max-w-[1500px] py-10 w-full mx-auto">
                <Card>
                    <CardHeader>
                        <h1 className="font-bold text-3xl">Ваш профиль</h1>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <Label>Имя</Label>
                                <Input defaultValue={profile?.name} readOnly />
                            </div>
                            <div className="flex flex-col">
                                <Label>Email</Label>
                                <Input defaultValue={profile?.email} readOnly />
                            </div>
                            <div className="flex flex-col">
                                <Label>Пароль</Label>
                                <Input
                                    type="password"
                                    defaultValue={"........"}
                                    readOnly
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    onClick={() => {
                                        UserService.deleteToken();
                                        navigate({ to: "/" });
                                    }}
                                >
                                    Выйти
                                </Button>
                            </div>
                            {profile ? <Purchase profile={profile} /> : <></>}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
