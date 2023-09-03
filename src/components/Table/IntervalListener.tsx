import React from 'react'
import Table from './Table';
import { TIME_UPDATE_REPORT_TABLES } from '../../assets/constans';
import { ResType } from '../../types/types';
import axios from 'axios';

type Props = {
    typeTable?: string
    apiURL: string
}

let intervalId: NodeJS.Timeout;

export default function IntervalListener({ apiURL, typeTable = '' }: Props) {

    const [data, setData] = React.useState<ResType | null>(null)
    const isTypeState = typeTable === 'state'

    const fetchData = async () => {
        try {
            const { data } = await axios.get(apiURL)
            setData(data)
        } catch (err) {
            // @ts-ignore
            if (err.code === "ERR_NETWORK") {
                console.log("reload please")
                return
            }

            // @ts-ignore
            if (err.code === "ERR_FAILED") {
                console.log("reload please///")
                return
            }
            // @ts-ignore
            console.log(err.code)
        }
    }

    // setInterval and clean it
    function startSendingRequests() {
        intervalId = setInterval(() => {
            fetchData()
        }, TIME_UPDATE_REPORT_TABLES);
    }
    function stopSendingRequests() {
        console.log('stop requect sending state')
        clearInterval(intervalId);
    }

    React.useEffect(() => {
        fetchData()
        startSendingRequests()
    }, []);
    React.useEffect(() => () => stopSendingRequests(), []);

    return (
        <Table data={data} isTypeState={isTypeState} />
    )
}