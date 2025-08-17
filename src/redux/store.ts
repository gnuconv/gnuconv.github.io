import { configureStore } from "@reduxjs/toolkit";
import { fileTypeReducer, fileTypeSlice } from "./slices/fileType";
import { rulesReducer, rulesSlice } from "./slices/rules";
import {
  transactionsFileContentReducer,
  transactionsFileContentSlice,
} from "./slices/transactionsFileContent";
import { gnuFileReducer, gnuFileSlice } from "./slices/gnuFile";
import { timeframeReducer, timeframeSlice } from "./slices/timeframe";
import {
  highlightedCategoryReducer,
  highlightedCategorySlice,
} from "./slices/highlightedCategory";
import {
  selectedCategoryReducer,
  selectedCategorySlice,
} from "./slices/selectedCategory";
import { pageReducer, pageSlice } from "./slices/page";
import { analyzePageReducer, analyzePageSlice } from "./slices/analyzePage";

export const store = configureStore({
  reducer: {
    [fileTypeSlice.name]: fileTypeReducer,
    [rulesSlice.name]: rulesReducer,
    [transactionsFileContentSlice.name]: transactionsFileContentReducer,
    [gnuFileSlice.name]: gnuFileReducer,
    [timeframeSlice.name]: timeframeReducer,
    [highlightedCategorySlice.name]: highlightedCategoryReducer,
    [selectedCategorySlice.name]: selectedCategoryReducer,
    [pageSlice.name]: pageReducer,
    [analyzePageSlice.name]: analyzePageReducer,
  },
});

export type Store = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
