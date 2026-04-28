import { ElementType } from "react";

interface CardProps {
  icon: ElementType;
  title: string;
  desc: string;
  numText: string;
  hasNumber: boolean;
  hasRedirect?: () => void
  onLeftPage?: () => void
}

export default function Card({
  icon: Icon,
  title,
  desc,
  numText,
  hasNumber = false,
  hasRedirect,
  onLeftPage
}: CardProps) {
  return (
    <>
      <div className="card" onClick={hasRedirect || onLeftPage}>
        <div className="box-info">
          <div className="box-icon">
            <Icon size={32} color="#016726" />
          </div>
          <div className="box-titles">
            <h2>{title}</h2>
            <span>{desc}</span>
          </div>
        </div>
        {hasNumber && (
          <div className="box-numberInfo">
            <span>{numText}</span>
          </div>
        )}
      </div>
    </>
  );
}
