import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QUESTS } from "@/constants";
type QuestsProps = { points: number };
export const Quests = ({ points }: QuestsProps) => (
  <section
    dir="rtl"
    className="space-y-4 rounded-xl border-2 border-emerald-100 p-4"
  >
    <div className="flex w-full items-center justify-between">
      <h3 className="text-lg font-bold">ماموریت‌های امروز</h3>
      <Link href="/quests">
        <Button size="sm" variant="primaryOutline">
          همه
        </Button>
      </Link>
    </div>
    <ul className="w-full space-y-4">
      {QUESTS.slice(0, 3).map((quest) => {
        const progress = Math.min((points / quest.value) * 100, 100);
        return (
          <li className="flex w-full items-center gap-x-3" key={quest.title}>
            <Image src="/points.svg" alt="امتیاز" width={40} height={40} />
            <div className="flex w-full flex-col gap-y-2">
              <p className="text-sm font-bold text-neutral-700">
                {quest.title}
              </p>
              <Progress value={progress} className="h-2" />
            </div>
          </li>
        );
      })}
    </ul>
  </section>
);
