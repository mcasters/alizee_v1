import Image from "next/image";

import Layout from "@/components/layout/layout";
import Presentation from "@/components/home/Presentation";
import s from "./index.module.css";
import Prestations from "@/components/home/Prestations";
import Partenaires from "@/components/home/Partenaires";

export default function Index() {
  return (
    <Layout>
      <div className={s.container}>
        <Presentation />
        <div className={s.parallax}>
          <Prestations />
          <Partenaires />
        </div>
      </div>
    </Layout>
  );
}
