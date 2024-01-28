import type { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [],
};
