"use client";

import { Dropzone, FileRejection, FileWithPath } from "@mantine/dropzone";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { PropsWithChildren, startTransition, use, useState } from "react";
import { UPLOAD_ACCEPT, UPLOAD_SIZE_LIMIT_MB } from "../../../config/import";
import { processCsvUpload } from "../../../functions/upload";

function SuspenseTrigger({ promise }: { promise: Promise<number> | null }) {
  if (promise) {
    use(promise);
  }
  return null;
}

export function FileDrop({ children }: PropsWithChildren) {
  const [promise, setPromise] = useState<Promise<number> | null>(null);

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

    console.log("File drop: processing finished", added);
    notifications.update({
      id: notificationId,
      color: "green",
      title: "Done!",
      message: `Added ${added} new transactions`,
      icon: <IconCheck size={18} />,
      loading: false,
      withCloseButton: true,
      autoClose: 5000,
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
