import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { UserDTO } from "../DTOs/auth/userDTO";
import { UserService } from "../services/userService";

interface AuthSlice {
    user: UserDTO | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthSlice = {
    user: null,
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
        logout: (state) => {
            state.user = null;
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

export const { logout } = authSlice.actions;

export default authSlice.reducer;
