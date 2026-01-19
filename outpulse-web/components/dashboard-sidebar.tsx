"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Building2, Users, Target, Inbox, Settings } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

const routes = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard", color: "text-sky-500" },
  { label: "Company Profile", icon: Building2, href: "/dashboard/company", color: "text-violet-500" },
  { label: "ICP", icon: Target, href: "/dashboard/icp", color: "text-pink-700" },
  { label: "Leads", icon: Users, href: "/dashboard/leads", color: "text-orange-700" },
  { label: "Inbox", icon: Inbox, href: "/dashboard/inbox", color: "text-green-700" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings", color: "text-gray-500" },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-white text-black border-r border-gray-200 shadow-sm">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            OutPulse
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-semibold cursor-pointer hover:bg-gray-100 rounded-lg transition",
                pathname === route.href ? "bg-gray-100 text-black border-l-4 border-blue-600 rounded-l-none" : "text-gray-600"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-2 border-t border-gray-100">
           <div className="flex items-center p-3 text-gray-600 gap-3">
               <UserButton showName/>
           </div>
      </div>
    </div>
  );
}
