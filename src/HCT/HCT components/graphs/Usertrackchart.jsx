import React from 'react'
import ReactECharts from 'echarts-for-react';
import { color } from 'echarts';


const Usertrackchart = (props) => {

    const { data } = props

    const xAxisData = data.map(item => item.date_of_activity);
    const yAxisStepCount = data.map(item => item.step_count);
    const yAxisTotalDuration = data.map(item => {
        const [hours, minutes, seconds] = item.workout_duration.split(":").map(Number)
        return hours + minutes / 60 + seconds / 3600;
    });

    const option = {
        tooltip: {
            trigger: 'axis',
            // axisPointer: {
            //     type: 'cross',
            //     crossStyle: {
            //         color: '#999'
            //     }
            // }
        },
        toolbox: {
            feature: {
                // dataView: { show: true, readOnly: false },
                // magicType: { show: true, type: ['line', 'bar'] },
                // restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        legend: {
            data: ['Step Count', 'Workout Duration']
        },
        xAxis: [
            {
                type: 'category',
                data: xAxisData.reverse(),
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: 'Workout Duration',

                // min: 0,
                // max: 250,
                // interval: 50,
                // axisLabel: {
                //     formatter: '{value} ml'
                // }

            },
            {
                type: 'value',
                name: 'Step Count',

                // min: 0,
                // max: 25,
                // interval: 5,
                // axisLabel: {
                //     formatter: '{value} °C'
                // }
            }
        ],
        series: [
            // color: ['#233c79', '#fbc313'],
            // {
            //     name: 'Evaporation',
            //     type: 'bar',
            //     color: "#233c79",
            //     tooltip: {
            //         valueFormatter: function (value) {
            //             return value + ' ml';
            //         }
            //     },
            //     data: [
            //         2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
            //     ]
            // },
            {
                name: 'Workout Duration',
                type: 'bar',
                color: "#fbc313",
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' Hrs';
                    }
                },
                data: yAxisTotalDuration.reverse()
            },
            {
                name: 'Step Count',
                type: 'line',
                yAxisIndex: 1,
                // tooltip: {
                //     valueFormatter: function (value) {
                //         return value ;
                //     }
                // },
                data: yAxisStepCount.reverse()
            }
        ]
    };
    return (
        <div>
            <ReactECharts
                option={option}
                style={{ height: "75vh" }}
            />
        </div>
    )
}

export default Usertrackchart
