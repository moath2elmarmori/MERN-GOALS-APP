import { FaSignInAlt } from "react-icons/fa";
import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { reset, login } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );
  const emailRef = useRef();
  const passwordRef = useRef();
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [isSuccess, isError, user, message, navigate, dispatch]);
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const userData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="auth-container">
      <div className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <h4 className="text-muted">Sign In & Set / Get, Goals</h4>
      </div>
      <div className="form-container">
        <form action="" className="form" onSubmit={formSubmitHandler}>
          <div className="input-container">
            <input
              type="email"
              name="email"
              placeholder="Please Enter An Email"
              ref={emailRef}
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              name="password"
              placeholder="Please Enter A Password"
              ref={passwordRef}
            />
          </div>
          <button type="submit" className="form-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
