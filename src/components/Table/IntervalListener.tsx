import React from "react";
import Table from "./Table";
import { INFO_DATA, TIME_UPDATE_REPORT_TABLES } from "../../assets/constans";
import { InfoTextsType, ResType } from "../../types/types";
import InfoText from "../InfoText";
import { changeDataForFuncState } from "../../assets/helperFunc";
import { apiOMCC } from "../../api/api";

type Props = {
  typeTable?: string;
};

let intervalId: NodeJS.Timeout;

export default function IntervalListener({ typeTable = "" }: Props) {
  const [data, setData] = React.useState<ResType | null>(null);

  const [infoTexts, setInfoTexts] = React.useState<string[]>([]);
  const [infoData, setInfoData] = React.useState<InfoTextsType | null>(
    INFO_DATA.loading
  );
  const isTypeState = typeTable === "state";

  const fetchData = async () => {
    try {
      setInfoData(INFO_DATA.loading);

      if (isTypeState) {
        const data = await apiOMCC.getFuncStateData();
        setData(changeDataForFuncState(data));
        setInfoTexts([`Статистика на: ${data.table[0][5].substring(0, 10)}`]);
      } else {
        const data = await apiOMCC.getInfoProcess();
        setData(data);
      }
      // if (isTypeState) {
      //     const data = await apiOMCC.getFuncStateData
      //     setData(changeDataForFuncState(data))
      //     setInfoTexts([`Статистика на: ${data.table[0][5].substring(0, 10)}`])
      // } else {
      //     const data = await apiOMCC.getInfoProcess
      //     setData(data)
      // }
    } catch (err) {
      // @ts-ignore
      if (err.code === "ERR_NETWORK") {
        setInfoData(INFO_DATA.networkError);
        console.log("reload please");
        return;
      }

      // @ts-ignore
      if (err.code === "ERR_FAILED") {
        console.log("reload please///");
        return;
      }
      // @ts-ignore
      console.log(err.code);
    }
  };

  // setInterval and clean it
  function startSendingRequests() {
    intervalId = setInterval(() => {
      fetchData();
    }, TIME_UPDATE_REPORT_TABLES);
  }
  function stopSendingRequests() {
    console.log("stop requect sending state");
    clearInterval(intervalId);
  }

  React.useEffect(() => {
    fetchData();
    startSendingRequests();
  }, []);
  React.useEffect(() => () => stopSendingRequests(), []);

  return (
    <>
      {!data && <InfoText infoData={infoData} />}
      <Table data={data} infoTexts={infoTexts} isTypeState={isTypeState} />
    </>
  );
}
