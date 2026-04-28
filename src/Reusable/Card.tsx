import Image from "next/image";
interface CardProps {
  icon: string;
  title: string;
  desc: string;
  numText: string
}

export default function Card({ icon, title, desc, numText }: CardProps) {
  return (
    <>
      <div className="card">
        <div className="box-info">
          <div className="box-icon">
            <Image src={icon} width={30} height={30} alt="icon"></Image>
          </div>
          <div className="box-titles">
            <h2>{title}</h2>
            <span>{desc}</span>
          </div>
        </div>
        <div className="box-numberInfo">
          <span>{numText}</span>
        </div>
      </div>
    </>
  );
}
