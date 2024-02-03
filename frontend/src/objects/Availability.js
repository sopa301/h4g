import { DateTime, Interval } from "luxon";
import { AvailabilityJSONable } from "./AvailabilityJSONable";

export class Availability {
  // availabilityId is a number
  // interval is an Interval object from the Luxon library
  constructor(availabilityId, interval) {
    this.availabilityId = availabilityId;
    this.interval = interval;
  }
  getInterval() {
    return this.interval;
  }
  getAvailabilityId() {
    return this.availabilityId;
  }
  toString() {
    return this.interval.toLocaleString(DateTime.DATETIME_MED);
  }

  toJSONable() {
    return new AvailabilityJSONable(
      this.availabilityId,
      this.interval.toISO({ suppressSeconds: true })
    );
  }
  static fromJSONable(object) {
    return new Availability(object.availabilityId, Interval.fromISO(object.interval));
  }
}
