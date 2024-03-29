import { INFO_DATA } from "../assets/constans"

export type ResType = {
    columns: string[]
    table: any[][]
}

export type chartsType = {
    name: string
    cpu: number
    mem: number
    swap: number
    res: number
    send: number
    read: number
    write: number
}

export type InfoTextsType = typeof INFO_DATA.loading

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

