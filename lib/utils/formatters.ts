import { format, parseISO } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'

const JST_TIMEZONE = 'Asia/Tokyo'

export function toJST(isoString: string): Date {
  return toZonedTime(parseISO(isoString), JST_TIMEZONE)
}

export function formatJSTDate(isoString: string): string {
  const jstDate = toJST(isoString)
  return format(jstDate, 'yyyy-MM-dd')
}

export function formatJSTDateTime(isoString: string): string {
  const jstDate = toJST(isoString)
  return format(jstDate, 'yyyy-MM-dd HH:mm')
}

export function formatJSTTime(isoString: string): string {
  const jstDate = toJST(isoString)
  return format(jstDate, 'HH:mm')
}

export function minutesToHoursMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}m`
}

export function formatWeight(kg: number): string {
  return `${kg.toFixed(1)} kg`
}

export function formatScore(score: number | null | undefined): string {
  if (score === null || score === undefined) return '-'
  return score.toString()
}
