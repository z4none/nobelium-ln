export default function formatDate (date) {
  const d = new Date(date)
  return d.toISOString().substring(0, 10)
}
