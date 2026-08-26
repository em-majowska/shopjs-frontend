"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const handleLogout = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  if (cookieStore.has("isAdmin")) cookieStore.delete("isAdmin");

  redirect("/");
};

export default handleLogout;
