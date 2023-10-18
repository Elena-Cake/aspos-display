// import { MeansRecordsDayType, MeansRecordsType, ObservatoryRecordsDayType, ObservatoryRecordsType, TypesRecordsType } from "./types/types"
import axios from "axios";
import {
  MeansRecordsDayType,
  MeansRecordsType,
  ObservatoryRecordsDayType,
  ObservatoryRecordsType,
  TypesRecordsType,
} from "../types/types";

const instance = axios.create({
  baseURL: "https://ares.ksoes.ru",
  withCredentials: true,
});
const BASE_API = "view.php?act=upload_files&name=info";
// const BASE_API = 'ares.php?act=upload_files&name=info'

type DataResType<R> = {
  debug: string;
  error: string;
  message: string;
  records: R[];
  success: boolean;
};

export const apiVocabulary = {
  // https://ares.ksoes.ru/api.php?act=upload_files&name=info&get=types
  getTypes() {
    return instance
      .get<DataResType<TypesRecordsType>>(`${BASE_API}&get=types`)
      .then((res) => {
        return res.data;
      });
  },
  // https://ares.ksoes.ru/api.php?act=upload_files&name=info&get=observatory
  getObservatory() {
    return instance
      .get<DataResType<ObservatoryRecordsType>>(`${BASE_API}&get=observatory`)
      .then((res) => {
        return res.data;
      });
  },
  // https://ares.ksoes.ru/api.php?act=upload_files&name=info&get=means
  getMeans() {
    return instance
      .get<DataResType<MeansRecordsType>>(`${BASE_API}&get=means`)
      .then((res) => {
        return res.data;
      });
  },
};

const BASE_API_RESIPIENT = "/view.php?name=group&act=upload_files&get=stat_day";
const BASE_API_SENDER = "/view.php?name=group&act=sender&get=stat_day";

export const apiKsoes = {
  // getToken
  getToken() {
    return instance
      .get(
        `/_authorization.php?username=logger&password=loggerAnc1&func=getToken`
      )
      .then((res) => {
        return res.data;
      });
  },

  // resipient
  // https://ares.ksoes.ru/api.php?act=upload_files&name=group&get=stat_day&group=observatory
  getObservatoryByStatDay() {
    return instance
      .get<DataResType<ObservatoryRecordsDayType>>(
        `${BASE_API_RESIPIENT}&group=observatory`
      )
      .then((res) => {
        return res.data;
      });
  },

  // https://ares.ksoes.ru/api.php?act=upload_files&name=group&get=stat_day&group=mean
  getMeansByStatDay() {
    return instance
      .get<DataResType<MeansRecordsDayType>>(`${BASE_API_RESIPIENT}&group=mean`)
      .then((res) => {
        return res.data;
      });
  },
  // sender

  // https://ares.ksoes.ru/api.php?act=sender&name=group&get=stat_day&
  getObservatoryByStatDaySender() {
    return instance
      .get<DataResType<ObservatoryRecordsDayType>>(`${BASE_API_SENDER}`)
      .then((res) => {
        return res.data;
      });
  },
};

// omcc
const instanceOMCC = axios.create({
  baseURL: "https://api_o.ksoes.ru/api/view/",
  withCredentials: true,
});

const url = "https://api_o.ksoes.ru/api/view/";

export const apiOMCC = {
  getFuncStateData() {
    return instanceOMCC.get(`state`).then((res) => {
      return res.data;
    });
  },
  getInfoProcess() {
    return instanceOMCC.get(`orbmeas`).then((res) => {
      return res.data;
    });
  },
  getCoputing() {
    return instanceOMCC.get(`server`).then((res) => {
      return res.data;
    });
  },
};
