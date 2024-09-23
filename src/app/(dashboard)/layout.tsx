import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";
import SideNav from "@/app/(dashboard)/components/SideNav";
import { NextUIProvider } from "@nextui-org/react";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const session = await auth();
  const allowedRoles = [
    "administrator",
    "manager",
    "productionStaff",
    "warehouseStaff",
    "logisticStaff",
  ];

  if (!session || !allowedRoles.includes(session.user.scope)) {
    return redirect("/");
  }

  return (
    <NextUIProvider>
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
    </NextUIProvider>
  );
}
