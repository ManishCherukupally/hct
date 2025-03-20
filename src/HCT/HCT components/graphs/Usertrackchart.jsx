import React from 'react'
import ReactECharts from 'echarts-for-react';
import { color } from 'echarts';


const Usertrackchart = () => {

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
        // toolbox: {
        //     feature: {
        //         dataView: { show: true, readOnly: false },
        //         magicType: { show: true, type: ['line', 'bar'] },
        //         restore: { show: true },
        //         saveAsImage: { show: true }
        //     }
        // },
        legend: {
            data: ['Evaporation', 'Precipitation', 'Temperature']
        },
        xAxis: [
            {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: 'Precipitation',
                min: 0,
                max: 250,
                interval: 50,
                axisLabel: {
                    formatter: '{value} ml'
                }
            },
            {
                type: 'value',
                name: 'Temperature',
                min: 0,
                max: 25,
                interval: 5,
                axisLabel: {
                    formatter: '{value} °C'
                }
            }
        ],
        series: [
            // color: ['#233c79', '#fbc313'],
            {
                name: 'Evaporation',
                type: 'bar',
                color: "#233c79",
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' ml';
                    }
                },
                data: [
                    2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
                ]
            },
            {
                name: 'Precipitation',
                type: 'bar',
                color: "#fbc313",
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' ml';
                    }
                },
                data: [
                    2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
                ]
            },
            {
                name: 'Temperature',
                type: 'line',
                yAxisIndex: 1,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' °C';
                    }
                },
                data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
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
