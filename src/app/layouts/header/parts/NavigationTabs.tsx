import { Group, Tabs, Text } from "@mantine/core";
import { navigate } from "rwsdk/client";
import { navigation } from "../../../config/navigation";

interface Props {
  path: string;
}

export function NavigationTabs({ path }: Props) {
  const handleSelectedTab = (value: string | null) => {
    navigate(value ?? "/");
  };

  return (
    <Tabs h="100%" value={path} onChange={handleSelectedTab} visibleFrom="xs">
      <Group gap={0} wrap="nowrap" h="100%">
        {navigation.config.map(({ href, label, icon: Icon }, i) => (
          <Tabs.Tab
            h="100%"
            value={href}
            key={i + href}
            leftSection={<Icon stroke="1.5" size="18" />}>
            <Text tt="uppercase" fw="500" size="xs">
              {label}
            </Text>
          </Tabs.Tab>
        ))}
      </Group>
    </Tabs>
  );
}
