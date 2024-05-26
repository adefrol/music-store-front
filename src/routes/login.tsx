import { createFileRoute, redirect } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/pages/header";
import { useState } from "react";
import { IUser } from "@/interfaces/user.interface";
import { UserService } from "@/service/user.service";
import { AuthLogged } from '@/providers/auth'
/* import { AuthLogged } from "@/providers/auth"; */

export const Route = createFileRoute("/login")({
    beforeLoad: async () => {
        if (await UserService.isLogged()) {
            throw redirect({ to: "/" });
        }
    },
    validateSearch: (
        search: Record<string, unknown>
    ): { redirect?: string } => {
        return {
            redirect: search.redirect as string,
        };
    },
    component: Login,
});

function Login() {
    const [loginData, setLoginData] = useState<IUser>({
        email: "",
        password: "",
    });

    const searchParams = Route.useSearch();

    const navigate = Route.useNavigate();

    const [error, setError] = useState<string>();

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();

        const data = await UserService.login(loginData);
        console.log(data);

        if (data?.status == 200) {
            console.log("ok");

            if (searchParams?.redirect) {
                navigate({ to: searchParams.redirect });
            } else {
                navigate({ to: "/" });
            }
        }
        if (data?.status == 401) {
            setError("Неправильный логин или пароль");
        }
    }

    return (
        <AuthLogged deAuth>
            <Header />
            <div className="flex justify-center items-center h-[90svh]">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Card className="w-full max-w-sm">
                        <CardHeader>
                            <CardTitle className="text-2xl">Вход</CardTitle>
                            <CardDescription>
                                Введите данные для входа в профиль
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">E-mail</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    onChange={(e) =>
                                        setLoginData({
                                            ...loginData,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Пароль</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    onChange={(e) =>
                                        setLoginData({
                                            ...loginData,
                                            password: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            {error ? (
                                <p className="text-destructive">{error}</p>
                            ) : (
                                <></>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" type="submit">
                                Войти
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AuthLogged>
    );
}
