import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IUser, IUserErrors } from "@/interfaces/user.interface";
import { UserService } from "@/service/user.service";
import { InputMask } from "@react-input/mask";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";
export const ProfileEdit = ({ userData }: { userData: IUser }) => {
    const validEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

    const [profileEdit, setProfileEdit] = useState<IUser>(userData);

    const [errors, setErrors] = useState<IUserErrors>();
    const [emailError, setEmailError] = useState<string | undefined>();
    function validateEmail() {
        if (!validEmail.test(profileEdit.email)) {
            setEmailError("Email несоответствует");
            return false;
        }
        return true;
    }
    function validatePassword() {
        if (profileEdit.password.length < 8) {
            setErrors({
                ...errors,
                password: "Пароль должен содержать мин. 8 символов",
            });
            return false;
        }
        return true;
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setErrors({});
        setEmailError("");
        if (validateEmail() && validatePassword()) {
            const data = await UserService.update(profileEdit).catch((e) => {
                const error = e as AxiosError;
                if (error.response?.status == 500) {
                    toast("Произошла ошибка на сервере");
                    return;
                }
            });
            if (data == 201) {
                window.location.reload();
            }
        } else {
            return;
        }
    }

    return (
        <form action="" onSubmit={(e) => handleSubmit(e)}>
            <div className="flex-col gap-5">
                <div className="py-1">
                    <Label>Имя</Label>
                    <Input
                        defaultValue={profileEdit.name}
                        onChange={(e) =>
                            setProfileEdit({
                                ...profileEdit,
                                name: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="py-1">
                    <Label className={`${emailError ? "text-red-500" : ""}`}>
                        {emailError ? emailError : "E-mail"}
                    </Label>
                    <Input
                        defaultValue={profileEdit.email}
                        className={`${emailError ? "border-[1px] border-red-500" : ""}`}
                        onChange={(e) =>
                            setProfileEdit({
                                ...profileEdit,
                                email: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="py-1">
                    <Label>Номер телефона</Label>
                    <InputMask
                        onChange={(e) =>
                            setProfileEdit({
                                ...profileEdit,
                                phone: e.target.value,
                            })
                        }
                        defaultValue={profileEdit.phone}
                        placeholder="+7 (999) 999-99-99"
                        mask="+7 (___) ___-__-__"
                        replacement={{ _: /\d/ }}
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
                <div className="py-1">
                    <Label
                        className={`${errors?.password ? "text-red-500" : ""}`}
                    >
                        {errors?.password ? errors?.password : "Пароль"}
                    </Label>
                    <Input
                        type="password"
                        onChange={(e) =>
                            setProfileEdit({
                                ...profileEdit,
                                password: e.target.value,
                            })
                        }
                        className={`${errors?.password ? "border-[1px] border-red-500" : ""}`}
                        required
                        defaultValue={profileEdit.password}
                        placeholder="Пароль"
                    />
                </div>
                <div className="py-1">
                    <Button
                        variant={"default"}
                        type="submit"
                        className="w-full"
                    >
                        Изменить
                    </Button>
                </div>
                <div className="py-1">
                    <p className="text-center">
                        Внимание, нажимая изменить, вы подтверждаете изменение
                        данных о профиле.{" "}
                        <span className="text-destructive">
                            Отменить изменения нельзя
                        </span>
                    </p>
                </div>
            </div>
        </form>
    );
};
