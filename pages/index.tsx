import Image from "next/image";
import Link from "next/link";

import Layout from "@/components/layout/layout";

export default function Index() {
  return (
    <Layout>
      <div>
        <div>
          <Image
            width={512}
            height={512}
            src="/logo.png"
            alt="Platforms on Vercel"
            className="w-36 h-36"
          />
        </div>
      </div>
    </Layout>
  );
}
