import React from 'react';
import {Card, CardContent, CardHeader} from "@/components/ui/card.jsx";
import {BarChartMock} from "@/components/BarChartMock.jsx";
import {PieChartMock} from "@/components/PieChartMock.jsx";

function OutputChartsCard(props) {
    return (
        <Card className="w-full">
            <CardContent className={'flex'}>
                <BarChartMock></BarChartMock>
                <PieChartMock></PieChartMock>
            </CardContent>
        </Card>
    );
}

export default OutputChartsCard;