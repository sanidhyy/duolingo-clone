import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL);

const db = drizzle(sql, { schema });

const imageSources = {
  man: "/man.svg",
  woman: "/woman.svg",
  boy: "/boy.svg",
  zombie: "/zombie.svg",
  robot: "/robot.svg",
  girl: "/girl.svg",
} as const;

const challengeTemplates = [
  {
    type: "SELECT",
    target: "man",
    options: ["man", "woman", "boy"],
    answer: "man",
  },
  {
    type: "SELECT",
    target: "woman",
    options: ["woman", "boy", "man"],
    answer: "woman",
  },
  {
    type: "SELECT",
    target: "boy",
    options: ["woman", "man", "boy"],
    answer: "boy",
  },
  {
    type: "ASSIST",
    target: "man",
    options: ["woman", "man", "boy"],
    answer: "man",
  },
  {
    type: "SELECT",
    target: "zombie",
    options: ["man", "woman", "zombie"],
    answer: "zombie",
  },
  {
    type: "SELECT",
    target: "robot",
    options: ["robot", "zombie", "boy"],
    answer: "robot",
  },
  {
    type: "SELECT",
    target: "girl",
    options: ["girl", "zombie", "man"],
    answer: "girl",
  },
  {
    type: "ASSIST",
    target: "zombie",
    options: ["woman", "zombie", "boy"],
    answer: "zombie",
  },
] as const;

const courseContent = [
  {
    title: "Spanish",
    imageSrc: "/es.svg",
    audioPrefix: "es",
    words: {
      man: "el hombre",
      woman: "la mujer",
      boy: "el chico",
      zombie: "el zombie",
      robot: "el robot",
      girl: "la niña",
    },
  },
  {
    title: "French",
    imageSrc: "/fr.svg",
    audioPrefix: undefined,
    words: {
      man: "l'homme",
      woman: "la femme",
      boy: "le garçon",
      zombie: "le zombie",
      robot: "le robot",
      girl: "la fille",
    },
  },
] as const;

const main = async () => {
  try {
    console.log("Seeding database");

    const existingCourseTitles = new Set(
      (
        await db
          .select({ title: schema.courses.title })
          .from(schema.courses)
      ).map(({ title }) => title)
    );

    for (const content of courseContent) {
      if (existingCourseTitles.has(content.title)) {
        continue;
      }

      const [course] = await db
        .insert(schema.courses)
        .values({ title: content.title, imageSrc: content.imageSrc })
        .returning();

      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id,
            title: "Unit 1",
            description: `Learn the basics of ${course.title}`,
            order: 1,
          },
          {
            courseId: course.id,
            title: "Unit 2",
            description: `Learn intermediate ${course.title}`,
            order: 2,
          },
        ])
        .returning();

      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Nouns", order: 1 },
            { unitId: unit.id, title: "Verbs", order: 2 },
            { unitId: unit.id, title: "Adjectives", order: 3 },
            { unitId: unit.id, title: "Phrases", order: 4 },
            { unitId: unit.id, title: "Sentences", order: 5 },
          ])
          .returning();

        for (const lesson of lessons) {
          const challenges = await db
            .insert(schema.challenges)
            .values(
              challengeTemplates.map((challenge, index) => ({
                lessonId: lesson.id,
                type: challenge.type,
                question:
                  challenge.type === "ASSIST"
                    ? `"the ${challenge.target}"`
                    : `Which one of these is "the ${challenge.target}"?`,
                order: index + 1,
              }))
            )
            .returning();

          for (const [index, challenge] of challenges.entries()) {
            const template = challengeTemplates[index];

            await db.insert(schema.challengeOptions).values(
              template.options.map((word) => ({
                challengeId: challenge.id,
                correct: word === template.answer,
                text: content.words[word],
                ...(template.type === "SELECT"
                  ? { imageSrc: imageSources[word] }
                  : {}),
                ...(content.audioPrefix
                  ? { audioSrc: `/${content.audioPrefix}_${word}.mp3` }
                  : {}),
              }))
            );
          }
        }
      }
    }

    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

void main();
