'use client';

import Section1 from "./HomeTab/Section1/page";
import Section2 from "./HomeTab/Section2/page";
import Section3 from "./HomeTab/Section3/page";





export default function Home() {
  return (
     <div className="h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory  no-scrollbar">
      <Section1 />
      <Section2/>
      <Section3/>
     
    </div>
  );
}
