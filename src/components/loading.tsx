import { LoaderPinwheel } from "lucide-react";

export const Loading = () => {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <LoaderPinwheel className="animate-spin" />
        </div>
    );
};
