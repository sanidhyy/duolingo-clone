import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const units = [
  {
    title: "بخش ۱: آشنایی با سوره‌های کوتاه",
    description: "حفظ و درک سوره‌های نورانی",
    lessons: ["سوره حمد", "سوره اخلاص", "سوره فلق", "سوره ناس", "مرور بخش اول"],
  },
  {
    title: "بخش ۲: قرائت زیبا",
    description: "با قواعد ساده تجوید آشنا شو",
    lessons: [
      "آهنگ آیات",
      "وقف و ابتدا",
      "حروف مد",
      "تلفظ درست",
      "تمرین قرائت",
    ],
  },
  {
    title: "بخش ۳: پیام‌های زندگی",
    description: "مفهوم آیات را در زندگی پیدا کن",
    lessons: ["شکرگزاری", "مهربانی", "راستگویی", "امید", "مرور مفاهیم"],
  },
];
const questions = [
  {
    question: "کدام عبارت آغاز سوره حمد است؟",
    options: [
      "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      "قُلْ هُوَ اللَّهُ أَحَدٌ",
      "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ",
    ],
    correct: 0,
  },
  {
    question: "پیام «الْحَمْدُ لِلَّهِ» چیست؟",
    options: ["شکر و ستایش خداوند", "ترس از دیگران", "تنها بودن"],
    correct: 0,
  },
  {
    question: "برای خواندن بهتر آیه چه کاری مفید است؟",
    options: [
      "با آرامش و دقت بخوانیم",
      "خیلی تند بخوانیم",
      "کلمات را حذف کنیم",
    ],
    correct: 0,
  },
];

async function main() {
  await Promise.all([
    db.delete(schema.challengeProgress),
    db.delete(schema.challengeOptions),
    db.delete(schema.challenges),
    db.delete(schema.lessons),
    db.delete(schema.units),
    db.delete(schema.userProgress),
    db.delete(schema.courses),
  ]);
  const [course] = await db
    .insert(schema.courses)
    .values({ title: "مسیر قرآن نوجوان", imageSrc: "/quran-hero.png" })
    .returning();
  for (let unitIndex = 0; unitIndex < units.length; unitIndex++) {
    const unitData = units[unitIndex];
    const [unit] = await db
      .insert(schema.units)
      .values({
        courseId: course.id,
        title: unitData.title,
        description: unitData.description,
        order: unitIndex + 1,
      })
      .returning();
    for (
      let lessonIndex = 0;
      lessonIndex < unitData.lessons.length;
      lessonIndex++
    ) {
      const [lesson] = await db
        .insert(schema.lessons)
        .values({
          unitId: unit.id,
          title: unitData.lessons[lessonIndex],
          order: lessonIndex + 1,
        })
        .returning();
      for (let qIndex = 0; qIndex < questions.length; qIndex++) {
        const q = questions[qIndex];
        const [challenge] = await db
          .insert(schema.challenges)
          .values({
            lessonId: lesson.id,
            type: "SELECT",
            question: q.question,
            order: qIndex + 1,
          })
          .returning();
        await db
          .insert(schema.challengeOptions)
          .values(
            q.options.map((text, optionIndex) => ({
              challengeId: challenge.id,
              text,
              correct: optionIndex === q.correct,
            }))
          );
      }
    }
  }
  console.log("Quran learning content seeded successfully");
}
main().catch(console.error);
