import { createSlice } from '@reduxjs/toolkit'



export const authSlice = createSlice({
    name: 'auth',
    initialState: { isLoggedIn: false, role: "user" },
    reducers: {
        login: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.isLoggedIn = false;
        },
        changerole: (state, action) => {
            const role = action.payload
            state.role = role
        },
    },
})

// Action creators are generated for each case reducer function
export const authActions = authSlice.actions

export default authSlice.reducer