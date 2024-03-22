import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { courses } from "@/db/schema";

export const GET = async () => {
  const data = await db.query.courses.findMany();

  return NextResponse.json(data);
};
