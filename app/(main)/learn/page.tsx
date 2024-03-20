import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUnits, getUserProgress } from "@/db/queries";

import { Header } from "./header";

const LearnPage = async () => {
  const userProgressData = getUserProgress();
  const unitsData = getUnits();

  const [userProgress, units] = await Promise.all([
    userProgressData,
    unitsData,
  ]);

  if (!userProgress || !userProgress.activeCourse) redirect("/courses");

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            {JSON.stringify(unit)}
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
