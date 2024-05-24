
export const ErrorComponent = ({ status }: { status: string | number }) => {
    return (
        <div className="flex items-center h-[50svh] justify-center">
            <div className="text-4xl font-bold">Ошибка <span className='text-primary'>{status}</span></div>
        </div>
    );
};
