import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(LocalizedFormat)

export const format = (timeStamp: string | number | Date) => {
  return dayjs(timeStamp).format('ll')
}
