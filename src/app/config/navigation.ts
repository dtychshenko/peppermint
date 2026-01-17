import { IconCashRegister, IconDatabaseImport } from "@tabler/icons-react";

export const navigation = {
  config: [
    { label: "Transactions", href: "/", icon: IconCashRegister },
    { label: "Import", href: "/import", icon: IconDatabaseImport },
  ],
} as const;
