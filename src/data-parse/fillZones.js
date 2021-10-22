var dayZones = [];
var monthZones = [];
var yearZones = [];
var movieZones = [];
var mNameToIndex = [];

var mappings = new MaxMins();
mappings.iniMaxMins();

function concorrentZoneFilling(nMov, date, i, arr) {
  var zone = [];
  var indexs = [];
  if(date in arr) {
    zone = arr[date].d;
    peepIndex.forEach((key, u) => {
      zone[key] += parseInt(nMov.people.get(key));
    });
    zone['budget'] += Math.max(0,parseInt(nMov.budget));
    zone['revenue'] += Math.max(0,parseInt(nMov.revenue));
    zone['movieIndexs'] += ","+i;
    zone['numMovies']++;
    zone['titles'] += ","+nMov.title;
  } else {
    peepIndex.forEach((key, u) => {
      zone[key] = parseInt(nMov.people.get(key));
    });
    zone['budget'] = Math.max(0,parseInt(nMov.budget));
    zone['revenue'] = Math.max(0,parseInt(nMov.revenue));
    zone['movieIndexs'] = i;
    zone['numMovies'] = 1;
    zone['date'] = date;
    zone['titles'] = nMov.title;
  }
  arr[date] = new Zone(zone);
  mappings.update(zone, date);
}

function fillMovieZones(nMov, i, arr) {
  var zone = [];
  peepIndex.forEach((key, u) => {
    zone[key] = parseInt(nMov.people.get(key));
  });
  zone['budget'] = Math.max(0,parseInt(nMov.budget));
  zone['revenue'] = Math.max(0,parseInt(nMov.revenue));
  zone['movieIndexs'] = i;
  zone['numMovies'] = 1;
  zone['date'] = nMov.release;
  zone['titles'] = nMov.title;

  let year = nMov.release.split("-")[0];
  mNameToIndex[nMov.title.toLowerCase()] = i;
  arr.push(new Zone(zone));
  mappings.update(zone, "movie");
}

function iniMaxMins() {
  dayMax['budget'] = -1000000;
  dayMax['revnue'] = -1000000;
  dayMax['people'] = -1000000;
  dayMax['numMovies'] = -1000000;
  dayMin['budget'] = -1000000;
  dayMin['revnue'] = -1000000;
  dayMin['people'] = -1000000;
  dayMin['numMovies'] = -1000000;

}
