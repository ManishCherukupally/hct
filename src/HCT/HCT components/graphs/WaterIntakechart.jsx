import React from 'react'
import ReactECharts from 'echarts-for-react';
import { BarChart } from 'echarts/charts';

const WaterIntakechart = (props) => {
    const { data } = props

    const xAxisData = data.map(item => item.date_of_activity);
    const yAxisData = data.map(item => item.water_in_liters);

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
            data: ["Water Consumed"]
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
                name: 'Water Consumed',
                type: 'line',
                smooth: true,
                barWidth: '60%',
                data: yAxisData.reverse(),
                color: "#fbc313",
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' L';
                    }
                },
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

export default WaterIntakechart
