import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import {OutputTextCard} from "@/components/OutputTextCard.jsx";
import OutputChartsCard from "@/components/OutputChartsCard.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Download} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton.jsx";

function OutputWrapper({ response, error, isWaiting}) {
    return (
        <ScrollArea className="h-full w-full flex flex-col rounded-none p-4">
            <div className={"flex flex-col gap-2 pb-6"}>
                {error ? (
                    <p className={"px-3 py-2 bg-red-500 text-white rounded-3xl"}>
                        {error}
                    </p>
                ) : isWaiting ? (
                    <div className="flex flex-col gap-2 w-full">
                        <p className={'opacity-50'}>Processing your prompt...</p>
                        <Skeleton className="h-4 w-full"/>
                        <Skeleton className="h-4 w-3/4"/>
                    </div>
                ) : response ? (
                    <div>
                        <p className={"px-3 py-2 bg-primary rounded-3xl"}>{response}</p>
                        <div className={"p-3 flex flex-col gap-3 bg-secondary rounded-3xl"}>
                            <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
                                Dataset Name
                            </h4>
                            <OutputTextCard/>
                            <OutputChartsCard/>
                        </div>
                        <Button className={"w-40 h-7 ml-auto"}>
                            Export PDF
                            <Download/>
                        </Button>
                    </div>
                ) : (
                    <p className={"px-3 py-2 bg-none"}>
                        Waiting for input...
                    </p>
                )}
            </div>
            {/*<div className={'flex flex-col gap-2 pb-6'}>*/}
            {/*    <p className={'px-3 py-2 bg-primary  rounded-3xl'}>*/}
            {/*        typed prompt..*/}
            {/*    </p>*/}

            {/*    <div className={'p-3 flex flex-col gap-3 bg-secondary rounded-3xl'}>*/}
            {/*        <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">*/}
            {/*            Dataset Name*/}
            {/*        </h4>*/}
            {/*        <OutputTextCard/>*/}
            {/*        <OutputChartsCard/>*/}
            {/*    </div>*/}

            {/*    <Button className={'w-40 h-7 ml-auto'}>*/}
            {/*        Export PDF*/}
            {/*        <Download/>*/}
            {/*    </Button>*/}
            {/*</div>*/}
        </ScrollArea>
    )
}

export default OutputWrapper;