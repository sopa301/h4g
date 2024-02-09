// Functions
function makeNewEvent(eventName, eventDate, eventDesc, eventImg, prompts) {
  return {
    eventName: eventName,
    eventDate: eventDate,
    eventDesc: eventDesc,
    eventImg: eventImg,
    prompts: prompts,
    attendees: [],
    qr: null,
  };
}

function replaceIdWithEventId(event) {
  eventCopy = { ...event.toObject() };
  eventCopy.eventId = eventCopy._id;
  delete eventCopy._id;
  return eventCopy;
}

function eventHasPerson(event, userId) {
  return event.attendees.some((attendee) => attendee.userId === userId);
}

function addPersonToEvent(event, userId) {
  event.attendees.push({ userId: userId, responses: [], attendance: false });
}

function removePersonFromEvent(event, userId) {
  event.attendees = event.attendees.filter(
    (attendee) => attendee.userId !== userId
  );
}

module.exports = {
  makeNewEvent,
  replaceIdWithEventId,
  eventHasPerson,
  addPersonToEvent,
  removePersonFromEvent,
};
