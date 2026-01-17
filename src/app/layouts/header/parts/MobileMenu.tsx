import { MOBILE_BREAKPOINT } from "@/app/config/layout";
import { Drawer, type DrawerProps, NavLink, Text } from "@mantine/core";
import { navigation } from "../../../config/navigation";
import { ThemeSwitch } from "./ThemeSwitch";

interface Props {
  path: string;
  opened?: DrawerProps["opened"];
  onClose: DrawerProps["onClose"];
}

export function MobileMenu({ path, opened, onClose }: Props) {
  return (
    <Drawer.Root
      size="50%"
      position="right"
      opened={opened ?? false}
      onClose={onClose}
      hiddenFrom={MOBILE_BREAKPOINT}>
      <Drawer.Overlay />
      <Drawer.Content>
        <Drawer.Header>
          <ThemeSwitch />
          <Drawer.CloseButton />
        </Drawer.Header>
        <Drawer.Body>
          {navigation.config.map(({ href, label, icon: Icon }, i) => (
            <NavLink
              key={i + href}
              href={href}
              active={path === href}
              onClick={onClose}
              onKeyDown={onClose}
              leftSection={<Icon stroke="1.5" size="18" />}
              label={
                <Text tt="uppercase" fw="500" size="xs">
                  {label}
                </Text>
              }
            />
          ))}
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}
