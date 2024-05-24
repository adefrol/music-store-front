import { useEffect, useState } from "react";


import {
    IDrumsParams,
    IDrumsParamsValues,
    IGuitarParams,
    IGuitarParamsValues,
    IPianoParams,
    IPianoParamsValues,
} from "@/interfaces/extra_params.interface";
import { Label } from "../../ui/label";
import { Route } from "@/routes";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export const FilterExtra = ({
    passData,
    paramsData,
}: {
    passData: Function;
    paramsData?: IGuitarParamsValues | IPianoParamsValues | IDrumsParamsValues;
}) => {
    const searchParams = Route.useSearch();
    const { subcategory } = Route.useSearch();
    const [category, setCategory] = useState<
        IGuitarParamsValues | IPianoParamsValues | IDrumsParamsValues
    >();

    const [params, setParams] = useState<
        IGuitarParams | IPianoParams | IDrumsParams
    >(searchParams);

    useEffect(() => {
        passData(JSON.stringify(params));
    }, [params]);

    useEffect(() => {
        setParams(searchParams);
    }, [subcategory, searchParams]);

    useEffect(() => {
        setCategory(paramsData);
    }, [paramsData]);

    function handleAppend(key: string, param: string) {
        let paramArray: string[] = [];
        if (params) {
            if (params[key as keyof typeof category] != undefined) {
                paramArray = [...params[key as keyof typeof category]];
                if (paramArray.includes(param)) {
                    paramArray = paramArray.filter((p) => p != param);
                } else {
                    paramArray.push(param);
                }
            } else {
                paramArray.push(param);
            }
        }
        setParams({
            ...params,
            [key]: paramArray,
        });
    }

    return (
        <div className="flex-col flex gap-4">
            {category ? (
                (Object.keys(category) as Array<keyof typeof category>).map(
                    (singleKey) => (
                        <div className="flex flex-col gap-1" key={singleKey}>
                            <Label>{category[singleKey]?.name}</Label>
                            <Popover>
                                <PopoverTrigger>
                                    <Button
                                        variant={"outline"}
                                        className="w-full"
                                    >
                                        {params[singleKey]
                                            ? (params[singleKey] as string[])
                                                  .length > 0
                                                ? (
                                                      params[
                                                          singleKey
                                                      ] as string[]
                                                  )
                                                      ?.slice(0, 3)
                                                      .join(", ") + "..."
                                                : category[singleKey]?.name
                                            : category[singleKey]?.name}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    {category[singleKey]?.array.map(
                                        (param: string) => (
                                            <div className="flex gap-2">
                                                <Checkbox
                                                    checked={
                                                        Array.isArray(
                                                            params[singleKey]
                                                        )
                                                            ? (
                                                                  params[
                                                                      singleKey
                                                                  ] as string[]
                                                              ).includes(param)
                                                            : false
                                                    }
                                                    onClick={() => {
                                                        handleAppend(
                                                            singleKey,
                                                            param
                                                        );
                                                    }}
                                                />
                                                <p>{param}</p>
                                            </div>
                                        )
                                    )}
                                </PopoverContent>
                            </Popover>
                        </div>
                    )
                )
            ) : (
                <></>
            )}
        </div>
    );
};
