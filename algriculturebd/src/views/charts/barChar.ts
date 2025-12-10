import type { ECOption } from '#/echarts'
import { comGrid, comLegend, comToolTip, comXAxis, comYAxis } from '@/utils/echarts-config'

export const createBarChart = (
  props: { xData: any, y1: any, y2: any, y3: any } = { xData: [], y1: [], y2: [], y3: [] },
) => {
  const { xData, y1, y2, y3 } = props
  const options: ECOption = {
    color: ['#389e0d'],
    tooltip: comToolTip(),
    legend: comLegend(),
    grid: comGrid(),
    xAxis: comXAxis(xData),
    yAxis: comYAxis('（元/公斤）', 20),
    series: [
      {
        type: 'bar',
        name: '最低价',
        data: y1,
      },
      {
        type: 'bar',
        name: '平均价',
        data: y2,
      },
      {
        type: 'bar',
        name: '最高价',
        data: y3,
      },
    ],
  }

  return options
}
