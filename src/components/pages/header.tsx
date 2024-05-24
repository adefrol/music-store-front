import { AuthAdmin } from "@/providers/auth";
import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart, User } from "lucide-react";
import { Cart } from "./cart";
import { CartService } from "@/service/cart.service";
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

export const Header = ({ forAdmin }: { forAdmin?: boolean }) => {
    return (
        <div className="max-w-[1500px] w-full mx-auto ">
            <header className="w-full h-[75px]">
                <div className="flex justify-between items-center h-full">
                    <Link to="/">
                        <div className="text-3xl font-bold">
                            Music <span className="text-primary">Store</span>
                        </div>
                    </Link>
                    <div className="flex gap-10 text-lg">
                        <a href="">Категории</a>
                        <a href="">Скидки</a>
                        <a href="">О нас</a>
                        <AuthAdmin>
                            <Link to="/admin">Админ</Link>
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
                            <Popover>
                                <PopoverTrigger>
                                    <ShoppingCart size={30} />
                                </PopoverTrigger>
                                <PopoverContent className='w-fit'>
                                    <Cart/>
                                </PopoverContent>
                            </Popover>
                            <Heart size={30} />
                        </div>
                    )}
                </div>
            </header>
        </div>
    );
};
