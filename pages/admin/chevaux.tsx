import { useSession } from "next-auth/react";

import Layout from "@/components/layout/layout";
import AccessDenied from "@/components/auth/access-denied";
import AddHorseComponent from "@/components/admin/horse/AddHorseComponent";
import AdminNav from "@/components/layout/AdminNav";
import HorseListComponent from "@/components/admin/horse/HorseListComponent";
import s from "@/pages/admin/admin.module.css";

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
      <div className={s.adminContainer}>
        <AdminNav />
        <HorseListComponent isToSell={false} />
        <AddHorseComponent isToSell={false} />
      </div>
    </Layout>
  );
}
