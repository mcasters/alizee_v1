import { useSession } from "next-auth/react";

import Layout from "@/components/layout/layout";
import AccessDenied from "@/components/auth/access-denied";
import AddHorseComponent from "@/components/horse/AddHorseComponent";
import AdminNav from "@/components/layout/AdminNav";

export default function ChevauxAVendre() {
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
      <AddHorseComponent />
    </Layout>
  );
}
