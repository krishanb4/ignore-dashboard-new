import Head from "next/head";
import Header from "@/components/Header";
import Theme from "@/components/Theme";
//import SelectButtons from "@/components/SelectButtons";
const SelectButtons = dynamic(() => import("../components/SelectButtons"), {
  ssr: false,
});
import { useFetchPublicData } from "../state/hooks";
import dynamic from "next/dynamic";
export default function Home() {
  useFetchPublicData();
  return (
    <>
      <Head>
        <title>IgnoreFud Dashboard</title>
        <meta name="description" content="IgnoreFud Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <SelectButtons />
      <Theme />
    </>
  );
}
