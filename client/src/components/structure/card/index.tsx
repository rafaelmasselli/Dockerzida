import { Link } from "react-router-dom";
import "./styles.scss";

const linkStyle = {
  textDecoration: "none",
  color: "black",
};

interface CardProps {
  title: string;
  icon: any;
  link: string;
}

export function Card({ title, icon, link }: CardProps) {
  return (
    <Link to={link} style={linkStyle}>
      <div className="card">
        <h2>{title}</h2>
        {icon}
      </div>
    </Link>
  );
}
