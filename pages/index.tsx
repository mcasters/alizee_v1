import Layout from "@/components/layout/layout";
import Presentation from "@/components/home/Presentation";
import Prestations from "@/components/home/Prestations";
import Partenaires from "@/components/home/Partenaires";

export default function Index() {
  return (
    <Layout>
      <div>
        <Presentation />
        <div>
          <Prestations />
          <Partenaires />
        </div>
      </div>
    </Layout>
  );
}
