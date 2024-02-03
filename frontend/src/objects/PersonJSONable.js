export class PersonJSONable {
  // personId is a number
  // personName is a string
  // availabilities is an array of AvailabilityJSONable objects
  // role is a string(viewer/ editor)
  constructor(personId, personName, availabilities, role) {
    this.personId = personId;
    this.personName = personName;
    this.availabilities = availabilities;
    this.role = role;
  }

  toString() {
    var out = "JSON Name: " + this.personName + ", " + this.role + "\n";
    out += "Availabilities: ";
    for (var avail of this.availabilities) {
      out += avail.toString() + "\n";
    }
    return out;
  }
}
