import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

import { getIsAdmin } from "@/lib/admin";

const App = dynamic(() => import("./app"), { ssr: false });

const AdminPage = async () => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) redirect("/");

  return (
    <div>
      <App />
    </div>
  );
};

export default AdminPage;
