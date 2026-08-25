"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const logout = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete("token");

  redirect("/");
};

export default logout;
