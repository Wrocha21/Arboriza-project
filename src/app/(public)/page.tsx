import Navbar from "../Components/Navbar";
import '../Assets/css/global.css'
import Hero from "../Components/hero";
import SectionMap from "../Components/SectionMap";
import Sobre from "../Components/Sobre";

export default function Home() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <SectionMap/>
      <Sobre/>
    </>
  );
}
