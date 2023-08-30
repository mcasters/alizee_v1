import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";

import Layout from "@/components/layout/layout";
import AddPostComponent from "@/components/admin/post/AddPostComponent";
import AccessDenied from "@/components/auth/access-denied";
import PostListComponent from "@/components/admin/post/PostListComponent";
import AdminNav from "@/components/layout/AdminNav";

export default function Actualites() {
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
      <PostListComponent />
      <AddPostComponent />
    </Layout>
  );
}
