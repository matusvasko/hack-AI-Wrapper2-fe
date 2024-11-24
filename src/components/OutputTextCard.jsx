
import {
    Card,
    CardContent
} from "@/components/ui/card"


export function OutputTextCard({outputText}) {
    return (
        <Card className="w-full pt-4">
            <CardContent>
                {outputText}
            </CardContent>
        </Card>
    )
}
