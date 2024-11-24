
import { OutputTextCard } from "@/components/OutputTextCard.jsx";
import { Button } from "@/components/ui/button.jsx";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton.jsx";
import { Brain, Database, Download } from "lucide-react";


function OutputWrapper({ prompt, response, dataset, model, error, isWaiting}) {
    return (
        <ScrollArea className="h-full w-full flex flex-col rounded-none p-4">
            <div className={"flex flex-col"}>
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
                    <div className={'flex flex-col gap-2 pb-6'}>
                        <p className={"px-4 py-2 bg-primary rounded-3xl"}>{prompt}</p>
                        <div className={"p-3 flex flex-col gap-3 bg-secondary rounded-3xl"}>
                        <div className={'w-full flex gap-4 opacity-40 p-2 py-0'}>
                            <div className={'flex gap-2 items-center'}>
                                <Database size={16}/>
                                {dataset}
                            </div>
                            <div className={'flex gap-2 items-center'}>
                                <Brain size={16}/>
                                {model}
                            </div>
                        </div>
                            <OutputTextCard outputText={response}/>
                            {/* <OutputChartsCard/> */}
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
        </ScrollArea>
    )
}

export default OutputWrapper;