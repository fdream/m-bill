import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useState, useMemo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs' //时间格式化
import classNames from 'classnames' //类名控制
import _ from 'lodash' //lodash
import DailyBill from './components/DailyBill' //日账单组件

const Month = () => {
    //时间选择器显示-状态变量
    const [dateVisible, setDateVisible] = useState(false)
    //获取当前月份-状态变量
    const [currentDate, setCurrentDate] = useState(
        () => dayjs(new Date()).format('YYYY-MM')
    )

    //获取账单列表-状态管理
    const billList = useSelector((state) => state.bill.billList)
    //1.账单列表按月分组
    const billGroupWithMonth = useMemo(() => {
        //按照账单数据列表里面的月份作为分组关键
        return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-MM'))
    }, [billList])

    //2.当前月份的账单列表-状态变量
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

    //初始化当前月份的账单
    useEffect(() => {
        const nowDate=dayjs().format('YYYY-MM')
        if(billGroupWithMonth[nowDate]){
            setCurrentBillList(billGroupWithMonth[nowDate])
        }
    }, [billGroupWithMonth])

    //时间选择器确认回调
    const onConfirm = (date) => {
        setDateVisible(false)
        const formatDate = dayjs(date).format('YYYY-MM')
        setCurrentDate(formatDate)//设置当前时间
        setCurrentBillList(billGroupWithMonth[formatDate] || [])//按月为键名向数组取值
    }
    //3.账单列表按日分组
    const billGroupWithDay = useMemo(() => {
        const dateWithDay = _.groupBy(currentBillList, (item) => dayjs(item.date).format('YYYY-MM-DD'))
        const keys = Object.keys(dateWithDay)//取出所有日期键名作为一个数组
        return {
            dateWithDay,
            keys
        }
    }, [currentBillList])


    return (
        <div className="monthlyBill">
            <NavBar className="nav" backArrow={false}>
                月度收支
            </NavBar>
            <div className="content">
                <div className="header">
                    {/* 时间切换区域 */}
                    <div className="date" >
                        <span className="text">
                            {currentDate}
                        </span>
                        {/* 时间切换器箭头-类名控制 */}
                        <span className={classNames('arrow', dateVisible && 'expand')} onClick={() => setDateVisible(true)}></span>
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
                        precision="month" //时间选择器精度-月
                        visible={dateVisible} //时间选择器是否显示
                        onConfirm={onConfirm}
                        onCancel={() => setDateVisible(false)}
                        onClose={() => setDateVisible(false)}
                        max={new Date()}
                    />
                </div>
                {/* 日账单组件 */}
                {billGroupWithDay.keys.map((item) => (
                    // 箭头函数-小括号不加return   传送当前月日和当前月日的账单列表
                    <DailyBill key={item} date={item} billList={billGroupWithDay.dateWithDay[item]} />
                ))}
            </div>
        </div >
    )
}

export default Month