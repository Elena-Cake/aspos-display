import React from 'react'
import { InfoTextsType } from '../types/types'

type Props = {
    infoData: InfoTextsType | null
}

export default function InfoText({ infoData }: Props) {

    return (
        <>{infoData &&
            <div className='loading'>
                <p className={`loading__text ${infoData.isError ? 'error__text' : ''}`}> {infoData.text}</p>
            </div>}
        </>
    )
}