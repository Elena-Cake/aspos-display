import { ResType } from "../types/types"

export const changeDataForFuncState = (data: ResType): ResType => {
    const newData = {
        columns: [
            "№",
            "ОЭС",
            "Место",
            "Модель",
            "Код",
            // "Дата", //new column
            "3акат",
            "Рассвет",
            "Обновлено",
            "Состояние"
        ],
        table: data.table.map(arr => {
            return [
                arr[0], arr[1], arr[2], arr[3], arr[4],
                // arr[5].substring(0, 10), //get date
                arr[5].substring(10),
                arr[6].substring(10),
                arr[7]?.replace('T', ' '),
                arr[8]
            ]
        })
    }

    return newData
}