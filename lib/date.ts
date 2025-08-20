import { format } from 'date-fns'
import { th } from 'date-fns/locale'

export function formatDate(date?: string | null) {
  if (!date) return ''
  return format(new Date(date), 'd MMM yyyy', { locale: th })
}
