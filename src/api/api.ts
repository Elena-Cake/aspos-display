// import { MeansRecordsDayType, MeansRecordsType, ObservatoryRecordsDayType, ObservatoryRecordsType, TypesRecordsType } from "./types/types"
import axios from "axios"
import { MeansRecordsDayType, MeansRecordsType, ObservatoryRecordsDayType, ObservatoryRecordsType, TypesRecordsType } from "../types/types"
const getToken = () => `token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTEsImlwIjoiNzkuMTM5LjEzOS4xNjEifQ.MByVXD9LpLrOJ3YqYE7Z0_d-nZqKzBkyhPnOCmvhfSI`



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


// omcc
const BASE_API_OMCC = `https://api.omcc.ru/api/view/`

export const apiOMCC = {
    // https://api.omcc.ru/api/view/state
    getFuncStateData() {
        return instance.get(`${BASE_API_OMCC}state`)
            .then(res => {
                return res.data
            })
    },
    // https://api.omcc.ru/api/view/orbmeas
    getInfoProcess() {
        return instance.get(`${BASE_API_OMCC}orbmeas`)
            .then(res => {
                return res.data
            })
    },
    // https://api.omcc.ru/api/view/server
    getCoputing() {
        return instance.get(`${BASE_API_OMCC}server`)
            .then(res => {
                return res.data
            })
    }
}
