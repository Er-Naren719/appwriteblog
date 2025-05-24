import { configureStore } from "@reduxjs/toolkit";
import authService from "./authSlice";

const store = configureStore({
	reducer: {
		auth: authService,
	},
});

export default store;
