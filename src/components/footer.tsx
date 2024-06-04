import { Link } from "@tanstack/react-router";

export const Footer = () => {
    return (
        <footer className=" bg-black w-full h-20 mx-auto mt-24">
            <div className="max-w-[1500px] mx-auto w-full h-full p-2">
                <Link className='flex items-center justify-center'>
                    <div className="text-3xl text-white font-bold">
                        Music <span className="text-primary">Store</span>
                    </div>
                </Link>
            </div>
        </footer>
    );
};
