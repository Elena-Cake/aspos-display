import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const dataTest = [{ name: 'Page A', uv: 400, pv: 2400 }, { name: 'Page b', uv: 450, pv: 2500 }];
type dataType = typeof dataTest

const Chart = () => {
    const [data, setData] = React.useState([] as dataType)

    React.useEffect(() => {
        setData(dataTest)
    }, [])

    return (
        <LineChart width={800} height={600} data={data} margin={{ top: 15, right: 20, bottom: 15, left: 10 }}>
            <Line type="monotone" dataKey="uv" stroke="#6884d8" strokeWidth={3} />
            <Line type="monotone" dataKey="pv" stroke="#1284f9" strokeWidth={3} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
        </LineChart>
    )
}

export default Chart