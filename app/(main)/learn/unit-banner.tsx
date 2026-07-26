import { BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
type UnitBannerProps = { title: string; description: string };
export const UnitBanner = ({ title, description }: UnitBannerProps) => (
  <div className="flex w-full items-center justify-between rounded-xl bg-emerald-600 p-5 text-white">
    <div className="space-y-2.5">
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-lg">{description}</p>
    </div>
    <Link href="/lesson">
      <Button
        size="lg"
        variant="secondary"
        className="hidden border-2 border-b-4 active:border-b-2 xl:flex"
      >
        <BookOpen className="ml-2" />
        ادامه تمرین
      </Button>
    </Link>
  </div>
);
