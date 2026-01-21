import { ActionIcon, Menu } from "@mantine/core";
import { IconDots, IconTrash } from "@tabler/icons-react";
import { CSSProperties } from "react";

interface Props {
  style: CSSProperties;
  onDelete: () => void;
}

export function TransactionsMenu({ style, onDelete }: Props) {
  return (
    <div style={{ ...style, position: "fixed", bottom: 0, right: 0, zIndex: 10001 }}>
      <Menu
        width={200}
        shadow="md"
        withOverlay
        closeOnItemClick
        zIndex={10001}
        position="bottom-start"
        overlayProps={{ zIndex: 10000, blur: "1px", opacity: 0.8 }}
        offset={10}>
        <Menu.Target>
          <ActionIcon
            variant="outline"
            size="xl"
            radius="xl"
            aria-label="Transactions menu"
            color="dark.4"
            bg="white"
            m="md">
            <IconDots />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Selected transactions</Menu.Label>
          <Menu.Item color="red" leftSection={<IconTrash size={14} />} onClick={onDelete}>
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
