import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
  Show,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function MarketingPage() {
  return (
    <main
      dir="rtl"
      className="mx-auto flex w-full max-w-[1060px] flex-1 flex-col-reverse items-center justify-center gap-8 px-5 py-10 lg:flex-row lg:gap-16"
    >
      <div className="flex max-w-[500px] flex-col items-center text-center lg:items-start lg:text-right">
        <span className="mb-4 rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-700">
          همراه روزهای روشن نوجوانی
        </span>
        <h1 className="text-3xl font-extrabold leading-[1.65] text-emerald-950 lg:text-4xl">
          با قرآن دوست شو؛
          <br />
          هر روز یک قدم نزدیک‌تر
        </h1>
        <p className="mt-4 text-lg leading-8 text-neutral-600">
          حفظ، قرائت و مفاهیم قرآن را با تمرین‌های کوتاه، جذاب و مرحله‌به‌مرحله
          یاد بگیر.
        </p>
        <div className="mt-8 flex w-full max-w-[360px] flex-col gap-3">
          <ClerkLoading>
            <Loader className="mx-auto h-5 w-5 animate-spin text-muted-foreground" />
          </ClerkLoading>
          <ClerkLoaded>
            <Show when="signed-in">
              <Button size="lg" variant="secondary" className="w-full" asChild>
                <Link href="/learn">ادامه مسیر من</Link>
              </Button>
            </Show>
            <Show when="signed-out">
              <SignUpButton mode="modal">
                <Button size="lg" variant="secondary" className="w-full">
                  شروع یادگیری
                </Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button size="lg" variant="primaryOutline" className="w-full">
                  قبلاً ثبت‌نام کرده‌ام
                </Button>
              </SignInButton>
            </Show>
          </ClerkLoaded>
        </div>
      </div>
      <div className="relative h-[270px] w-[270px] lg:h-[440px] lg:w-[440px]">
        <Image
          src="/quran-hero.png"
          alt="یادگیری قرآن"
          fill
          priority
          className="object-contain"
        />
      </div>
    </main>
  );
}
