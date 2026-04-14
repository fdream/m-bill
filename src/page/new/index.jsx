import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/contants'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBillList } from '@/store/models/billstore'
import dayjs from 'dayjs'


const New = () => {
    const navigate = useNavigate()
    //控制记账类型按钮-支出/收入
    const [billType, setBillType] = useState('pay')
    //金额状态变量
    const [money, setMoney] = useState(0)
    //金额输入框改变事件
    const moneyChange = (value) => {
        setMoney(value)
    }
    //账单类型状态变量
    const [useFor, setUseFor] = useState({})
    // 调用dispatch函数
    const dispatch = useDispatch()
    // 保存记账
    const saveBill = () => {
        const data={
            type: billType,
            date: date,
            money: billType === 'pay' ? -money : money,
            useFor: useFor,
        }
        console.log(data)
        dispatch(addBillList(data))
    }
    // 日期选择器显隐状态变量
    const [dateVisible, setDateVisible] = useState(false)
    //日期状态变量
    const [date, setDate] = useState()
    // 日期选择器确认事件
    const dataConfirm = (date) => {
        console.log(date)
        setDate(date)
        setDateVisible(false)
    }



    return (
        <div className="keepAccounts">
            <NavBar className="nav" onBack={() => navigate(-1)}>
                记一笔
            </NavBar>

            <div className="header">
                <div className="kaType">
                    <Button
                        shape="rounded"
                        className={classNames(billType === 'pay' ? 'selected' : '')}
                        onClick={() => setBillType('pay')}
                    >
                        支出
                    </Button>
                    <Button
                        shape="rounded"
                        className={classNames(billType === 'income' && 'selected')}
                        onClick={() => setBillType('income')}
                    >
                        收入
                    </Button>
                </div>

                <div className="kaFormWrapper">
                    <div className="kaForm">
                        <div className="date">
                            <Icon type="calendar" className="icon" />
                            <span className="text" onClick={() => setDateVisible(true)}>{dayjs(date).format('YYYY-MM-DD')}</span>
                            <DatePicker
                                className="kaDate"
                                title="记账日期"
                                max={new Date()}
                                visible={dateVisible}//抛锚
                                onConfirm={dataConfirm}
                                onCancel={() => setDateVisible(false)}
                                onClose={() => setDateVisible(false)}//点击空白区，以防万一
                            />
                        </div>
                        <div className="kaInput">
                            <Input
                                className="input"
                                placeholder="0.00"
                                type="number"
                                value={money}
                                onChange={moneyChange}
                                //onChange={(value) => setMoney(value)}
                            />
                            <span className="iconYuan">¥</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="kaTypeList">
                {billListData[billType].map(item => {
                    return (
                        <div className="kaType" key={item.type}>
                            <div className="title">{item.name}</div>
                            <div className="list">
                                {item.list.map(item => {
                                    return (
                                        <div
                                            className={classNames('item',useFor === item.type && 'selected')}
                                            key={item.type}
                                            onClick={() => setUseFor(item.type)}
                                        >
                                            <div className="icon">
                                                <Icon type={item.type} />
                                            </div>
                                            <div className="text">{item.name}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="btns">
                <Button className="btn save" onClick={saveBill}>
                    保 存
                </Button>
            </div>
        </div>
    )
}

export default New