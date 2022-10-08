import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const OutPutReducer = createSlice({
  name: "OutputReducer",
  initialState,
  reducers: {
    getOutputObject: (state, { payload }) => {
      return { ...state, ...payload };
    },
    updateState: (state, { payload }) => {
      state[payload.state] = payload.stateValue;
    },
  },
});

export default OutPutReducer.reducer;
const { getOutputObject, updateState } = OutPutReducer.actions;
export { getOutputObject, updateState };
