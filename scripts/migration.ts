import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function createEnumType(typeName: string, values: string[]) {
  const typeExists = await pool.query(`
    SELECT EXISTS (
      SELECT 1 FROM pg_type WHERE typname = '${typeName}'
    );
  `);

  if (!typeExists.rows[0].exists) {
    const enumValues = values.map((value) => `'${value}'`).join(", ");
    await pool.query(`CREATE TYPE ${typeName} AS ENUM (${enumValues});`);
    console.log(`Enum type ${typeName} created.`);
  } else {
    console.log(`Enum type ${typeName} already exists.`);
  }
}

async function createTable(createSql: string) {
  try {
    const client = await pool.connect();
    await client.query(createSql);
    client.release();
    console.log("Table created or verified successfully.");
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

async function main() {
  try {
    console.log("Starting database setup...");

    await createEnumType("type", ["SELECT", "ASSIST"]);

    await createTable(`
    CREATE TABLE IF NOT EXISTS courses (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      image_src TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS units (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      course_id INTEGER NOT NULL,
      "order" INTEGER NOT NULL,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS lessons (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      unit_id INTEGER NOT NULL,
      "order" INTEGER NOT NULL,
      FOREIGN KEY (unit_id) REFERENCES units(id) ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS challenges (
      id SERIAL PRIMARY KEY,
      lesson_id INTEGER NOT NULL,
      type type NOT NULL,
      question TEXT NOT NULL,
      "order" INTEGER NOT NULL,
      FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS challenge_options (
      id SERIAL PRIMARY KEY,
      challenge_id INTEGER NOT NULL,
      text TEXT NOT NULL,
      correct BOOLEAN NOT NULL,
      image_src TEXT,
      audio_src TEXT,
      FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS challenge_progress (
      id SERIAL PRIMARY KEY,
      user_id TEXT NOT NULL,
      challenge_id INTEGER NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT false,
      FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS user_progress (
      user_id TEXT PRIMARY KEY,
      user_name TEXT NOT NULL DEFAULT 'User',
      user_image_src TEXT NOT NULL DEFAULT '/mascot.svg',
      active_course_id INTEGER,
      hearts INTEGER NOT NULL DEFAULT 5,
      points INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (active_course_id) REFERENCES courses(id) ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS user_subscription (
      id SERIAL PRIMARY KEY,
      user_id TEXT NOT NULL UNIQUE,
      stripe_customer_id TEXT NOT NULL UNIQUE,
      stripe_subscription_id TEXT NOT NULL UNIQUE,
      stripe_price_id TEXT NOT NULL,
      stripe_current_period_end TIMESTAMP NOT NULL,
      FOREIGN KEY (user_id) REFERENCES user_progress(user_id)
    );
  `);

    console.log("Database setup completed successfully.");
  } catch (error) {
    console.error("Failed to set up database:", error);
  }
}

void main();
