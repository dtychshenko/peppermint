"use client";

import { Anchor, Group, Skeleton } from "@mantine/core";
import { Dropzone, FileRejection } from "@mantine/dropzone";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { UPLOAD_ACCEPT, UPLOAD_SIZE_LIMIT_MB } from "../../config/import";
import LeafyCry from "../../shared/leafy-cry.svg?react";
import LeafyLaugh from "../../shared/leafy-laugh.svg?react";
import Leafy from "../../shared/leafy.svg?react";
import styles from "./transactions.module.css";

const tableSkeletonColumns = 5;
const tableSkeletonRows = 10;
const TableSkeleton = (
  <>
    <Group>
      {Array.from({ length: tableSkeletonColumns }).map((_, index) => (
        <Skeleton
          key={index}
          height={40}
          mt={10}
          width={`calc(${100 / tableSkeletonColumns}% - (var(--mantine-spacing-md) * 0.8))`}
          radius="sm"
        />
      ))}
    </Group>
    {Array.from({ length: tableSkeletonRows }).map((_, index) => (
      <Skeleton key={index} height={20} mt={10} radius="sm" />
    ))}
    <Skeleton height={20} mt={10} width="80%" radius="sm" />
    <Skeleton height={20} mt={10} width="60%" radius="sm" />
  </>
);

export default function ZeroState() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRejectedFile = (files: FileRejection[]) => {
    // TODO: logging + analytics + rum
    console.log("rejected files", files);
    notifications.show({
      title: "Oops!",
      message: `Only CSV files less than ${UPLOAD_SIZE_LIMIT_MB}MB are currently supported.`,
      color: "red",
    });
  };

  const handleAcceptedFile = (files: File[]) => {
    // TODO: logging + analytics + rum
    console.log("accepted files", files);
    notifications.show({
      title: "Yay!",
      message: "File accepted",
      color: "green",
    });
    setIsProcessing(true);
  };

  if (isProcessing) {
    return TableSkeleton;
  }

  return (
    <div className={styles.emptyContainer}>
      <Dropzone
        onDrop={handleAcceptedFile}
        onReject={handleRejectedFile}
        maxSize={UPLOAD_SIZE_LIMIT_MB * 1024 ** 2}
        accept={UPLOAD_ACCEPT}>
        <Dropzone.Idle>
          <Leafy />
        </Dropzone.Idle>
        <Dropzone.Reject>
          <LeafyCry />
        </Dropzone.Reject>
        <Dropzone.Accept>
          <LeafyLaugh />
        </Dropzone.Accept>
        <h2>Nothing here yet</h2>
        <p>No worries, let's add some transactions!</p>
        <p>
          Drop a CSV file here or head over to the&nbsp;
          <Anchor href="/import">Import</Anchor> secton to get started.
        </p>
      </Dropzone>
    </div>
  );
}
