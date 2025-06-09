import React from "react";
import Section from "../components/Section";
import Section1 from "../components/Section1";
import Getin from "./Getin";
import Pricing from "../components/Pricing";
import  Explore  from "../components/Explore";
import Ready from "../components/Ready";
import Section2 from "../components/Section2";
function Home() {
  return (
    <div>
      <Section />
      <Section1/>
      <Section2/>
      <Explore/>
      <Pricing/>
      <Getin/>
      <Ready/>
    </div>
  );
}

export default Home;
