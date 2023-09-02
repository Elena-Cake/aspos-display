import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area, Legend } from 'recharts';
import axios from 'axios';
import { TIME_UPDATE_REPORT_CHARTS } from '../../assets/constans';
import { ResType, chartsType, } from '../../types/types';
import './Charts.scss'


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

    const [widthCharts, setWidthCharts] = React.useState<number>(window.innerWidth * 0.9)

    const [date, setDate] = React.useState<string>('null')
    const [dataCharts, setDataCharts] = React.useState<chartsType[] | null>(null)

    const changeDataStructure = (data: ResType) => {
        setDate(String(data.table[0][0]).slice(0, 10))
        const charts: chartsType[] = []
        data.table.forEach(item => {
            charts.push({
                name: String(item[0]).slice(-8),
                cpu: Number(item[1]),
                mem: Number(item[2]),

                swap: Number(item[3]),

                res: Number(item[4]),
                send: Number(item[5]),

                read: Number(item[6]),
                write: Number(item[7])
            })
        })
        setDataCharts(charts)
    }

    const fetchData = async () => {
        try {
            const { data } = await axios.get(`https://api.omcc.ru/api/view/server`)
            changeDataStructure(data as ResType)
            // setData(data)
        } catch (err) {
            console.log(err)
        }
    }

    // setInterval and clean it
    function startSendingRequests() {
        intervalId = setInterval(() => {
            fetchData()
        }, TIME_UPDATE_REPORT_CHARTS);
    }
    function stopSendingRequests() {
        console.log('stop requect sending state')
        clearInterval(intervalId);
    }

    function handleResize() {
        setWidthCharts(window.innerWidth * 0.9);
    }

    React.useEffect(() => {
        fetchData()
        startSendingRequests()
        window.addEventListener('resize', handleResize);

        return () => {
            stopSendingRequests()
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <>
            {!dataCharts && <>Загрузка...</>}
            {dataCharts &&
                <div className='charts'>
                    <h2>Данные получены за {date}</h2>
                    <LineChart width={widthCharts} height={200} data={dataCharts} margin={{ top: 15, right: 20, bottom: 15, left: 10 }}>
                        <Line name="% использования cpu" type="monotone" dataKey="cpu" stroke="#0324ff" strokeWidth={3} r={1} />
                        <Line name="% доступной памяти" type="monotone" dataKey="mem" stroke="#ffb303" strokeWidth={3} r={1} />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend verticalAlign="top" height={36} />
                    </LineChart>
                    <LineChart width={widthCharts} height={100} data={dataCharts} margin={{ top: 15, right: 20, bottom: 15, left: 10 }}>
                        <Line name="% использования cpu" type="monotone" dataKey="swap" stroke="#009a0d" strokeWidth={3} r={1} />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend verticalAlign="top" height={36} />
                    </LineChart>
                    <AreaChart width={widthCharts} height={200} data={dataCharts} margin={{ top: 15, right: 20, bottom: 15, left: 10 }}>
                        <Area name="Получено по сети байт" type="monotone" dataKey="res" stroke="#8884d8" fill="#8884d8" strokeWidth={2} />
                        <Area name="Отпрвлено но сети байт" type="monotone" dataKey="send" stroke="#b00153" fill="#b00153" strokeWidth={2} />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend verticalAlign="top" height={36} />
                    </AreaChart >
                    <AreaChart width={widthCharts} height={200} data={dataCharts} margin={{ top: 15, right: 20, bottom: 15, left: 10 }}>
                        <Area name="Прочитано на диск байт" type="monotone" dataKey="cpu" stroke="#6a01b0" fill="#6a01b0" strokeWidth={2} />
                        <Area name="Записано на диск байт" type="monotone" dataKey="mem" stroke="#e75fff99" fill="#e75fff99" strokeWidth={2} />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend verticalAlign="top" height={36} />
                    </AreaChart>

                </div>
            }
        </>
    )
}

export default Chart