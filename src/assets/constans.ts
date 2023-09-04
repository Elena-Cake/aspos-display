export const IS_PAGES_DEPLOY: boolean = false
// export const IS_PAGES_DEPLOY: boolean = true

// export const TIME_UPDATE_REPORT_TABLES = 5000 * 60
// export const TIME_UPDATE_REPORT_CHARTS = 5000 * 60

export const TIME_UPDATE_REPORT_TABLES = 1000 * 60
export const TIME_UPDATE_REPORT_CHARTS = 5000

export const INFO_DATA = {
    loading: {
        text: '...Идет загрузка, подождите...',
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