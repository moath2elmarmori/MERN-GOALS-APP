import { FaUser } from "react-icons/fa";
import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { reset, register } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Regsiter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();
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
    if (passwordRef.current.value !== password2Ref.current.value) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="auth-container">
      <div className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <h4 className="text-muted">Sign Up And Start Setting Goals</h4>
      </div>
      <div className="form-container">
        <form action="" className="form" onSubmit={formSubmitHandler}>
          <div className="input-container">
            <input
              type="text"
              name="username"
              placeholder="Enter Your Username"
              ref={usernameRef}
            />
          </div>
          <div className="input-container">
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              ref={emailRef}
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              ref={passwordRef}
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              name="password2"
              placeholder="Confirm Password"
              ref={password2Ref}
            />
          </div>
          <button type="submit" className="form-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Regsiter;
