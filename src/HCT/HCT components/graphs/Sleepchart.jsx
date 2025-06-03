import React, { useState } from 'react'
import ReactECharts from 'echarts-for-react';
const Sleepchart = (props) => {

    const { data } = props

    const xAxisData = data.map(item => item.date_of_activity);
    const yAxisData = data.map(item => {
        const [hours, minutes, seconds] = item.hours_of_sleep.split(":").map(Number)
        return hours + minutes / 60 + seconds / 3600;
    });

    const [ave, setave] = useState(null)
    const option = {
        toolbox: {
            feature: {
                // dataView: { show: true, readOnly: false },
                // magicType: { show: true, type: ['line', 'bar'] },
                // restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        legend: {
            data: ["Hours of Sleep"]

        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: xAxisData.reverse(),
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Hours of Sleep',
                type: 'bar',
                barWidth: '60%',
                data: yAxisData.reverse(),
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' Hrs';
                    }
                },
                markLine: {
                    data: [
                        { type: 'average', name: 'Avg' }
                    ],
                    label: {
                        position: 'middle',
                        formatter: function (params) {
                            setave(params.value.toFixed(1))
                            return `Average: ${params.value.toFixed(1)}Hrs`;

                        }
                    },
                    lineStyle: {
                        type: 'dashed', // optional, makes the line dashed
                        color: '#fbc313'   // optional, customize line color
                    }

                }
            }
        ]
    };
    return (
        <div>
            <ReactECharts
                option={option}
                style={{ height: 400 }}
            />
        </div>
    )

}

export default Sleepchart
