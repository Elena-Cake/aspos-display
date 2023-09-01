import React from 'react'
import './Table.scss'

type Props = {
    data: {
        columns: string[]
        table: any[][]
    }
}


const Table: React.FC<Props> = ({ data }) => {


    return (
        <table className='table'>
            <tr className='table__header'>
                {data.columns.map((title, i) => <th key={i} className='table__title'>{title}</th>)}
            </tr>
            {data.table.map((data, i) => {
                return <tr key={i} className='table__row'>
                    {data.map((item, j) => <th key={j} className='table__data'>{item}</th>)}
                </tr>
            })}

        </table>
    )
}

export default Table