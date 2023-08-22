import { useSession } from "next-auth/react";

import Layout from "@/components/layout/layout";
import AccessDenied from "@/components/auth/access-denied";
import AddHorseComponent from "@/components/admin/horse/AddHorseComponent";
import AdminNav from "@/components/layout/AdminNav";
import HorseListComponent from "@/components/admin/horse/HorseListComponent";

export default function Chevaux() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  return (
    <Layout>
      <AdminNav />
      <HorseListComponent />
      <AddHorseComponent />
    </Layout>
  );
}
