import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import { Card } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Ticker from "./Ticker";

// @ts-ignore
const desktopData = [
  { month: "january", desktop: 186, fill: "var(--color-january)" },
  { month: "february", desktop: 305, fill: "var(--color-february)" },
  { month: "march", desktop: 237, fill: "var(--color-march)" },
  { month: "april", desktop: 173, fill: "var(--color-april)" },
  { month: "may", desktop: 209, fill: "var(--color-may)" },
];

const chartConfig = {
  active: {
    label: "Active",
    color: "hsl(var(--chart-1))",
  },
  suspended: {
    label: "Suspended",
    color: "hsl(var(--chart-2))",
  },
  pending: {
    label: "Pending",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const tickerObj = [
  {
    tickerStyles: "--chart-1",
    label: "Active",
  },
  {
    tickerStyles: "--chart-2",
    label: "Suspended",
  },
  {
    tickerStyles: "--chart-3",
    label: "Pending",
  },
];

export function DonutUserChart({ data }: { data?: DasboardUserCountType }) {
  const id = "pie-interactive";

  const backendData = React.useMemo(
    () => ({
      totalUsers: data?.total || 0,
      activeUsers: data?.Active || 0,
      suspendedUsers: data?.Suspended || 0,
      pendingUsers: data?.Pending || 0,
    }),
    [data]
  );

  const chartData = React.useMemo(
    () => [
      {
        label: chartConfig.active.label,
        value: backendData.activeUsers,
        fill: chartConfig.active.color,
      },
      {
        label: chartConfig.suspended.label,
        value: backendData.suspendedUsers,
        fill: chartConfig.suspended.color,
      },
      {
        label: chartConfig.pending.label,
        value: backendData.pendingUsers,
        fill: chartConfig.pending.color,
      },
    ],
    [chartConfig, backendData]
  );

  const [activeSection] = React.useState(chartData[0].label);

  const activeIndex = React.useMemo(
    () => chartData.findIndex((item) => item.label === activeSection),
    [activeSection]
  );

  const total = chartData.reduce((sum, data) => sum + data.value, 0);

  return (
    <Card data-chart={id} className="flex flex-col border-none">
      <ChartStyle id={id} config={chartConfig} />
      <p className="text-sm text-grey">Total Overview</p>
      <div className="flex flex-1 justify-center p-6 pb-4">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full min-h-[200px] min-w-[200px] max-w-[300px] sm:max-w-[400px]"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="label"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {total.toLocaleString()}{" "}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Users
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
      <div className="row-flex !flex-wrap gap-4 mt-6 mx-3">
        {tickerObj?.map((ticker, idx) => (
          <Ticker key={idx} {...ticker} />
        ))}
      </div>
    </Card>
  );
}
