import type { PropsWithChildren } from "react";
import { MobileHeader } from "@/components/mobile-header";
import { Sidebar } from "@/components/sidebar";
const MainLayout = ({ children }: PropsWithChildren) => (
  <>
    <MobileHeader />
    <Sidebar className="hidden lg:flex" />
    <main dir="rtl" className="h-full pt-[50px] lg:pr-[256px] lg:pt-0">
      <div className="mx-auto h-full max-w-[1056px] pt-6">{children}</div>
    </main>
  </>
);
export default MainLayout;
