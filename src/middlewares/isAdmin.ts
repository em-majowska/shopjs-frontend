"use server";

import { cookies } from "next/headers";

const isAdmin = async (): Promise<boolean | string> => {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("isAdmin");
  if (!isAdmin) {
    return false;
  }
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return false;
  }
  return token;
};

export default isAdmin;
