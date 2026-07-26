"use client";
import { useState } from "react";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  Show,
  UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";

import Banner from "@/components/banner";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [hideBanner, setHideBanner] = useState(true);
  return (
    <>
      <Banner hide={hideBanner} setHide={setHideBanner} />
      <header
        className={cn(
          "h-20 w-full border-b-2 border-emerald-100 px-4",
          !hideBanner ? "mt-20 sm:mt-16 lg:mt-10" : "mt-0"
        )}
      >
        <div className="mx-auto flex h-full items-center justify-between lg:max-w-screen-lg">
          <Brand href="/" />
          <ClerkLoading>
            <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
          </ClerkLoading>
          <ClerkLoaded>
            <Show when="signed-in">
              <UserButton />
            </Show>
            <Show when="signed-out">
              <SignInButton mode="modal">
                <Button size="lg" variant="ghost">
                  ورود
                </Button>
              </SignInButton>
            </Show>
          </ClerkLoaded>
        </div>
      </header>
    </>
  );
};
