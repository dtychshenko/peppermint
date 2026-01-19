"use client";

import { DonutChart } from "@mantine/charts";
import { Text } from "@mantine/core";

const data = [
  { name: "USA", value: 400, color: "indigo.6" },
  { name: "India", value: 300, color: "yellow.6" },
  { name: "Japan", value: 100, color: "teal.6" },
  { name: "Other", value: 200, color: "gray.6" },
];

export default function Analyze() {
  return (
    <div>
      <Text>Spending by category</Text>
      <DonutChart data={data} />
    </div>
  );
}
