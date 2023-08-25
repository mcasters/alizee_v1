import Image from "next/image";

import Layout from "@/components/layout/layout";

export default function Index() {
  return (
    <Layout>
      <div>
        <div>
          Je me présente !
          <Image
            width={512}
            height={512}
            src="/logo-transparent-670.png"
            alt="Alizée Roussel Dressage"
            className="w-36 h-36"
          />
        </div>
      </div>
    </Layout>
  );
}
