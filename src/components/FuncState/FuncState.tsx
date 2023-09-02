import React from 'react'
import { AgGridReact } from 'ag-grid-react';
import Table from '../Table/Table';
import axios from 'axios';


const data = {
    columns: [
        "№",
        "ОЭС",
        "Место",
        "Модель",
        "Код",
        "3акат",
        "Рассвет",
        "Обновлено",
        "Состояние"
    ],
    table: [
        [
            1,
            10265,
            "Уссурийск",
            "САНТЕЛ-650 (65)",
            null,
            "2023-09-01 09:48:57 (01:49)",
            "2023-09-01 20:35:22 (12:35)",
            null,
            null
        ],
        [
            2,
            10330,
            "Уссурийск",
            "ОРИ-25 (25)",
            "РКС",
            "2023-09-01 09:48:57 (01:49)",
            "2023-09-01 20:35:22 (12:35)",
            null,
            null
        ],
        [
            3,
            10348,
            "Уссурийск-Долины",
            "САНТЕЛ-650",
            "ЭОП 2М.2",
            "2023-09-01 09:49:15 (01:49)",
            "2023-09-01 20:35:41 (12:35)",
            "2023-09-01T07:59:08",
            "offline"
        ],
        [
            4,
            10346,
            "Уссурийск-Долины",
            "2xGenonMax",
            "ЭОП 2М.2",
            "2023-09-01 09:49:15 (01:49)",
            "2023-09-01 20:35:41 (12:35)",
            "2023-09-01T07:59:08",
            "offline"
        ],
        [
            5,
            10347,
            "Уссурийск-Долины",
            "САНТЕЛ-400",
            "ЭОП 2М.2",
            "2023-09-01 09:49:15 (01:49)",
            "2023-09-01 20:35:41 (12:35)",
            "2023-09-01T07:59:08",
            "offline"
        ]
    ]
}
let intervalId: NodeJS.Timeout;
const FuncState = () => {
    const [data, setData] = React.useState(null)
    const TIME_UPDATE_REPORT = 1000 * 60

    const fetchData = async () => {
        try {
            const { data } = await axios.get(`https://api.omcc.ru/api/view/state`)
            setData(data)
        } catch (err) {
            console.log(err)
        }
    }

    // setInterval and clean it
    function startSendingRequests() {
        intervalId = setInterval(() => {
            fetchData()
        }, TIME_UPDATE_REPORT);
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