import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GoalItem from "../components/GoalItem";
import Spinner from "../components/Spinner";
import { reset, getAllGoals, createGoal } from "../features/goals/goalsSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );
  const goalTextRef = useRef();
  const addGoalHandler = (e) => {
    e.preventDefault();
    const goalData = {
      goalText: goalTextRef.current.value,
    };
    dispatch(createGoal(goalData));
  };
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (isError) {
      toast.error(message);
      navigate("/login");
    } else {
      dispatch(getAllGoals());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, dispatch, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="dashboard pad">
      <section className="heading">
        <h1>Welcome {user && user.username}</h1>
        <p>Goals Dashboard</p>
      </section>
      <div className="form-container">
        <form action="" className="form" onSubmit={addGoalHandler}>
          <div className="input-container">
            <input
              type="text"
              name="goalText"
              placeholder="Goal Text"
              ref={goalTextRef}
            />
          </div>
          <button type="submit" className="form-button">
            Add A Goal
          </button>
        </form>
      </div>
      {goals.length > 0 ? (
        <div className="goals-container">
          {goals.map((goal) => (
            <GoalItem key={goal._id} goal={goal} />
          ))}
        </div>
      ) : (
        <h1 className="text-muted mt-3">You Don't Have Any Goals, Yet.</h1>
      )}
    </div>
  );
}

export default Dashboard;
