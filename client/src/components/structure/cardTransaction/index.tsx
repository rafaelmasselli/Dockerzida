import { Link } from "react-router-dom";

import circleStyle from "../../../assets/icon.png";

import "./styles.scss";

interface ITransaction {
  link: string;
  title: string;
}

export function CardTransaction({ link, title }: ITransaction) {
  return (
    <Link to={link} style={{ textDecoration: "none", color: "black" }}>
      <div className="card__transaction">
        <div className="header__card">
          <div className="container__circle__card">
            <div className="circle__card"></div>
            <div className="circle__card"></div>
            <div className="circle__card"></div>
          </div>
          <img src={circleStyle} alt="icon" />
        </div>
        <div className="box__card">
          <h1>{title}</h1>
        </div>
      </div>
    </Link>
  );
}
