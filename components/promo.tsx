import { Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export const Promo = () => (
  <section
    dir="rtl"
    className="space-y-4 rounded-xl border-2 border-amber-100 bg-amber-50/40 p-4"
  >
    <div className="space-y-2">
      <div className="flex items-center gap-x-2 text-amber-700">
        <Sparkles className="h-6 w-6" />
        <h3 className="text-lg font-bold">همراه نور</h3>
      </div>
      <p className="text-muted-foreground">
        تمرین نامحدود و مسیرهای ویژه حفظ قرآن
      </p>
    </div>
    <Button variant="super" className="w-full" size="lg" asChild>
      <Link href="/shop">ببین چه چیزهایی داری</Link>
    </Button>
  </section>
);
