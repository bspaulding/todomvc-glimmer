export default function pluralize([n, singular, plural]) {
  return n === 1 ? singular : plural;
}
