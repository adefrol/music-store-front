import React, { useEffect, useState } from "react";
import { ErrorComponent } from "../components/error/error";
import { UserService } from "@/service/user.service";

export const AuthAdmin = ({
    children,
    withError,
}: {
    children: React.ReactNode;
    withError?: boolean;
}) => {
    const [isAuth, setIsAuth] = useState<boolean | undefined>(false);

    const [mounted, setMounted] = useState<boolean>(false);

    async function checkAuth() {
        const data = await UserService.isAdmin();
        setIsAuth(data);
        setMounted(true);
    }

    useEffect(() => {
        checkAuth();
    }, []);

    if (mounted)
        return (
            <>
                {isAuth ? (
                    <>{children}</>
                ) : withError ? (
                    <ErrorComponent status={"403 - FORBIDDEN"} />
                ) : (
                    <></>
                )}
            </>
        );
};

export const AuthLogged = ({
    children,
    withError,
    deAuth,
}: {
    children: React.ReactNode;
    withError?: boolean;
    deAuth?: boolean;
}) => {
    const [isAuth, setIsAuth] = useState<boolean | undefined>(false);

    const [counter, setCounter] = useState(0);

    async function checkAuth() {
        const data = await UserService.isLogged();
        setIsAuth(data);
        setCounter(counter + 1);
    }

    useEffect(() => {
        checkAuth();
    }, []);

    if (deAuth) {
        return (
            <>{!isAuth ? <div key={counter}>{children}</div> : <>aboba</>}</>
        );
    } else {
        return (
            <>
                {isAuth ? (
                    <>{children}</>
                ) : withError ? (
                    <ErrorComponent status={"401 - UNAUTHORIZED"} />
                ) : (
                    <></>
                )}
            </>
        );
    }
};
