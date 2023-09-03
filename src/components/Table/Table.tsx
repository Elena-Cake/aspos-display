import React from 'react'
import './Table.scss'
import { ResType } from '../../types/types'
import Loading from '../Loading'

type Props = {
    data: ResType | null
    isTypeState: boolean
}


const Table: React.FC<Props> = ({ data, isTypeState }) => {


    return (
        <>
            {!data && <Loading />}
            {data &&
                < div className='table__wrapper'>
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
                                    {data.map((item, j) => <th key={j} className='table__data'>{item}</th>)}
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