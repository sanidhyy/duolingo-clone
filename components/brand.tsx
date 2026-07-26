import { BookOpen } from "lucide-react";
import Link from "next/link";

export const Brand = ({ href = "/learn" }: { href?: string }) => (
  <Link href={href} prefetch className="flex items-center gap-3" dir="rtl">
    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
      <BookOpen className="h-6 w-6" />
    </span>
    <span className="text-2xl font-extrabold tracking-tight text-emerald-700">
      نورِ قرآن
    </span>
  </Link>
);
