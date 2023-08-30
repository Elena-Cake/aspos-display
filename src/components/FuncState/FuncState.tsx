import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page b', uv: 450, pv: 2500, amt: 2200 }];

const FuncState = () => {
    const plotRef = React.useRef(null)

    return (
        <LineChart width={800} height={600} data={data} margin={{ top: 15, right: 20, bottom: 15, left: 10 }}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
        </LineChart>
    )
}

export default FuncState