import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

import {
    IDrumsParams,
    IDrumsParamsValues,
    IGuitarParams,
    IGuitarParamsValues,
    IPianoParams,
    IPianoParamsValues,
} from "@/interfaces/extra_params.interface";
import { Label } from "./ui/label";

export const ParamsForm = ({
    passData,
    paramsData,
    selectedParams,
}: {
    passData: Function;
    paramsData?: IGuitarParamsValues | IPianoParamsValues | IDrumsParamsValues;
    selectedParams?: Object;
}) => {

    const [category, setCategory] = useState<
        IGuitarParamsValues | IPianoParamsValues | IDrumsParamsValues
    >();

    const [params, setParams] = useState<
        IGuitarParams | IPianoParams | IDrumsParams
    >(selectedParams as IGuitarParams | IPianoParams | IDrumsParams);

    useEffect(() => {
        passData(JSON.stringify(params));
    }, [params]);

    useEffect(() => {
        setCategory(paramsData);
    }, [paramsData]);

    return (
        <div className="flex-col flex gap-4">
            {category ? (
                (Object.keys(category) as Array<keyof typeof category>).map(
                    (singleKey) => (
                        <div className="" key={singleKey}>
                            <Label>{category[singleKey]?.name}</Label>
                            <Select
                                defaultValue={
                                    selectedParams
                                        ? //@ts-ignore
                                          selectedParams[singleKey]
                                        : null
                                }
                                required
                                onValueChange={(value) => {
                                    setParams({
                                        ...params,
                                        [singleKey]: value,
                                    });
                                }}
                            >
                                <SelectTrigger className="">
                                    <SelectValue
                                        placeholder={category[singleKey]?.name}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {category[singleKey]?.array.map(
                                        (param: string) => (
                                            <SelectItem value={param}>
                                                {param}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                    )
                )
            ) : (
                <></>
            )}
        </div>
    );
};
