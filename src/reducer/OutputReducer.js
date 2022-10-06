import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const OutPutReducer = createSlice({
  name: "OutputReducer",
  initialState,
  reducers: {
    getOutputObject: (state, { payload }) => {
      return payload;
    },
  },
});

export default OutPutReducer.reducer;
const { getOutputObject } = OutPutReducer.actions;
export { getOutputObject };
