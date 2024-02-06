import { createSlice } from '@reduxjs/toolkit'

export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    value: false
  },
  reducers: {
    updateAdmin: (state, action) => {
      state.value = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateAdmin } = adminSlice.actions

export default adminSlice.reducer