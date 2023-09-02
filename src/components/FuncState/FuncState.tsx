import React from 'react'
import Table from '../Table/Table';
import axios from 'axios';
import { TIME_UPDATE_REPORT_TABLES } from '../../assets/constans';
import { ResType } from '../../types/types';


let intervalId: NodeJS.Timeout;
const FuncState = () => {
    const [data, setData] = React.useState<ResType | null>(null)

    const changeData = (data: ResType): ResType => {
        const newData = {
            columns: [
                "№",
                "ОЭС",
                "Место",
                "Модель",
                "Код",
                "Дата", //new column
                "3акат",
                "Рассвет",
                "Обновлено",
                "Состояние"
            ],
            table: data.table.map(arr => {
                return [
                    arr[0], arr[1], arr[2], arr[3], arr[4],
                    arr[5].substring(0, 10), //get date
                    arr[5].substring(10),
                    arr[6].substring(10),
                    arr[7]?.replace('T', ' '),
                    arr[8]]
            })
        }

        return newData
    }

    const fetchData = async () => {
        try {
            const { data } = await axios.get(`https://api.omcc.ru/api/view/state`)
            setData(changeData(data))
        } catch (err) {
            console.log(err)
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
        <Table data={data} typeTable='state' />
    )
}

export default FuncState