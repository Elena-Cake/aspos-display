import React from 'react'

type Props = {}

export default function Loading({ }: Props) {
    return (
        <div className='loading'>
            <p className='loading__text'> ...Идет загрузка, подождите...</p>
        </div>
    )
}