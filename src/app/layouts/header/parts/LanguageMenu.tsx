import { ActionIcon, Menu } from "@mantine/core";
import { IconLanguage } from "@tabler/icons-react";

export function LanguageMenu() {
  return (
    <Menu>
      <Menu.Target>
        <ActionIcon variant="subtle" aria-label="Language selector" color="dark.3">
          <IconLanguage stroke={1.5} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item color="dark.3">English</Menu.Item>
        <Menu.Item color="dark.3">Français</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
