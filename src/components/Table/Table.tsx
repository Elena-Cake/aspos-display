import React from 'react'
import './Table.scss'
import { ResType } from '../../types/types'
// import InfoText from '../InfoText'
// import { INFO_DATA } from '../../assets/constans'

type Props = {
    data: ResType | null
    isTypeState: boolean
    infoTexts?: string[]
}


const Table: React.FC<Props> = ({ data, isTypeState, infoTexts = [] }) => {


    return (
        <>
            {data &&
                < div className='table__wrapper table__wrapper_overflow'>
                    <div className='info__container'>
                        {infoTexts.map(text => <p className='info__text'>{text}</p>)}
                    </div>
                    <table className='table'>
                        <thead>
                            <tr className={`table__header ${isTypeState ?
                                'table__row9' : 'table__row5'}`}>
                                {data.columns.map((title, i) => <th key={i} className='table__title'>{title}</th>)}
                            </tr>
                        </thead>
                        <tbody >
                            {data.table.map((data, i) => {
                                return <tr key={i} className={`table__row ${isTypeState ?
                                    'table__row9' : 'table__row5'}`}>
                                    {data.map((item, j) => {
                                        if (item === 'disconnect') {
                                            return <th key={j} className='table__data table__data_grey'>{item}</th>
                                        }
                                        if (item === 'offline') {
                                            return <th key={j} className='table__data table__data_red'>{item}</th>
                                        }
                                        if (item === 'online') {
                                            return <th key={j} className='table__data table__data_green'>{item}</th>
                                        }

                                        return <th key={j} className='table__data'>{item}</th>
                                    })}
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            }
        </>
    )
}

export default Table