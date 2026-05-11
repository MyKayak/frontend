"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { formatTime } from "@/utils/formatting"

export const description = "An area chart with gradient fill"

const chartConfig = {
  time_ms: {
    label: "Time",
    color: "#8888ff",
  },
} satisfies ChartConfig

interface ProgressChartProps{
  entries: any[]
  className: string
}

export function ProgressChart(props: ProgressChartProps) {
  const processedData = props.entries.reduce((acc: any[], current) => {
    const existing = acc.find(item => item.date === current.date);
    if (existing) {
      if (current.time_ms < existing.time_ms) {
        existing.time_ms = current.time_ms;
      }
    } else {
      acc.push({ ...current });
    }
    return acc;
  }, []);

  processedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
        <ChartContainer config={chartConfig} className={props.className}>
          <AreaChart
            accessibilityLayer
            data={processedData}
            margin={{
              left: 48,
              right: 12,
              top: 12,
              bottom: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={64}
              tickFormatter={(value) => value.slice(0, 7)}
            />
            <YAxis
              reversed
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatTime}
              domain={['dataMin - 1000', 'dataMax + 1000']}
            />
            <ChartTooltip
              cursor={false}
              labelClassName="text-center"
              content={
                <ChartTooltipContent
                  labelFormatter={(_, payload) => {
                    const time = payload?.[0]?.value;
                    return time ? formatTime(time as number) : "";
                  }}
                  formatter={(_, __, item) => (
                    <>
                      <span className="font-mono text-white/50 tabular-nums text-center flex-1">
                        {item.payload.date}
                      </span>
                    </>
                  )}
                />
              }
            />
            <defs>
              <linearGradient id="fillTimeMs" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-time_ms)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-time_ms)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="time_ms"
              type="monotone"
              fill="url(#fillTimeMs)"
              fillOpacity={0.4}
              stroke="var(--color-time_ms)"
              baseValue="dataMax"
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ChartContainer>
  )
}
