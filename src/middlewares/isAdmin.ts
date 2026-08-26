"use server";

import { cookies } from "next/headers";

const isAdmin = async (): Promise<boolean> => {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("isAdmin");
  if (!isAdmin) {
    return false;
  }
  return true;
};

export default isAdmin;
