"use server";

import { cookies } from "next/headers";

const isAuthenticated = async (): Promise<boolean> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return false;
  return true;
};

export default isAuthenticated;
