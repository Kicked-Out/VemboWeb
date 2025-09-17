import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { UserDTO } from "../DTOs/auth/userDTO";
import { UserService } from "../services/userService";
import { getToken, removeToken, setTokenToLocalStorage } from "../helpers/localStorage.helper";

interface AuthSlice {
    user: UserDTO | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthSlice = {
    user: null,
    token: getToken() || null,
    loading: false,
    error: null,
};

export const initSlice = createAsyncThunk("auth/initUser", async () => {
    const data = await UserService.get();

    if (!data) throw new Error("Failed to fetch user data");

    return data;
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },

        setToken: (state, action) => {
            state.token = action.payload;

            if (action.payload) {
                setTokenToLocalStorage(action.payload);
            } else {
                removeToken();
            }
        },

        logout: (state) => {
            state.user = null;
            state.token = null;

            removeToken();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initSlice.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(initSlice.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(initSlice.rejected, (state, action) => {
                state.user = null;
                state.loading = false;
                state.error = action.error.message || "Failed to load user";
            });
    },
});

export const selectUserData = (state: { auth: AuthSlice }) => state.auth.user;
export const selectUserLoading = (state: { auth: AuthSlice }) => state.auth.loading;
export const selectToken = (state: { auth: AuthSlice }) => state.auth.token;

export const { setUser, setToken, logout } = authSlice.actions;

export default authSlice.reducer;
