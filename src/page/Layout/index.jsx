//一级路由
import { Link, Outlet } from 'react-router-dom';
//状态管理相关
import { useSelector, useDispatch } from 'react-redux'
import { getBillList } from '@/store/models/billstore'
import { useEffect } from 'react'


const Layout = () => {
    //获取账单列表
    const billList = useSelector((state) => state.bill.billList)
    //获取账单列表
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBillList())
    }, [dispatch])

    return (
        <div>
            这是一级路由
            {/* 账单列表 */}
            <ul>
                {billList.map((item) => (
                    <li key={item.id}>{item.money}</li>
                ))}
            </ul>
            {/* 配置二级路由的出口 */}
            <Outlet />
        </div>
    )
}
export default Layout

