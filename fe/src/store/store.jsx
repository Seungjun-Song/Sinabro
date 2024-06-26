import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./userSlice";
import projectCalenderSlice from "./projectCalenderSlice";
import toDoListSlice from "./toDoListSlice";
import addScheduleModalHandleSlice from "./addScheduleModalHandleSlice";
import newMessageSlice from "./newMessageSlice";
import projectChatShowSlice from "./projectChatShow";
import isDarkSlice from "./isDarkSlice";
import projectCreateSlice from "./projectCreateSlice";
import userSearchSlice from "./userSearchSlice";
import inviteUserSlice from "./inviteUserSlice";
import invitedUserListSlice from "./invitedUserListSlice";
import projectRoomIdSlice from "./projectRoomIdSlice";
import myProjectListSlice from "./myProjectListSlice";
import myCurrentProjectSlice from "./myCurrentProjectSlice";
import myChatingListSlice from "./myChatingListSlice";
import feedbackMemberIdSlice from "./feedbackMemberIdSlice";
import sizeSlice from "./sizeSlice";

const reducers = combineReducers({
  user: userSlice,
  projectCalender: projectCalenderSlice,
  toDoList: toDoListSlice,
  addScheduleModalHandle: addScheduleModalHandleSlice,
  newMessage: newMessageSlice,
  projectChatShow: projectChatShowSlice,
  isDark : isDarkSlice,
  projectCreate: projectCreateSlice,
  userSearch: userSearchSlice,
  inviteUser: inviteUserSlice,
  invitedUserList: invitedUserListSlice,
  projectRoomId: projectRoomIdSlice,
  myProjectList: myProjectListSlice,
  myCurrentProject: myCurrentProjectSlice,
  myChatingList: myChatingListSlice,
  feedbackMemberId: feedbackMemberIdSlice,
  size : sizeSlice, 
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
