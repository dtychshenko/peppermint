"use client";

import { Anchor } from "@mantine/core";
import { Dropzone, FileRejection, FileWithPath } from "@mantine/dropzone";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useState } from "react";
import { UPLOAD_ACCEPT, UPLOAD_SIZE_LIMIT_MB } from "../../config/import";
import { processCsvUpload } from "../../functions/upload";
import LeafyCry from "../../shared/leafy-cry.svg?react";
import LeafyLaugh from "../../shared/leafy-laugh.svg?react";
import Leafy from "../../shared/leafy.svg?react";
import { TableSkeleton } from "./TableSkeleton";
import styles from "./transactions.module.css";

export function ZeroState() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAcceptedFile = async (files: FileWithPath[]) => {
    // TODO: logging + analytics + rum
    console.log("File drop: accepted", files);
    setIsProcessing(true);

    console.log("File drop: starting processing", files);
    const notificationId = notifications.show({
      loading: true,
      title: "Loading",
      message: "Processing your file, please wait...",
      autoClose: false,
      withCloseButton: false,
    });

    // Send first file because we're only accepting a single upload at a time
    const response = await processCsvUpload(files[0]);

    console.log("File drop: processing finished", response);
    notifications.update({
      id: notificationId,
      color: "green",
      title: "Done!",
      message: "Your file has been processed successfully",
      icon: <IconCheck size={18} />,
      loading: false,
      withCloseButton: true,
      autoClose: 5000,
    });
  };

  const handleRejectedFile = (files: FileRejection[]) => {
    // TODO: logging + analytics + rum
    console.log("File drop: rejected", files);
    notifications.show({
      title: "Oops!",
      message: `Only CSV files less than ${UPLOAD_SIZE_LIMIT_MB}MB are currently supported.`,
      color: "red",
    });
  };

  if (isProcessing) {
    return <TableSkeleton />;
  }

  return (
    <div className={styles.emptyContainer}>
      <Dropzone
        accept={UPLOAD_ACCEPT}
        multiple={false}
        maxFiles={1}
        maxSize={UPLOAD_SIZE_LIMIT_MB * 1024 ** 2}
        onDrop={handleAcceptedFile}
        onReject={handleRejectedFile}>
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
