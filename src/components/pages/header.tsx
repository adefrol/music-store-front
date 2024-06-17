import { AuthAdmin } from "@/providers/auth";
import { Link } from "@tanstack/react-router";
import { ShoppingCart, User } from "lucide-react";
import { Cart } from "./cart";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useMediaQuery } from "react-responsive";

export const Header = ({ forAdmin }: { forAdmin?: boolean }) => {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 800px)" });

    if (isTabletOrMobile)
        return (
            <div className="max-w-[1500px] w-full mx-auto ">
                <header className=" max-w-[1500px] mx-auto w-full h-[75px] fixed z-30 bg-white">
                    <div className="flex justify-between items-center h-full px-3">
                        <Link to="/">
                            <div className="text-xl font-bold">
                                Music{" "}
                                <span className="text-primary">Store</span>
                            </div>
                        </Link>
                        <div className="flex gap-2 text-sm">
                            <AuthAdmin>
                                <Link to="/admin" className="text-primary">
                                    Админ-панель
                                </Link>
                            </AuthAdmin>
                        </div>
                        {/* <Button variant={"default"}><User/></Button> */}
                        {forAdmin ? (
                            <></>
                        ) : (
                            <div className="flex gap-2">
                                <Link to="/profile">
                                    <User size={30} />
                                </Link>
                                <Dialog>
                                    <DialogTrigger>
                                        <ShoppingCart size={30} />
                                    </DialogTrigger>
                                    <DialogContent className="max-w-none min-w-fit">
                                        <Cart />
                                    </DialogContent>
                                </Dialog>
                            </div>
                        )}
                    </div>
                </header>
            </div>
        );

    return (
        <div className="max-w-[1500px] w-full mx-auto ">
            <header className=" max-w-[1500px] mx-auto w-full h-[75px] fixed z-30 bg-white">
                <div className="flex justify-between items-center h-full px-3">
                    <Link to="/">
                        <div className="text-3xl font-bold">
                            Music <span className="text-primary">Store</span>
                        </div>
                    </Link>
                    <div className="flex gap-10 text-lg">
                        <AuthAdmin>
                            <Link to="/admin" className="text-primary">
                                Админ-панель
                            </Link>
                        </AuthAdmin>
                    </div>
                    {/* <Button variant={"default"}><User/></Button> */}
                    {forAdmin ? (
                        <></>
                    ) : (
                        <div className="flex gap-5">
                            <Link to="/profile">
                                <User size={30} />
                            </Link>
                            <Dialog>
                                <DialogTrigger>
                                    <ShoppingCart size={30} />
                                </DialogTrigger>
                                <DialogContent className="min-w-fit">
                                    <Cart />
                                </DialogContent>
                            </Dialog>
                        </div>
                    )}
                </div>
            </header>
        </div>
    );
};
