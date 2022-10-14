import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import graphqlQuery from "service/graphqlQuery";
import {
  createPaper as createPaperQuery,
  getSinglePaperInfo,
  changePaperName as changePaperNameQuery,
} from "service/query";

export const registerPaperInfo = createAsyncThunk("create-paper", async ({ data, token }) => {
  const response = await graphqlQuery(createPaperQuery(data), token).catch((err) =>
    Promise.reject(err)
  );
  return Promise.resolve(response);
});

export const retrieveSinglePaperInfo = createAsyncThunk(
  "retrieve-single-paper",
  async ({ userId, paperId, token }) => {
    const response = await graphqlQuery(getSinglePaperInfo(userId, paperId), token).catch((err) =>
      Promise.reject(err)
    );
    return response.data;
  }
);

export const changePaperName = createAsyncThunk("change-paper-name", async ({ data, token }) => {
  const { userId, paperId, paperName } = data;
  const response = await graphqlQuery(
    changePaperNameQuery(userId, paperId, paperName),
    token
  ).catch((err) => Promise.reject(err));
  return response.data;
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
      const data = payload?.data?.insert_paperTable?.returning[0];
      return { ...data, paperCode: data?.paperCode ? atob(data.paperCode) : "" };
    },
    [registerPaperInfo.rejected]: (state) => {
      return state;
    },
    [retrieveSinglePaperInfo.fulfilled]: (state, { payload }) => {
      const obj = payload.paperTable[0];
      return { ...state, ...obj, paperCode: obj.paperCode ? atob(obj.paperCode) : "" };
    },
    [retrieveSinglePaperInfo.rejected]: (state) => {
      return state;
    },
    [changePaperName.fulfilled]: (state, { payload }) => {
      state.paperName = payload?.update_paperTable?.returning[0]?.paperName;
    },
  },
});

const { createPaper, writeCode, codeEnvStateUpdator } = CodeEnviroment.actions;
export default CodeEnviroment.reducer;
export { createPaper, writeCode, codeEnvStateUpdator };
