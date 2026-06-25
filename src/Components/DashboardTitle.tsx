import { useAuth } from "@/app/context/AuthContext";
import { ElementType } from "react";
import Image from "next/image";
import decoration from "../../public/Decoration.png";
import { TreeEvergreenIcon } from "@phosphor-icons/react";

interface dashboardTitleProps {
  title: string;
  desc: string;
  username: string;
  arrowBack: ElementType;
  hasAction?: () => void;
}

export default function DashboardWelcome({
  title,
  desc,
  arrowBack: ArrowBack,
  hasAction,
  username,
}: dashboardTitleProps) {
  return (
    <>
      <div className="container-welcome">
        <div className="box-welcome">
          <div className="box-userName">
            <span>Ola {username}! 👋</span>
            <div className="box-back" onClick={hasAction}>
              <ArrowBack width={26} height={26} color="white" />
            </div>
          </div>
          <div className="box-texts">
            <h2>{title}</h2>
            <span>{desc}</span>
          </div>
          <TreeEvergreenIcon
            width={24}
            height={24}
            id="treeIcon"
            weight="fill"
            color="#ace1ae86"
          />
          <div className="box-decoration">
            <Image src={decoration} width={139} height={44} alt=""></Image>
          </div>
        </div>
      </div>
    </>
  );
}
