import { redirect } from "next/navigation";

import { getIsAdmin } from "@/lib/admin";
import { App } from "./app";

const AdminPage = async () => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) redirect("/");

  return <App />;
};

export default AdminPage;
