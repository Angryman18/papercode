import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import graphqlQuery from "service/graphqlQuery";
import { createPaper as createPaperQuery } from "service/query";

export const registerPaperInfo = createAsyncThunk("create-paper", async (data) => {
  const response = await graphqlQuery(createPaperQuery(data)).catch((err) => Promise.reject(err));
  console.log(data)
  return Promise.resolve(response);
});

const initialState = {
  paperCode: "",
  paperLang: "",
  paperLangExt: "",
  createdAt: "",
  paperName: "",
  paperDesc: "",
  paperOwner: "",
  paperSync: false,
};

const CodeEnviroment = createSlice({
  name: "CodeEnvironment",
  initialState,
  reducers: {
    createPaper: (state, { payload }) => {
      return { ...state, ...payload, createdAt: new Date() };
    },
    writeCode: (state, { payload }) => {
      state.paperCode = payload.paperCode;
    },
    codeEnvStateUpdator: (state, { payload }) => {
      state[payload.state] = payload.stateValue;
    },
  },
  extraReducers: {
    [registerPaperInfo.fulfilled]: (state, { payload }) => {
      return { ...payload };
    },
  },
});

const { createPaper, writeCode, codeEnvStateUpdator } = CodeEnviroment.actions;
export default CodeEnviroment.reducer;
export { createPaper, writeCode, codeEnvStateUpdator };
