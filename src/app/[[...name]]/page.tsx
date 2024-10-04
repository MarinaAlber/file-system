import { Button } from "@mantine/core";
import { notFound } from "next/navigation";
import { List } from "@/components/List";
import { homedir } from "os";

const getDirPath = async (name?: string[]) => {
  const dirPath = name?.length ? "/" + name.join("/") : '/';
  return {homePath: homedir(), dirPath};
};

export default async function Home({ params }: { params: { name: string[] } }) {
  const {homePath,dirPath} = await getDirPath(params.name);
  // const dirPath = params.name?.length ? "/" + params.name.join("/") : '/';
  return <List mainPath={dirPath}  />;
}
