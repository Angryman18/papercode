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
    resetState: () => {
      return { loading: false };
    },
  },
});

export default OutPutReducer.reducer;
const { getOutputObject, updateState, resetState } = OutPutReducer.actions;
export { getOutputObject, updateState, resetState };
