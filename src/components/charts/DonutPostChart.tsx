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

const chartConfig = {
  reactions: {
    label: "Active",
    color: "hsl(var(--chart-1))",
  },
  chats: {
    label: "Suspended",
    color: "hsl(var(--chart-2))",
  },
  bookmarks: {
    label: "Pending",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const tickerObj = [
  {
    tickerStyles: "--chart-1",
    label: "Reactions",
  },
  {
    tickerStyles: "--chart-2",
    label: "Chats",
  },
  {
    tickerStyles: "--chart-3",
    label: "Pending",
  },
];

export function DonutPostChart({ data }: { data?: DashboardOverviewResponse }) {
  const id = "pie-interactive";

  const backendData = React.useMemo(
    () => ({
      totalReactions: data?.["total reactions"] || 0,
      totalChats: data?.["total chats"] || 0,
      totalPosts: data?.["total posts"] || 0,
      totalBookmarks: data?.["total bookmarks"] || 0,
    }),
    [data]
  );

  const chartData = React.useMemo(
    () => [
      {
        label: chartConfig.reactions.label,
        value: backendData.totalReactions,
        fill: chartConfig.reactions.color,
      },
      {
        label: chartConfig.chats.label,
        value: backendData.totalChats,
        fill: chartConfig.chats.color,
      },
      {
        label: chartConfig.bookmarks.label,
        value: backendData.totalPosts,
        fill: chartConfig.bookmarks.color,
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
      <div className="flex flex-1 justify-center  pb-4">
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
