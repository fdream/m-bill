import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useState } from 'react'
//时间格式化
import dayjs from 'dayjs'
//类名合并
import classNames from 'classnames'



const Month = () => {
    //控制时间选择器显示隐藏
    const [dateVisible, setDateVisible] = useState(false)
    //时间状态
    const [currentDate, setCurrentDate] = useState(
        () => dayjs(new Date()).format('YYYY-MM')
    )
    //时间选择器确认回调
    const onConfirm = (date) => {
        setDateVisible(false)
        setCurrentDate(dayjs(date).format('YYYY-MM'))
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
                        {/* 时间切换器箭头 */}
                        <span className={classNames('arrow',dateVisible&&'expand')}></span>
                    </div>
                    {/* 统计区域 */}
                    <div className='twoLineOverview'>
                        <div className="item">
                            <span className="money">{100}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{200}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{200}</span>
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