import React from 'react'
import Table from '../Table/Table';
import axios from 'axios';
import { TIME_UPDATE_REPORT_TABLES } from '../../assets/constans';
import { ResType } from '../../types/types';

const data = {
    columns: [
        "Тип орбиты",
        "К-во КО по которым построены уточнённые орбиты",
        "К-во уточнённых орбит",
        "К-во проводок в уточнениях",
        "К-во измерений в уточнениях "
    ],
    table: [
        [
            "НОО",
            1097,
            1695,
            1695,
            215191
        ],
        [
            "СВО",
            197,
            566,
            566,
            6730
        ],
        [
            "ВЭО",
            756,
            3512,
            3512,
            175070
        ],
        [
            "ГСО",
            1030,
            11750,
            11750,
            130864
        ],
        [
            "ВГО",
            14,
            35,
            35,
            375
        ],
        [
            "Итого:",
            3035,
            17558,
            17558,
            528230
        ]
    ]
}


let intervalId: NodeJS.Timeout;
const InfoProcess = () => {

    const [data, setData] = React.useState<ResType | null>(null)

    const fetchData = async () => {
        try {
            const { data } = await axios.get(`https://api.omcc.ru/api/view/orbmeas`)
            setData(data)
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
        <Table data={data} />
    )
}

export default InfoProcess
