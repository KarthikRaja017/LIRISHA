import type { Metadata } from "next";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "LIRISHA Admin Mode",
  description: "Manage and edit all services, sub-services, articles, blogs, testimonials, gallery items, and page content dynamically.",
};

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return <AdminDashboard />;
}
