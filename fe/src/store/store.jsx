import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./userSlice";
import projectCalenderSlice from "./projectCalenderSlice";
import toDoListSlice from "./toDoListSlice";
import addScheduleModalHandleSlice from "./addScheduleModalHandleSlice";
import newMessageSlice from "./newMessageSlice";
import projectChatShowSlice from "./projectChatShow";

const reducers = combineReducers({
  user: userSlice,
  projectCalender: projectCalenderSlice,
  toDoList: toDoListSlice,
  addScheduleModalHandle: addScheduleModalHandleSlice,
  newMessage: newMessageSlice,
  projectChatShow: projectChatShowSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
