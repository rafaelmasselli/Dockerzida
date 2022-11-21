import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { linkStyleNavBar } from "../../../utils/linkStyle";

import "./styles.scss";

export function NavBar() {
  const { user, signOut } = useAuth();

  return (
    <div className="nav">
      {user ? (
        <>
          <input type="checkbox" id="nav-check" />
          <div className="nav-header">
            <div className="nav-title">
              <Link to="/" style={linkStyleNavBar}>
                NG ca$h
              </Link>
            </div>
          </div>
          <div className="nav-btn">
            <label htmlFor="nav-check">
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>
        </>
      ) : null}
      {user ? (
        <div className="nav-links">
          <nav>
            <li>
              <Link to="/" style={linkStyleNavBar}>
                Home
              </Link>
            </li>

            <li>
              <Link to="/transaction" style={linkStyleNavBar}>
                Transações
              </Link>
            </li>
            <li>
              <Link to="/new-transaction" style={linkStyleNavBar}>
                Nova transação
              </Link>
            </li>
            <li className="btn__signOut">
              <button onClick={signOut}>Sair</button>
            </li>
          </nav>
        </div>
      ) : (
        <div className="nav__register">
          <nav>
            <li>
              <Link to="/" style={linkStyleNavBar}>
                Entrar
              </Link>
            </li>
            <li>
              <Link to="/register" style={linkStyleNavBar}>
                Cadastrar
              </Link>
            </li>
          </nav>
        </div>
      )}
    </div>
  );
}
