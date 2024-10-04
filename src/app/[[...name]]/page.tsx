import { List } from "@/components/List";

export default async function Home({ params }: { params: { name: string[] } }) {
  const dirPath = params.name?.length ? "/" + params.name.join("/") : "/";
  return <List mainPath={dirPath} />;
}
