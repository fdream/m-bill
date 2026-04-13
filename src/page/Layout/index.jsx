//一级路由
import { Link, Outlet } from 'react-router-dom';
//状态管理相关
import { useSelector, useDispatch } from 'react-redux'
import { getBillList } from '@/store/models/billstore'
import { useEffect } from 'react'
// 引入样式
import { TabBar } from "antd-mobile"
import './index.scss'
import {
    BillOutline,
    CalculatorOutline,
    AddCircleOutline
} from 'antd-mobile-icons'

const tabs = [
    {
        key: '/month',
        title: '月度账单',
        icon: <BillOutline />,
    },
    {
        key: '/new',
        title: '记账',
        icon: <AddCircleOutline />,
    },
    {
        key: '/year',
        title: '年度账单',
        icon: <CalculatorOutline />,
    },
]

const Layout = () => {
    //获取账单列表
    const billList = useSelector((state) => state.bill.billList)
    //获取账单列表
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBillList())
    }, [dispatch])

    return (
        <div className="layout">
            <div className="container">
                <Outlet />
            </div>
            <div className="footer">
                <TabBar>
                    {tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                    ))}
                </TabBar>
            </div>
        </div>
    )
}
export default Layout

