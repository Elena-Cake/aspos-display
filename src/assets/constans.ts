export const IS_PAGES_DEPLOY: boolean = false
// export const IS_PAGES_DEPLOY: boolean = true

// export const TIME_UPDATE_REPORT_TABLES = 5000 * 60
// export const TIME_UPDATE_REPORT_CHARTS = 5000 * 60

export const TIME_UPDATE_REPORT_TABLES = 6000 * 10
export const TIME_UPDATE_REPORT_CHARTS = 5000

export const INFO_DATA = {
    loading: {
        text: '...Идет загрузка, подождите...',
        isError: false
    },
    notFoundData: {
        text: 'Сегодня еще  нет данных...',
        isError: false
    },
    networkError: {
        text: 'Ошибка при получении данных. Проверьте SSH сертификат, интернет соединение и попробуйте обновить страницу.',
        isError: true
    },
    notFound: {
        text: 'Такой страницы не существует.',
        isError: true
    }
}

// KSOES
export const TIME_UPDATE_REPORT = 6000 * 10 //10min

export const OBJECT_EXTEND_ROWS = {
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
    10: true,
}