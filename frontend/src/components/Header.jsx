import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset, logouting } from "../features/auth/authSlice";
import { FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import "./Header.css";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const logoutHandler = () => {
    dispatch(logouting());
    dispatch(reset());
    navigate("/login");
    console.log("navagating");
  };
  return (
    <div className="header">
      <div className="logo">
        <Link to={"/"}>GoalSetters</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={logoutHandler}>
              <FaSignOutAlt />
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to={"/login"}>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to={"/register"}>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Header;
