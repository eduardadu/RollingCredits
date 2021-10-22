class Movie {
  constructor(id, title, release, budget, revenue, peoples) {
    this.id = id;
    this.title = title;
    this.release = release;
    this.budget = budget;
    this.revenue = revenue;
    this.people = peoples;
  }

  clone(otherM) {
    this.id = otherM.id;
    this.title = otherM.title;
    this.release = otherM.release;
    this.budget = otherM.budget;
    this.revenue = otherM.revenue;
    this.people = otherM.people;
  }
}

var peepIndex = [
  "numCrew",
  "numCast",
  "female",
  "male",
  "unknown",
  "Editing",
  "Art",
  "Sound",
  "Production",
  "Directing",
  "Writing",
  "Visual Effects",
  "Costume & Make-Up",
  "Crew",
  "Lighting",
  "Camera",
  "Actors"
];
