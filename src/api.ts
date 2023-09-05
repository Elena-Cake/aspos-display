// import { MeansRecordsDayType, MeansRecordsType, ObservatoryRecordsDayType, ObservatoryRecordsType, TypesRecordsType } from "./types/types"
import axios from "axios"
const getToken = () => `token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTEsImlwIjoiMTcyLjE5LjEwMi4xNjYifQ.5vTjoErzoNquQF9FQGDP2DwR4fNgl5zrMd2RvMo80Xk`

// KSOES
// AUTH
export type LoginFormValues = { username: string, password: string }

// API
export type TypesRecordsType = {
    id: number, name: string
}


// Observatory
export type ObservatoryRecordsType = {
    [id: string]: string
}
export type ObservatoryRecordsAppType = {
    code: string
    name: string
}

export type ObservatoryRecordsDayType = {
    count: number,
    id_type: number,
    id_observatory: number
}


// Means
export type MeansRecordsType = {
    [id: string]: { [id: string]: string }
}
export type MeansRecordsAppType = {
    id_observatory: string,
    id_mean: string,
    name_mean: string
}
export type MeansRecordsDayType = {
    count: number,
    id_type: number,
    id_mean: number
}


export type TreeTableType = {
    key: string | number,
    id?: number | string,
    id_mean?: number | string,
    name: string | undefined,
    type: string | undefined,
    count: number,
    children?: TreeTableType[],
    isSender: boolean
}

export type TreeTableTypeMessages = {
    key: string | number,
    id: number | string,
    name: string | undefined,
    typeResiv: string | undefined,
    countResiv: number | undefined,
    typeSender: string | undefined,
    countSender: number | undefined,
}


export type dateFormValues = {
    date_start: string,
    date_end?: string,
}





const instance = axios.create({
    baseURL: 'https://ares.ksoes.ru/',
    withCredentials: true,
})
const BASE_API = 'api.php?act=upload_files&name=info'

type DataResType<R> = {
    debug: string
    error: string
    message: string
    records: R[]
    success: boolean
}

export const apiVocabulary = {

    // https://ares.ksoes.ru/api.php?act=upload_files&name=info&get=types
    getTypes() {
        return instance.get<DataResType<TypesRecordsType>>(`${BASE_API}&get=types&${getToken()}`)
            .then(res => {
                return res.data
            })
    },
    // https://ares.ksoes.ru/api.php?act=upload_files&name=info&get=observatory
    getObservatory() {
        return instance.get<DataResType<ObservatoryRecordsType>>(`${BASE_API}&get=observatory&${getToken()}`)
            .then(res => {
                return res.data
            })
    },
    // https://ares.ksoes.ru/api.php?act=upload_files&name=info&get=means
    getMeans() {
        return instance.get<DataResType<MeansRecordsType>>(`${BASE_API}&get=means&${getToken()}`)
            .then(res => {
                return res.data
            })
    },

}


const BASE_API_RESIPIENT = 'api.php?name=group&act=upload_files&get=stat_day'
const BASE_API_SENDER = 'api.php?name=group&act=sender&get=stat_day'


export const apiKsoes = {
    // resipient
    // https://ares.ksoes.ru/api.php?act=upload_files&name=group&get=stat_day&group=observatory
    getObservatoryByStatDay() {
        return instance.get<DataResType<ObservatoryRecordsDayType>>(`${BASE_API_RESIPIENT}&group=observatory&${getToken()}`)
            .then(res => {
                return res.data
            })
    },

    // https://ares.ksoes.ru/api.php?act=upload_files&name=group&get=stat_day&group=mean
    getMeansByStatDay() {
        return instance.get<DataResType<MeansRecordsDayType>>(`${BASE_API_RESIPIENT}&group=mean&${getToken()}`)
            .then(res => {
                return res.data
            })
    },
    // sender

    // https://ares.ksoes.ru/api.php?act=sender&name=group&get=stat_day&
    getObservatoryByStatDaySender() {
        return instance.get<DataResType<ObservatoryRecordsDayType>>(`${BASE_API_SENDER}&${getToken()}`)
            .then(res => {
                return res.data
            })
    },
}
