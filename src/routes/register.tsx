import { Header } from "@/components/pages/header";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IUser, IUserErrors } from "@/interfaces/user.interface";
import { UserService } from "@/service/user.service";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/register")({
    component: Register,
});

const ValidateInput = ({
    htmlFor,
    placeholder,
    name,
    error,
    type,
    onChange,
}: {
    htmlFor: string;
    placeholder: string;
    name: string;
    error: any;
    type: React.HTMLInputTypeAttribute;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
    return (
        <>
            <Label
                htmlFor={htmlFor}
                className={`${error ? "text-red-500" : ""}`}
            >
                {error ? error : name}
            </Label>
            <Input
                type={type}
                id={htmlFor}
                placeholder={placeholder}
                required
                onChange={onChange}
                className={`${error ? "border-[1px] border-red-500" : ""}`}
            />
        </>
    );
};

function Register() {
    const validEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

    const navigate = Route.useNavigate();

    const [newUser, setNewUser] = useState<IUser>({
        email: "",
        name: "",
        password: "",
        phone: "",
    });

    const [errors, setErrors] = useState<IUserErrors>();
    const [emailError, setEmailError] = useState<string | undefined>();
    function validateEmail() {
        if (!validEmail.test(newUser.email)) {
            console.log(123);

            setEmailError("Email несоответствует");
            return false;
        }
        return true;
    }
    function validatePassword() {
        if (newUser.password.length < 8) {
            setErrors({
                ...errors,
                password: "Пароль должен содержать мин. 8 символов",
            });
            return false;
        }
        return true;
    }

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        setErrors({});
        setEmailError("");
        if (validateEmail() && validatePassword()) {
            const data = await UserService.register(newUser);
            if (data == 200) {
                localStorage.setItem("email", newUser.email)
                navigate({ to: "/confirm-email" });
            }
            if (data == 409) {
                console.log("conflict", data);
            }
        } else {
            return;
        }
    }

    return (
        <>
            <Header />
            <div className="flex justify-center items-center h-[90svh]">
                <form onSubmit={async (e) => await handleSubmit(e)}>
                    <Card className="mx-auto max-w-lg w-full">
                        <CardHeader>
                            <CardTitle className="text-xl">
                                Регистрация
                            </CardTitle>
                            <CardDescription>
                                Введите данные для создания профиля
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid col-span-2">
                                        <ValidateInput
                                            htmlFor="name"
                                            name="ФИО"
                                            type="text"
                                            error={undefined}
                                            placeholder="Иванов Иван"
                                            onChange={(e) =>
                                                setNewUser({
                                                    ...newUser,
                                                    name: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <ValidateInput
                                        htmlFor="email"
                                        name="E-mail"
                                        error={
                                            emailError ? emailError : undefined
                                        }
                                        type="email"
                                        placeholder="example@example.ru"
                                        onChange={(e) =>
                                            setNewUser({
                                                ...newUser,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <ValidateInput
                                        htmlFor="phone"
                                        name="Номер телефона"
                                        error={undefined}
                                        type="tel"
                                        placeholder="+79999999999"
                                        onChange={(e) =>
                                            setNewUser({
                                                ...newUser,
                                                phone: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <ValidateInput
                                        htmlFor="phone"
                                        name="Пароль"
                                        error={
                                            errors?.password
                                                ? errors.password
                                                : undefined
                                        }
                                        type="password"
                                        placeholder=""
                                        onChange={(e) =>
                                            setNewUser({
                                                ...newUser,
                                                password: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Зарегистрироваться
                                </Button>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                Уже зарегистрированы?{" "}
                                <Link to="/login" className="underline text-primary">
                                    Войти
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </>
    );
}
