import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./features/auth/AuthSlice";
import MainSlice from "./features/main/MainSlice";
import ComputersSlice from "./features/computers/ComputersSlice";

export const store = configureStore({
    reducer:{
        auth:authSlice,
        main:MainSlice,
        computers:ComputersSlice
    },
})
