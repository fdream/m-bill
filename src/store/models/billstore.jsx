// 编写账单状态管理
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'



const billStore = createSlice({
    name: 'bill',
    initialState: {
        billList: []
    },
    reducers: {
        setBillList: (state, action) => {
            state.billList = action.payload
        },
        addBill: (state, action) => {
            state.billList.push(action.payload)
        }
    }
})

const { setBillList, addBill } = billStore.actions
//编写异步action获取数据
export const getBillList = () => async (dispatch) => {
    const res = await axios.get('http://localhost:8888/ka')
    dispatch(setBillList(res.data))
}
//编写异步action添加数据
export const addBillList = (data) => async (dispatch) => {
    const res = await axios.post('http://localhost:8888/ka', data)
    dispatch(addBill(res.data))
}


export default billStore.reducer
