"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

type SidebarItemProps = {
  label: string;
  iconSrc: string;
  href: string;
};

export const SidebarItem = ({ label, iconSrc, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Button
      variant={isActive ? "sidebarOutline" : "sidebar"}
      className="h-[52px] justify-start"
      asChild
    >
      <Link href={href} prefetch>
        <Image
          src={iconSrc}
          alt={label}
          className="ml-5"
          height={32}
          width={32}
        />
        {label}
      </Link>
    </Button>
  );
};
