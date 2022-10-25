import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalsService from "./goalsService";

const initialState = {
  goals: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// get all goals
export const getAllGoals = createAsyncThunk(
  "goals/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalsService.getGoals(token);
    } catch (error) {
      const errorMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// create goal
export const createGoal = createAsyncThunk(
  "goals/createGoal",
  async (goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalsService.postGoal(goalData, token);
    } catch (error) {
      const errorMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// edit goal
export const editGoal = createAsyncThunk(
  "goals/editGoal",
  async (goalObj, thunkAPI) => {
    // destructring the object that has been sent while dispatching editGoal action
    const { goalIdObj, goalDataObj } = goalObj;
    try {
      const token = thunkAPI.getState().auth.user.token;
      // editting the goal
      await goalsService.editGoal(goalIdObj.goalId, goalDataObj, token);
      // fetching all goal again after editting goal
      return goalsService.getGoals(token);
    } catch (error) {
      const errorMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// delete goal
export const deleteGoal = createAsyncThunk(
  "goals/deleteGoal",
  async (goalId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalsService.deleteGoal(goalId, token);
    } catch (error) {
      const errorMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(getAllGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(editGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload.id
        );
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = goalsSlice.actions;
export default goalsSlice.reducer;
