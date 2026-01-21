"use client";

import { Anchor } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { Suspense } from "react";
import LeafyCry from "../../../shared/leafy-cry.svg?react";
import LeafyLaugh from "../../../shared/leafy-laugh.svg?react";
import Leafy from "../../../shared/leafy.svg?react";
import { FileDrop } from "../../Import/parts/FileDrop";
import styles from "../transactions.module.css";
import { TableSkeleton } from "./TableSkeleton";

export function ZeroState() {
  return (
    <div className={styles.emptyContainer}>
      <Suspense fallback={<TableSkeleton />}>
        <FileDrop>
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
        </FileDrop>
      </Suspense>
    </div>
  );
}
