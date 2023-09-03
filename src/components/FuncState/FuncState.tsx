import React from 'react'
import IntervalListener from '../Table/IntervalListener';


const FuncState = () => {

    return (
        < IntervalListener apiURL='https://api.omcc.ru/api/view/state' typeTable='state' />
    )
}

export default FuncState