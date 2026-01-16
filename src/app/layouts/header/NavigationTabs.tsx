import { Group, Tabs, Text } from "@mantine/core";
import { navigate } from "rwsdk/client";
import { navigation } from "../../config/navigation";

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
        {navigation.config.map((item, i) => (
          <Tabs.Tab value={item.href} h="100%" key={i + item.href}>
            <Text tt="uppercase" fw="500" size="xs">
              {item.label}
            </Text>
          </Tabs.Tab>
        ))}
      </Group>
    </Tabs>
  );
}
