import { MobileSidebar } from "./mobile-sidebar";

export const MobileHeader = () => {
  return (
    <nav className="lg:hidden px-4 h-[50px] flex items-center bg-yellow-500 border-b fixed top-0 w-full z-50">
      <MobileSidebar />
    </nav>
  );
};
