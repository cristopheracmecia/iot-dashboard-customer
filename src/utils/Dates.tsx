import moment from "moment";

export function formatDate(rangeStart: Date, rangeEnd: Date, date: Date) {
  if (moment(date).isBetween(rangeStart, rangeEnd, null, "[]")) {
    const diff = moment(rangeEnd).diff(moment(rangeStart), "days");
    if (diff === 0) {
      return moment(date).format("HH:mm:ss");
    } else if (diff < 7 && moment(rangeStart).isSame(rangeEnd, "week")) {
      return moment(date).format("dddd HH:mm:ss");
    } else {
      return moment(date).format("DD/MM HH:mm");
    }
  } else {
    return null;
  }
}

export function formatDatesInArray(
  rangeStart: Date,
  rangeEnd: Date,
  array: Array<any>,
) {
  return array.map((obj) => {
    const newObj = { ...obj };
    for (const [key, value] of Object.entries(newObj) as Array<[string, any]>) {
      if (moment(value, moment.ISO_8601, true).isValid()) {
        newObj[key] = formatDate(rangeStart, rangeEnd, value);
      }
    }
    return newObj;
  });
}
