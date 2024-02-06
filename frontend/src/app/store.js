import { configureStore } from '@reduxjs/toolkit'
import adminReducer from '../features/admin/adminSlice'

export default configureStore({
  reducer: {
    admin: adminReducer
  }
})