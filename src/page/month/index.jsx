import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useState, useMemo, useEffect } from 'react'
import { useSelector } from 'react-redux'
//时间格式化
import dayjs from 'dayjs'
//类名控制
import classNames from 'classnames'
//lodash
import _ from 'lodash'

const Month = () => {
    //时间选择器显示-状态管理
    const [dateVisible, setDateVisible] = useState(false)
    //获取当前月份-状态管理
    const [currentDate, setCurrentDate] = useState(
        () => dayjs(new Date()).format('YYYY-MM')
    )

    //1.按月做账单分组
    const billList = useSelector((state) => state.bill.billList)
    const billGroup = useMemo(() => {
        return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-MM'))
    }, [billList])

    //2.当前月份的账单分组-状态管理
    const [currentBillList, setCurrentBillList] = useState([])
    //3.计算当前月份的账单统计结果
    const monthResult = useMemo(() => {
        //支出 收入 余额
        const pay =currentBillList.filter(item => item.type === 'pay').reduce((pre,cur) => pre + cur.money,0)
        const income =currentBillList.filter(item => item.type === 'income').reduce((pre,cur) => pre + cur.money,0)
        return {
            pay,
            income,
            total: income + pay
        }
    }, [currentBillList])
    //初始化当前月份的账单分组
    useEffect(() => {
        const nowDate=dayjs().format('YYYY-MM')
        if(billGroup[nowDate]){
            setCurrentBillList(billGroup[nowDate])
        }
    }, [billGroup])

    //时间选择器确认回调
    const onConfirm = (date) => {
        setDateVisible(false)
        const formatDate = dayjs(date).format('YYYY-MM')
        setCurrentDate(formatDate)//设置当前时间
        setCurrentBillList(billGroup[formatDate] || [])//对象取值[]根据月份获取当月账单列表
    }
    return (
        <div className="monthlyBill">
            <NavBar className="nav" backArrow={false}>
                月度收支
            </NavBar>
            <div className="content">
                <div className="header">
                    {/* 时间切换区域 */}
                    <div className="date" onClick={() => setDateVisible(true)}>
                        <span className="text">
                            {/* {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月账单 */}
                            {currentDate}
                        </span>
                        {/* 时间切换器箭头-类名控制 */}
                        <span className={classNames('arrow',dateVisible&&'expand')}></span>
                    </div>
                    {/* 统计区域 */}
                    <div className='twoLineOverview'>
                        <div className="item">
                            <span className="money">{monthResult.pay.toFixed(2)}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.income.toFixed(2)}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.total.toFixed(2)}</span>
                            <span className="type">结余</span>
                        </div>
                    </div>
                    {/* 时间选择器 */}
                    <DatePicker
                        className="kaDate"
                        title="记账日期"
                        precision="month"
                        visible={dateVisible}
                        onConfirm={onConfirm}
                        onCancel={() => setDateVisible(false)}
                        onClose={() => setDateVisible(false)}
                        max={new Date()}
                    />
                </div>
            </div>
        </div >
    )
}

export default Month