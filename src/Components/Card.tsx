import { ElementType } from "react";

interface CardProps {
  icon: ElementType;
  title: string;
  desc: string;
  numText?: string;
  hasNumber: boolean;
  bgIcon?: string
  colorIcon: "white" | "green" | string
  colorArrow?: string
  hasAction?: () => void
}

import {
  ArrowRightIcon,
} from "@phosphor-icons/react";

export default function Card({
  icon: Icon,
  title,
  desc,
  numText,
  hasNumber = false,
  hasAction,
  bgIcon,
  colorArrow,
  colorIcon
}: CardProps) {
  return (
    <>
      <div className="card" onClick={hasAction}>
        <div className="box-info">
          <div className="box-icon" style={{backgroundColor: bgIcon}}>
            <Icon size={40} color={colorIcon} />
          </div>
          <div className="box-titles" >
            <h2>{title}</h2>
            <span>{desc}</span>
          </div>
        </div>
        {hasNumber === false ? (
          <div className="box-arrow">
          <ArrowRightIcon size={27} color={colorArrow}/>
        </div>
        ):(
          ""
        )}
        
        {hasNumber && (
          <div className="box-numberInfo">
            <span>{numText}</span>
          </div>
        )}

      </div>
    </>
  );
}
