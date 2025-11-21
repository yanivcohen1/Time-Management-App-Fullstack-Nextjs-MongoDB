"use client";

import { useParams } from "next/navigation";
import { AdminOverviewCard } from "../_components/AdminOverviewCard";

export default function AdminDetailsPage() {
  const params = useParams<{ adminId?: string }>();
  const adminId = params?.adminId ?? "Unknown";

  return <AdminOverviewCard adminId={adminId} />;
}
