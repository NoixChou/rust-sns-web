import format from 'date-fns/format'
import ja from 'date-fns/locale/ja'

export default ({ app }, inject) => {
    inject('format_date', (date = new Date(), format_str = 'yyyy/MM/dd') => {
        return format(new Date(date), format_str, { locale: ja })
    })
}
