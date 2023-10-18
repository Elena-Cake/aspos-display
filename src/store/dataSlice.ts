import { InfoTextsType } from './../types/types';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { MeansRecordsDayType, ObservatoryRecordsDayType } from '../types/types'
import { apiKsoes } from '../api/api'
import { succsessTexts } from '../assets/succsess'
import { errorTexts } from '../assets/errors'
import { INFO_DATA } from '../assets/constans';


const initialState = {
    observatoryDay: [] as ObservatoryRecordsDayType[],
    observatoryReportSender: [] as ObservatoryRecordsDayType[],
    meansDay: [] as MeansRecordsDayType[],
    isStatReportObservatoryUpdate: false,
    error: null as string | null,
    succsess: null as string | null,
    dateReport: null as string | null,
    infoData: null as InfoTextsType | null
}

export const getObservatoryByStatDay = createAsyncThunk(
    'data/observatoryStatDay',
    async () => {
        const response = await apiKsoes.getObservatoryByStatDay()
        return response
    }
)
export const getMeansByStatDay = createAsyncThunk(
    'data/meansStatDay',
    async () => {
        const response = await apiKsoes.getMeansByStatDay()
        return response
    }
)


export const getObservatoryByStatDaySender = createAsyncThunk(
    'data/observatoryStatDaySender',
    async () => {
        const response = await apiKsoes.getObservatoryByStatDaySender()
        return response
    }
)

// const [infoData, setInfoData] = React.useState<InfoTextsType | null>(INFO_DATA.loading)
const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        // lists
        cleanData(state) {
            state = initialState
        },
        removeDataError(state) {
            state.error = null
        },
        removeSuccsessMessageData(state) {
            state.succsess = null
        }
    },
    extraReducers: (builder) => {
        builder
            // getObservatoryByStatDay
            .addCase(getObservatoryByStatDay.pending, (state) => {
                state.infoData = INFO_DATA.loading
            })
            .addCase(getObservatoryByStatDay.fulfilled, (state, action) => {

                if (action.payload.success) {
                    state.succsess = succsessTexts.UPDATED
                    state.isStatReportObservatoryUpdate = true

                    state.infoData = null

                    // if (action.payload.records.filter(item => item.count !== 0).length === 0) {
                    //     state.infoData = INFO_DATA.notFoundData
                    // } else {

                    state.observatoryDay = action.payload.records.filter(item => item.count !== 0)
                    // state.observatoryDay = action.payload.records

                    // }
                    // state.observatoryDay = action.payload.records.filter(item => item.count !== 0)
                    // state.observatoryDay = action.payload.records
                    state.isStatReportObservatoryUpdate = true

                    const today = new Date()
                    state.dateReport = today.getFullYear() + '-' +
                        (Number(today.getMonth() + 1) < 10 ? '0' : '') + (today.getMonth() + 1) + '-' +
                        (Number(today.getDate()) < 10 ? '0' : '') + today.getDate()
                }
                if (!action.payload.success) {
                    state.isStatReportObservatoryUpdate = false
                    if (action.payload.message === 'No IP identified')
                        state.infoData = INFO_DATA.wrongToken
                }
            })
            .addCase(getObservatoryByStatDay.rejected, (state) => {
                state.error = errorTexts.network.ERROR_NETWORK
                state.infoData = INFO_DATA.networkError
            })

            // Sender
            // getObservatoryByStatDaySender
            .addCase(getObservatoryByStatDaySender.pending, (state) => {
            })
            .addCase(getObservatoryByStatDaySender.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.observatoryReportSender = action.payload.records.filter(item => item.count !== 0)
                }
            })
            .addCase(getObservatoryByStatDaySender.rejected, (state) => {
                state.error = errorTexts.network.ERROR_NETWORK
                state.infoData = INFO_DATA.networkError
            })


            // getMeansByStatDay
            .addCase(getMeansByStatDay.pending, (state) => {
            })
            .addCase(getMeansByStatDay.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.succsess = succsessTexts.UPDATED
                    state.meansDay = action.payload.records.filter(item => item.count !== 0)
                }
            })
            .addCase(getMeansByStatDay.rejected, (state) => {
                state.error = errorTexts.network.ERROR_NETWORK
                state.infoData = INFO_DATA.networkError
            })

    }
})
export const {
    cleanData, removeDataError, removeSuccsessMessageData
} = dataSlice.actions
export default dataSlice.reducer

