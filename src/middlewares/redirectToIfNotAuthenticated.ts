import { redirect } from "next/navigation";
import isAuthenticated from "./isAuthenticated";

const redirectToIfNotAuthenticated = async (path: string): Promise<void> => {
  const authenticated = await isAuthenticated();
  if (!authenticated) redirect(path);
};

export default redirectToIfNotAuthenticated;
