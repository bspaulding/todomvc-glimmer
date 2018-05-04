export default function classnames(params) {
  let classes = [];
  for (let x = 0; x < params.length - 1; x += 2) {
    if (params[x + 1]) {
      classes.push(params[x]);
    }
  }
  return classes.join(' ');
}
