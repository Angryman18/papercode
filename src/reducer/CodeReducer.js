import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import graphqlQuery from "service/graphqlQuery";
import { createPaper as createPaperQuery, getSinglePaperInfo } from "service/query";

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
      return { ...payload?.data?.insert_paperTable?.returning[0] };
    },
    [registerPaperInfo.rejected]: (state) => {
      return state;
    },
    [retrieveSinglePaperInfo.fulfilled]: (state, { payload }) => {
      const obj = payload.paperTable[0]
      return { ...state, ...obj, paperCode: obj.paperCode ? atob(obj.paperCode) : '' };
    },
    [retrieveSinglePaperInfo.rejected]: (state) => {
      return state;
    },
  },
});

const { createPaper, writeCode, codeEnvStateUpdator } = CodeEnviroment.actions;
export default CodeEnviroment.reducer;
export { createPaper, writeCode, codeEnvStateUpdator };
