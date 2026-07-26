import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

import { Brand } from "@/components/brand";
import { cn } from "@/lib/utils";
import { SidebarItem } from "./sidebar-item";

type SidebarProps = { className?: string };
export const Sidebar = ({ className }: SidebarProps) => (
  <aside
    dir="rtl"
    className={cn(
      "right-0 top-0 flex h-full flex-col border-l-2 border-emerald-100 px-4 lg:fixed lg:w-[256px]",
      className
    )}
  >
    <div className="px-4 pb-7 pt-8">
      <Brand />
    </div>
    <nav className="flex flex-1 flex-col gap-y-2">
      <SidebarItem label="مسیر یادگیری" href="/learn" iconSrc="/learn.svg" />
      <SidebarItem
        label="دوستان برتر"
        href="/leaderboard"
        iconSrc="/leaderboard.svg"
      />
      <SidebarItem label="ماموریت‌ها" href="/quests" iconSrc="/quests.svg" />
      <SidebarItem label="جوایز من" href="/shop" iconSrc="/shop.svg" />
    </nav>
    <div className="p-4">
      <ClerkLoading>
        <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
      </ClerkLoading>
      <ClerkLoaded>
        <UserButton
          appearance={{
            elements: { userButtonPopoverCard: { pointerEvents: "initial" } },
          }}
        />
      </ClerkLoaded>
    </div>
  </aside>
);
