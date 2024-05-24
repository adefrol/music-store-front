import { Header } from "@/components/pages/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserService } from "@/service/user.service";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/confirm-email")({
    beforeLoad: () => {
      if(localStorage.getItem("email") == null) {
        throw redirect({to: '/'})
      }
    },
    component: ConfirmEmail,
});

function ConfirmEmail() {
    const email = localStorage.getItem("email") as string;

    const navigate = Route.useNavigate();

    const [code, setCode] = useState<string>();
    const [error, setError] = useState<string>();

    async function verifyEmail() {
        if (code) {
            const data = await UserService.verifyEmail(email, code);
            console.log(data);
            if (data == 200) {
                localStorage.removeItem("email");
                navigate({ to: "/login" });
            }
            if (data == 400) {
                setError("Неправильный код");
            }
            if (data == 418) {
                toast("Что-то пошло не так");
            }
        }
    }

    useEffect(() => {
      if(localStorage.getItem("email") == null) {
        navigate({to: '/'})
      }
    }, [])

    return (
        <>
            <Header />
            <div className="flex justify-center items-center h-[90svh]">
                <Card>
                    <CardHeader>
                        <h1 className="text-3xl font-bold">
                            Подтвердите почту
                        </h1>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <p>
                            На вашу почту{" "}
                            <span className="text-primary">{email}</span> был
                            выслан код подтверждения
                        </p>
                        <Input
                            placeholder="664664"
                            onChange={(e) => {
                                setCode(e.target.value);
                            }}
                        />
                        {error ? (
                            <p className="text-red-500">{error}</p>
                        ) : (
                            <></>
                        )}
                        <Button onClick={() => verifyEmail()}>
                            Подтвердить
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
