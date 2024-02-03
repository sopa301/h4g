import { Availability } from "./Availability";
import { PersonJSONable } from "./PersonJSONable";

export class Person {
  // personId is a string
  // personName is a string
  // availabilities is an array of Availability objects
  // role is a string (editor/viewer)
  constructor(personId, personName, availabilities, role) {
    this.personId = personId;
    this.personName = personName;
    this.availabilities = availabilities;
    this.role = role;
  }
  toString() {
    var out = "Name: " + this.personName + ", " + this.role + "\n";
    out += "Availabilities: ";
    for (var avail of this.availabilities) {
      out += avail.toString() + "\n";
    }
    return out;
  }
  toJSONable() {
    const outAvails = [];
    for (let i = 0; i < this.availabilities.length; i++) {
      outAvails[i] = this.availabilities[i].toJSONable();
    }
    return new PersonJSONable(this.personId, this.personName, outAvails, this.role);
  }
  static fromJSONable(object) {
    const outAvails = [];
    for (let i = 0; i < object.availabilities.length; i++) {
      outAvails[i] = Availability.fromJSONable(object.availabilities[i]);
    }
    return new Person(object.personId, object.personName, outAvails, object.role);
  }
}
