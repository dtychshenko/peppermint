"use client";

import { DonutChart } from "@mantine/charts";
import { Stack, Title } from "@mantine/core";
import { useMemo } from "react";

interface CategoryTotal {
  name: string;
  value: string | number | bigint;
}

interface Props {
  data: Array<CategoryTotal>;
}

const MANTINE_COLORS = [
  "red",
  "pink",
  "grape",
  "violet",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "green",
  "lime",
  "yellow",
  "orange",
];

function getRandomColor() {
  const color = MANTINE_COLORS[Math.floor(Math.random() * MANTINE_COLORS.length)];
  const shade = Math.floor(Math.random() * 5) + 4; // Generates 4-9 for better visibility
  return `${color}.${shade}`;
}

export function ByCategory({ data }: Props) {
  const chartData = useMemo(
    () =>
      data.map((item) => ({
        ...item,
        value: Math.abs(+Number(item.value).toFixed(2)),
        color: getRandomColor(),
      })),
    [data],
  );

  return (
    <Stack align="center">
      <Title order={5}>Spending by category</Title>
      <DonutChart
        data={chartData}
        size={200}
        thickness={50}
        withLabels
        withLabelsLine={false}
        labelsType="percent"
      />
    </Stack>
  );
}
