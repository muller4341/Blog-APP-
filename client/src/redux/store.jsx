import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";

const store = configureStore({

    reducer: {

        user: userReducer,
        // other reducers go here
    }

});

export default store;
