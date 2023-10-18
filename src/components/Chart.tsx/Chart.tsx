import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import axios from "axios";
import { INFO_DATA, TIME_UPDATE_REPORT_CHARTS } from "../../assets/constans";
import { InfoTextsType, ResType, chartsType } from "../../types/types";

import "./Charts.scss";
import InfoText from "../InfoText";
import { apiOMCC } from "../../api/api";
// const s = require('./Charts.module.scss')

let intervalId: NodeJS.Timeout;

const Chart = () => {
  const [infoData, setInfoData] = React.useState<InfoTextsType | null>(
    INFO_DATA.loading
  );
  const [infoTime, setInfoTime] = React.useState<string[]>([]);

  const [widthCharts, setWidthCharts] = React.useState<number>(
    window.innerWidth * 0.9
  );
  // const [heightCharts, setHeightCharts] = React.useState<number>(window.innerHeight * 0.1)
  const heightCharts = window.innerHeight * 0.1;

  const [date, setDate] = React.useState<string>("null");
  const [dataCharts, setDataCharts] = React.useState<chartsType[] | null>(null);

  const changeDataStructure = (data: ResType) => {
    setDate(String(data.table[0][0]).slice(0, 10));
    const charts: chartsType[] = [];
    data.table.forEach((item) => {
      charts.push({
        name: String(item[0]).slice(-8),
        cpu: Number(item[1]),
        mem: Number(item[2]),

        swap: Number(item[3]),

        res: Number(item[4]),
        send: Number(item[5]),

        read: Number(item[6]),
        write: Number(item[7]),
      });
    });
    setInfoTime([charts[0].name, charts[charts.length - 1].name]);
    setDataCharts(charts);
  };

  const fetchData = async () => {
    try {
      setInfoData(INFO_DATA.loading);
      const { data } = await apiOMCC.getCoputing();
      changeDataStructure(data as ResType);
      // setData(data)
    } catch (err) {
      setInfoData(INFO_DATA.networkError);
      console.log(err);
      return;
    }
  };

  // setInterval and clean it
  function startSendingRequests() {
    intervalId = setInterval(() => {
      fetchData();
    }, TIME_UPDATE_REPORT_CHARTS);
  }
  function stopSendingRequests() {
    console.log("stop requect sending state");
    clearInterval(intervalId);
  }

  function handleResize() {
    setWidthCharts(window.innerWidth * 0.9);
  }

  React.useEffect(() => {
    fetchData();
    startSendingRequests();
    window.addEventListener("resize", handleResize);

    return () => {
      stopSendingRequests();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {!dataCharts && <InfoText infoData={infoData} />}
      {dataCharts && (
        <div className="charts">
          <div className="info__container">
            <p className="info__text">Статистика на: {date}</p>
            {infoTime && (
              <p className="info__text">{`Интервал времени наблюдения: ${infoTime[0]} - ${infoTime[1]}`}</p>
            )}
          </div>

          <p className="charts__label">ЦПУ, память</p>
          <LineChart
            width={widthCharts}
            height={heightCharts * 2}
            data={dataCharts}
            margin={{ top: 15, right: 20, bottom: 15, left: 10 }}
          >
            <Line
              name="% использования cpu"
              type="monotone"
              dataKey="cpu"
              stroke="#0324ff"
              strokeWidth={3}
              r={1}
            />
            <Line
              name="% доступной памяти"
              type="monotone"
              dataKey="mem"
              stroke="#ffb303"
              strokeWidth={3}
              r={1}
            />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis width={80} />
            <Tooltip />

            <Legend verticalAlign="top" height={36} />
          </LineChart>
          <LineChart
            width={widthCharts}
            height={heightCharts}
            data={dataCharts}
            margin={{ top: 15, right: 20, bottom: 15, left: 10 }}
          >
            <Line
              name="% использования cpu"
              type="monotone"
              dataKey="swap"
              stroke="#009a0d"
              strokeWidth={3}
              r={1}
            />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis width={80} />
            <Tooltip labelStyle={{ width: "500px" }} />
            <Legend verticalAlign="top" height={36} />
          </LineChart>

          <p className="charts__label">Сеть</p>
          <AreaChart
            width={widthCharts}
            height={heightCharts * 2}
            data={dataCharts}
            margin={{ top: 15, right: 20, bottom: 15, left: 10 }}
          >
            <Area
              name="Получено по сети байт"
              type="monotone"
              dataKey="res"
              stroke="#8884d8"
              fill="#8884d8"
              strokeWidth={2}
            />
            <Area
              name="Отправлено но сети байт"
              type="monotone"
              dataKey="send"
              stroke="#b00153"
              fill="#b00153"
              strokeWidth={2}
            />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis width={80} />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
          </AreaChart>

          <p className="charts__label">Диск</p>
          <AreaChart
            width={widthCharts}
            height={heightCharts * 2}
            data={dataCharts}
            margin={{ top: 15, right: 20, bottom: 15, left: 10 }}
          >
            <Area
              name="Прочитано на диск байт"
              type="monotone"
              dataKey="cpu"
              stroke="#6a01b0"
              fill="#6a01b0"
              strokeWidth={2}
            />
            <Area
              name="Записано на диск байт"
              type="monotone"
              dataKey="mem"
              stroke="#e13ffeb9"
              fill="#e13ffeb9"
              strokeWidth={2}
            />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis width={80} />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
          </AreaChart>
        </div>
      )}
    </>
  );
};

export default Chart;
