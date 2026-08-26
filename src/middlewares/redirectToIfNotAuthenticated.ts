"use server";

import { redirect } from "next/navigation";
import isAuthenticated from "./isAuthenticated";
import isAdmin from "./isAdmin";

type TredirectToIfNotAuthenticated = {
  path: string;
  backoffice?: boolean;
};
const redirectToIfNotAuthenticated = async ({
  path,
  backoffice,
}: TredirectToIfNotAuthenticated): Promise<void> => {
  const authenticated = await isAuthenticated();
  if (!authenticated) redirect(path);

  if (backoffice) {
    const admin = await isAdmin();
    if (!admin) redirect(path);
  }
};

export default redirectToIfNotAuthenticated;
