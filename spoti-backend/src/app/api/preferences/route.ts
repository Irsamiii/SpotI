import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Prisma } from "@/generated/prisma/client";
import { preferencesSchema } from "@/lib/validation/preferences";

// GET /api/preferences: current user's saved defaults
export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { preferences: true },
  });

  // Fall back to defaults if nothing is saved or the stored JSON is outdated
  const parsed = preferencesSchema.safeParse(user?.preferences ?? {});
  const preferences = parsed.success ? parsed.data : preferencesSchema.parse({});

  return NextResponse.json({ preferences });
}

// PUT /api/preferences: replace the saved defaults
export async function PUT(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = preferencesSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid preferences", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { preferences: parsed.data as Prisma.InputJsonValue },
  });

  return NextResponse.json({ preferences: parsed.data });
}