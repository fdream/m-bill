//组合子模块
import billReducer from './models/billstore'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        bill: billReducer
    }
})

export default store