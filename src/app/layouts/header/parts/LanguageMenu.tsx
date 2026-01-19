import { ActionIcon, Menu } from "@mantine/core";
import { IconLanguage } from "@tabler/icons-react";

export function LanguageMenu() {
  return (
    <Menu>
      <Menu.Target>
        <ActionIcon variant="default" aria-label="Language selector" color="blue.6">
          <IconLanguage stroke={1.5} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item>English</Menu.Item>
        <Menu.Item>Français</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
