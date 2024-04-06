import { configureStore } from "@reduxjs/toolkit";
import { fileTypeReducer } from "./slices/fileType";
import { rulesReducer } from "./slices/rules";
import { uploadReducer } from "./slices/upload";
import { uploadChartReducer } from "./slices/uploadChart";

export const store = configureStore({
  reducer: {
    fileType: fileTypeReducer,
    rules: rulesReducer,
    upload: uploadReducer,
    uploadChart: uploadChartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
