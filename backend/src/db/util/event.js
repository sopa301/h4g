// Functions
function makeNewEvent(eventName, eventDate, eventDesc, eventImg, prompts) {
  return {
    eventName: eventName,
    eventDate: eventDate,
    eventDesc: eventDesc,
    eventImg: eventImg,
    prompts: prompts,
    respondees: [],
    qr: null,
    attendances: [],
  };
}

module.exports = { makeNewEvent };
