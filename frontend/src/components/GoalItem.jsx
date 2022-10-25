import { useRef } from "react";
import { useDispatch } from "react-redux";
import { deleteGoal, editGoal } from "../features/goals/goalsSlice";
import { FaEdit } from "react-icons/fa";

function GoalItem({ goal }) {
  const dispatch = useDispatch();
  const deleteGoalHandler = () => {
    dispatch(deleteGoal(goal._id));
  };
  const goalRef = useRef();
  const textareaRef = useRef();
  const editGoalHandler = () => {
    goalRef.current.classList.toggle("active");
    const goalSiblings = Array.from(goalRef.current.parentElement.children);
    goalSiblings.forEach((child) => {
      if (child.dataset.id !== goalRef.current.dataset.id) {
        child.classList.remove("active");
      }
    });
  };
  const editGoalSubmitHandler = (e) => {
    e.preventDefault();
    const goalDataObj = {
      goalText: textareaRef.current.value,
    };
    const goalIdObj = {
      goalId: goal._id,
    };
    dispatch(editGoal({ goalIdObj, goalDataObj }));
  };
  return (
    <div className="goal" ref={goalRef} data-id={goal._id}>
      <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
      <h2>{goal.goalText}</h2>
      <div className="edit-goal-form">
        <form action="" onSubmit={editGoalSubmitHandler}>
          <div>
            <textarea
              name="goalText"
              id=""
              cols="30"
              rows="5"
              defaultValue={goal.goalText}
              ref={textareaRef}
            ></textarea>
          </div>
          <button>edit</button>
        </form>
      </div>
      <button className="close" onClick={deleteGoalHandler} title="Delete Goal">
        X
      </button>
      <button className="edit" onClick={editGoalHandler}>
        <FaEdit title="Edit Goal" />
      </button>
    </div>
  );
}

export default GoalItem;
