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