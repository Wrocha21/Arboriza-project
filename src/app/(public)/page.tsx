import Navbar from "../Components/Navbar";
import "../../Assets/css/global.css";
import Hero from "../Components/SectionHero";
import SectionMap from "../Components/SectionMap";
import Sobre from "../Components/SectionSobre";
import Activity from "../Components/SectionActivity";

import 'swiper/swiper-bundle.css'
import Voluntary from "../Components/SectionVoluntary";
import SaibaMais from "../Components/SectionSaibaMais";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SectionMap />
      <Sobre />
      <Activity />
      <Voluntary/>
      <SaibaMais/>
    </>
  );
}
