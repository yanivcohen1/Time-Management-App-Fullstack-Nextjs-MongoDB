import { Stack } from "@mui/material";
import { AdminOverviewCard } from "../_components/AdminOverviewCard";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ adminId: string }>;
}) {
  const { adminId } = await params;
  return (
    <Stack spacing={3}>
      <AdminOverviewCard adminId={adminId} />
      {children}
    </Stack>
  );
}
