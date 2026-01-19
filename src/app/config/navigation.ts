import { IconCashRegister, IconChartHistogram, IconDatabaseImport } from "@tabler/icons-react";

export const navigation = {
  config: [
    { label: "Transactions", href: "/", icon: IconCashRegister },
    { label: "Import", href: "/import", icon: IconDatabaseImport },
    { label: "Analyze", href: "/analyze", icon: IconChartHistogram },
  ],
} as const;
