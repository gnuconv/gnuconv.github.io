import { configureStore } from "@reduxjs/toolkit";
import { fileTypeSlice } from "./slices/fileType";
import { rulesSlice } from "./slices/rules";
import { transactionsFileContentSlice } from "./slices/transactionsFileContent";
import { gnuSlice } from "./slices/gnu";
import { timeframeSlice } from "./slices/timeframe";
import { highlightedCategorySlice } from "./slices/highlightedCategory";
import { selectedCategorySlice } from "./slices/selectedCategory";
import { pageSlice } from "./slices/page";
import { analyzePageSlice } from "./slices/analyzePage";

export const store = configureStore({
  reducer: {
    [fileTypeSlice.name]: fileTypeSlice.reducer,
    [rulesSlice.name]: rulesSlice.reducer,
    [transactionsFileContentSlice.name]: transactionsFileContentSlice.reducer,
    [gnuSlice.name]: gnuSlice.reducer,
    [timeframeSlice.name]: timeframeSlice.reducer,
    [highlightedCategorySlice.name]: highlightedCategorySlice.reducer,
    [selectedCategorySlice.name]: selectedCategorySlice.reducer,
    [pageSlice.name]: pageSlice.reducer,
    [analyzePageSlice.name]: analyzePageSlice.reducer,
  },
});

export type Store = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
