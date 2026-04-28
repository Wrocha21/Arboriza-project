import Logo from "@/Assets/css/images/LOGO.png";
import Image from "next/image";

export default function NavbarDashboard() {
  return (
    <>
      <div className="container-navDash">
        <div className="logo">
          <Image src={Logo} width={124} height={57} alt="Logo"/>
        </div>
      </div>
    </>
  );
}
