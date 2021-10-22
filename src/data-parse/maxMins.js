class MaxMins {
  constructor() {
    this.day = [];
    this.month = [];
    this.year = [];
    this.movie = [];
  }

  iniMaxMins() {
    this.day['maxMoney'] = -10000;
    this.day['maxPeople'] = -10000;
    this.day['maxNumMovies'] = -10000;
    this.day['minMoney'] = 999999999999999;
    this.day['minPeople'] = 999999999999999;
    this.day['minNumMovies'] = 100000;

    this.month['maxMoney'] = -10000;
    this.month['maxPeople'] = -10000;
    this.month['maxNumMovies'] = -10000;
    this.month['minMoney'] = 999999999999999;
    this.month['minPeople'] = 999999999999999;
    this.month['minNumMovies'] = 100000;

    this.year['maxMoney'] = -10000;
    this.year['maxPeople'] = -10000;
    this.year['maxNumMovies'] = -10000;
    this.year['minMoney'] = 999999999999999;
    this.year['minPeople'] = 999999999999999;
    this.year['minNumMovies'] = 100000;

    this.movie['maxMoney'] = -10000;
    this.movie['maxPeople'] = -10000;
    this.movie['maxNumMovies'] = -10000;
    this.movie['minMoney'] = 999999999999999;
    this.movie['minPeople'] = 999999999999999;
    this.movie['minNumMovies'] = 100000;
  }

  update(zone, ref) {
    if(ref === "movie") {
      this.check(zone, this.movie);
    } else if(ref.split("-").length == 1) {
      this.check(zone, this.year);
    } else if(ref.split("-").length == 2) {
      this.check(zone, this.month);
    } else if(ref.split("-").length == 3) {
      this.check(zone, this.day);
    }
  }

  check(z, array) {
    //dough
    array['maxMoney'] = ((array['maxMoney'] < Math.max(z.revenue, z.budget)) ? Math.max(z.revenue, z.budget) : array['maxMoney']);
    array['minMoney'] = ((array['minMoney'] > Math.min(z.revenue, z.budget)) ? Math.min(z.revenue, z.budget) : array['minMoney']);
    //legs
    array['maxPeople'] = ((array['maxPeople'] < z.numCast + z.numCrew) ? z.numCast + z.numCrew : array['maxPeople']);
    array['minPeople'] = ((array['minPeople'] > z.numCast + z.numCrew) ? z.numCast + z.numCrew: array['minPeople']);
    //num movies
    array['maxNumMovies'] = ((array['maxNumMovies'] < z.numMovies) ? z.numMovies : array['maxNumMovies']);
    array['minNumMovies'] = ((array['minNumMovies'] > z.numMovies) ? z.numMovies: array['minNumMovies']);
  }
}

function getMappingsArray() {
  if(start.charAt(0) === "m") {
    return mappings.movie;
  } else if(start.split("-").length == 1) {
    return mappings.year;
  } else if(start.split("-").length == 2) {
    return mappings.month;
  } else if(start.split("-").length == 3) {
    return mappings.day;
  }
}
