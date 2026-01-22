"use client";

import { Box, Grid, Stack, Text } from "@mantine/core";
import { IconBuildingBank } from "@tabler/icons-react";
import styles from "../../import.module.css";

export function BankBanner() {
  return (
    <Box pos="relative" w="100%" maw={480} className={styles.bankBannerContainer}>
      <Grid
        p="md"
        style={{ alignContent: "center" }}
        bd="1px dashed var(--mantine-color-gray-4)"
        mih={150}>
        <Grid.Col span={{ base: 12, xs: "content" }} ta="center">
          <IconBuildingBank color="var(--mantine-color-dimmed)" size={52} stroke={1.5} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 9 }}>
          <Text size="xl" inline>
            Connect to your bank account
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Using secure bank API
          </Text>
        </Grid.Col>
      </Grid>
      <Stack
        className={styles.bankBannerComingSoon}
        pos="absolute"
        w="100%"
        h="100%"
        top={0}
        left={0}
        right={0}
        bottom={0}
        justify="center"
        align="center"
        bg="rgba(248, 249, 250, 0.5)">
        <Text ta="center" c="red" size="xl" fw="bold" tt="uppercase">
          Coming soon
        </Text>
      </Stack>
    </Box>
  );
}
