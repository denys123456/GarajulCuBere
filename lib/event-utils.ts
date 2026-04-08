type EventStatusInput = {
  date: Date | string;
  startHour: string;
};

export function getEventStartDateTime(event: EventStatusInput) {
  const sourceDate = new Date(event.date);
  const [hourPart = "0", minutePart = "0"] = event.startHour.split(":");
  const hours = Number.parseInt(hourPart, 10);
  const minutes = Number.parseInt(minutePart, 10);

  const start = new Date(sourceDate);
  start.setHours(Number.isNaN(hours) ? 0 : hours, Number.isNaN(minutes) ? 0 : minutes, 0, 0);

  return start;
}

export function isPastEvent(event: EventStatusInput) {
  return getEventStartDateTime(event).getTime() < Date.now();
}
