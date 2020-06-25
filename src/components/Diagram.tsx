import React from "react";
import {Chart} from "react-google-charts";

type Props = {
    data: any,
    type: any,
    title: string,
    hTitle: string,
    minValue?: number,
    maxValue?: number,
    passImageURI: any
}

export const Diagram: React.FC<Props> = (props) => {

    let chartEvents: any;

    if (props.type !== 'Table') {
        chartEvents = [
            {
                eventName: "ready",
                callback({chartWrapper}: any) {
                    const image = chartWrapper.getChart().getImageURI();
                    props.passImageURI(image);
                }
            }
        ];
    } else {
        chartEvents = [];
    }


    return (
        <div className={'mb-5 chart_div'}>
            <Chart
                width={1000}
                height={400}
                chartType={props.type}
                // @ts-ignore
                chartEvents={chartEvents}
                loader={<div>Loading Chart</div>}
                data={
                    props.data
                }
            options={{
                    title: props.title,
                    hAxis: {
                        title: props.hTitle,
                        minValue: 0,
                    },
                    vAxis: {
                        title: 'Total confirmed',
                    },
                    legend: 'right',
                    sliceVisibilityThreshold: 1/50
                }}
                chartPackages={['corechart', 'controls']}
                controls={[
                    {
                        controlType: 'NumberRangeFilter',
                        options: {
                            filterColumnIndex: 1,
                            minValue: props.minValue,
                            maxValue: props.maxValue,
                        },
                    },
                ]}
                legendToggle
            />
        </div>
    );
};