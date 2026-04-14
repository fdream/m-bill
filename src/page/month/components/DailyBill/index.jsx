import classNames from 'classnames'
import './index.scss'
import { useMemo, useState } from 'react'
import { billTypeToName } from '@/contants'
import Icon from '@/components/icon'



const DailyBill = ({ date, billList }) => {//传的是整体对象需要解构赋值直接拿
    //1.计算单日统计结果
    const dayResult = useMemo(() => {
        //支出 收入 余额
        const pay =billList.filter(item => item.type === 'pay').reduce((pre,cur) => pre + cur.money,0)
        const income =billList.filter(item => item.type === 'income').reduce((pre,cur) => pre + cur.money,0)
        return {
            pay,
            income,
            total: income + pay
        }
    }, [billList])
    
    //控制单日账单显示
    const [visible, setVisible] = useState(false)

    return (
        <div className={classNames('dailyBill')}>
            <div className="header">
                <div className="dateIcon">
                    <span className="date">{date}</span>
                    {/* 点击展开/收起单日账单 */}
                    {/* <span className={classNames('arrow', visible && 'expand')} onClick={() => setVisible(!visible)}></span> */}
                    <span className={classNames('arrow', { 'expand': visible })} onClick={() => setVisible(!visible)}></span>
                </div>
                <div className="oneLineOverview">
                    <div className="pay">
                        <span className="type">支出</span>
                        <span className="money">{dayResult.pay.toFixed(2)}</span>
                    </div>
                    <div className="income">
                        <span className="type">收入</span>
                        <span className="money">{dayResult.income.toFixed(2)}</span>
                    </div>
                    <div className="balance">
                        <span className="money">{dayResult.total.toFixed(2)}</span>
                        <span className="type">结余</span>
                    </div>
                </div>
            </div>
            {/* 单日列表 */}
            <div className="billList" style={{ display: visible ? 'block' : 'none' }} >
                {billList.map(item => {
                    return (
                        <div className="bill" key={item.id}>
                            <Icon type={item.useFor} />
                            <div className="detail">
                                <div className="billType">{billTypeToName[item.useFor]}</div>
                            </div>
                            <div className={classNames('money', item.type)}>
                                {item.money.toFixed(2)}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default DailyBill