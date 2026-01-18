import { Group, Skeleton } from "@mantine/core";

/** Number of header columns to show in the skeleton */
const columns = 5;

/** Number of fake rows to show in the skeleton */
const rows = 10;

export function TableSkeleton() {
  return (
    <>
      <Group>
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton
            key={index}
            height={40}
            mt={10}
            width={`calc(${100 / columns}% - (var(--mantine-spacing-md) * 0.8))`}
            radius="sm"
          />
        ))}
      </Group>
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton key={index} height={20} mt={10} radius="sm" />
      ))}
      <Skeleton height={20} mt={10} width="80%" radius="sm" />
      <Skeleton height={20} mt={10} width="60%" radius="sm" />
    </>
  );
}
