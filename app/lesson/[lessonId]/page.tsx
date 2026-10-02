import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { getLesson, getUserProgress, getUserSubscription } from "@/db/queries";

import { Quiz } from "../quiz";

type LessonIdPageProps = {
  params: Promise<{
    lessonId: string;
  }>;
};

const LessonIdPage = async ({ params }: LessonIdPageProps) => {
  await auth.protect();

  const { lessonId } = await params;

  const lessonData = getLesson(Number(lessonId));
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [lesson, userProgress, userSubscription] = await Promise.all([
    lessonData,
    userProgressData,
    userSubscriptionData,
  ]);

  if (!lesson || !userProgress) return redirect("/learn");

  const totalChallenges = lesson.challenges.length;
  const completedChallenges = lesson.challenges.filter(
    (challenge) => challenge.completed
  ).length;

  const initialPercentage =
    totalChallenges === 0 ? 0 : (completedChallenges / totalChallenges) * 100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={userSubscription}
    />
  );
};

export default LessonIdPage;
