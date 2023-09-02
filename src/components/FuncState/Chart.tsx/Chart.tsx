import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import axios from 'axios';


let intervalId: NodeJS.Timeout;
const dataTest = [
    { name: 'Page A', uv: 400, pv: 1400 },
    { name: 'Page b', uv: 150, pv: 1900 },
    { name: 'Page c', uv: 250, pv: 700 },
    { name: 'Page d', uv: 480, pv: 2300 },
    { name: 'Page e', uv: 550, pv: 1000 },
    { name: 'Page f', uv: 450, pv: 500 }
];
type dataType = typeof dataTest

const Chart = () => {
    const [data, setData] = React.useState(null)
    const TIME_UPDATE_REPORT = 1000 * 60

    const fetchData = async () => {
        try {
            const { data } = await axios.get(`https://api.omcc.ru/api/view/server`)
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
        <>
            {!data && <>Загрузка...</>}
            {data &&
                <LineChart width={800} height={600} data={data} margin={{ top: 15, right: 20, bottom: 15, left: 10 }}>
                    <Line type="monotone" dataKey="uv" stroke="#6884d8" strokeWidth={3} />
                    <Line type="monotone" dataKey="pv" stroke="#1284f9" strokeWidth={3} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            }</>
    )
}

export default Chart