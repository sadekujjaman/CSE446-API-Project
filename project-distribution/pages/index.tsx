import type { NextPage } from "next";
import { Intro } from "./components/page-component/home";
import { WrapperPage } from "./components/page-component/page-wrapper";

const Home: NextPage = () => {
  return (
    <>
      <WrapperPage title="Goodies">{() => <Intro />}</WrapperPage>
    </>
  );
};

export default Home;
