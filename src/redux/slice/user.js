import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {fetchUser} from '../../api/user';

// Action
export const fetchUserDetails = createAsyncThunk("fetchUserDetails", async () => {
    try {
        const res = await fetchUser();
        console.log("user data inside redux", res.data);
        return res.data;
    } catch (e) {
        throw e;
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoading: false,
        data: null,
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserDetails.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchUserDetails.rejected, (state, action) => {
            console.log("Error while fetching user", action.payload);
            state.isError = true;
        });
    }
});

export default userSlice.reducer;