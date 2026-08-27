"use server";

import { cookies } from "next/headers";

const isAuthenticated = async (): Promise<boolean | string> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return false;
  return token;
};

export default isAuthenticated;
