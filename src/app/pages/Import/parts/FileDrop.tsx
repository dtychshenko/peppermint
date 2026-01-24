"use client";

import { Dropzone, FileRejection, FileWithPath } from "@mantine/dropzone";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { PropsWithChildren, startTransition, use, useState } from "react";
import { UPLOAD_ACCEPT, UPLOAD_SIZE_LIMIT_MB } from "../../../config/import";
import { TransactionDAO } from "../../../db";
import { categorizeWithAI } from "../../../functions/ai";
import { processCsvUpload } from "../../../functions/upload";

function SuspenseTrigger({ promise }: { promise: Promise<Array<TransactionDAO>> | null }) {
  if (promise) {
    use(promise);
  }
  return null;
}

export function FileDrop({ children }: PropsWithChildren) {
  const [promise, setPromise] = useState<Promise<Array<TransactionDAO>> | null>(null);

  const handleAcceptedFile = async (files: Array<FileWithPath>) => {
    // TODO: logging + analytics + rum
    console.log("File drop: accepted", files);

    console.log("File drop: starting processing", files);
    const notificationId = notifications.show({
      loading: true,
      title: "Loading",
      message: "Processing your file, please wait...",
      autoClose: false,
      withCloseButton: false,
    });

    // Send first file because we're only accepting a single upload at a time
    const added$ = processCsvUpload(files[0]);
    setPromise(added$);

    const added = await added$;

    // Use startTransition to prevent flicker when navigating away from upload state
    startTransition(() => {
      setPromise(null);
    });

    console.log("File drop: processing finished", added.length);
    notifications.update({
      id: notificationId,
      title: `Added ${added.length} new transactions!`,
      message: `We took our first stab at categorizing your transactions and now running a deep dive to improve accuracy.
      This may take a few seconds, but we will notify you when we're done.`,
      withCloseButton: true,
    });

    await categorizeWithAI(added);

    notifications.update({
      id: notificationId,
      color: "green",
      title: `Done!`,
      message: `Your file has been processed and categorized. Head over to the transactions page to review your transactions.`,
      icon: <IconCheck size={18} />,
      loading: false,
      withCloseButton: true,
      autoClose: 10000,
    });
  };

  const handleRejectedFile = (files: Array<FileRejection>) => {
    // TODO: logging + analytics + rum
    console.log("File drop: rejected", files);
    notifications.show({
      title: "Oops!",
      message: `Only CSV files less than ${UPLOAD_SIZE_LIMIT_MB}MB are currently supported.`,
      color: "red",
    });
  };

  return (
    <>
      <SuspenseTrigger promise={promise} />
      <Dropzone
        accept={UPLOAD_ACCEPT}
        multiple={false}
        maxFiles={1}
        maxSize={UPLOAD_SIZE_LIMIT_MB * 1024 ** 2}
        onDrop={handleAcceptedFile}
        onReject={handleRejectedFile}>
        {children}
      </Dropzone>
    </>
  );
}
