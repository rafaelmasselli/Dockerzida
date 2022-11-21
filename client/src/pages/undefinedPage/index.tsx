import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { linkStyle } from "../../utils/linkStyle";

import "./styles.scss";

export function UndefinedPage() {
  const { user } = useAuth();

  return (
    <div>
      <div className="erro__text">
        <div className="name__erro">
          <h2>Erro 404</h2>

          {user ? (
            <h1>
              Página não encontrada volte para a{" "}
              <Link to="/" style={linkStyle}>
                home
              </Link>
            </h1>
          ) : (
            <h1>
              Página não encontrada{" "}
              <Link to="/register" style={linkStyle}>
                cadastre-se
              </Link>
              <br></br>
              para acessar os conteúdos do NG CA$H
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}
