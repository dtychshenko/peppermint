"use client";

import { Group, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IconUpload, IconX } from "@tabler/icons-react";
import { Suspense } from "react";
import { UPLOAD_SIZE_LIMIT_MB } from "../../../config/import";
import { FileDrop } from "./FileDrop";

export function Upload() {
  return (
    <Suspense fallback={"Loading..."}>
      <FileDrop>
        <Group justify="center" gap="sm" mih={150} style={{ pointerEvents: "none" }}>
          <Dropzone.Accept>
            <IconUpload size={52} stroke={1.5} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconUpload size={52} color="var(--mantine-color-dimmed)" stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drop a CSV file here or click to select one
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              The file should not exceed {UPLOAD_SIZE_LIMIT_MB}MB
            </Text>
          </div>
        </Group>
      </FileDrop>
    </Suspense>
  );
}
