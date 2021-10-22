var movies = [];
let mCurrentIndex = 0;
let firstDate = "5000-50-50";
let lastDate = "0000-00-00";


function parseMovie(movieData) {
  var peeps = new Map();
  peepIndex.forEach((key, i) => {
    peeps.set(key, movieData[key]);
  });

  var newMovie = new Movie(
    movieData['id'],
    movieData['title'],
    movieData['release'],
    movieData['budget'],
    movieData['revenue'],
    peeps
  );

  if(checkIntegrity(newMovie)) { //Conferir se não há campos vazios
    firstDate = ((compareDates(newMovie.release, firstDate) == 2) ? newMovie.release : firstDate);
    lastDate = ((compareDates(newMovie.release, lastDate) == 1) ? newMovie.release : lastDate);

    //fillDates(newMovie, mCurrentIndex);
    concorrentZoneFilling(newMovie, newMovie.release.split("-")[0], mCurrentIndex, yearZones);
    concorrentZoneFilling(newMovie, newMovie.release.split("-")[0]+"-"+newMovie.release.split("-")[1], mCurrentIndex, monthZones);
    concorrentZoneFilling(newMovie, newMovie.release, mCurrentIndex, dayZones);
    fillMovieZones(newMovie, mCurrentIndex, movieZones);

    movies.push(newMovie);
    mCurrentIndex++;
  }
}

function checkIntegrity(obj) {
  var k = Object.keys(obj);
  for(let i = 0; i < k.length; i++) {
    let key = k[i];
    let currVal = obj[key];
    if(currVal === " " || typeof currVal === 'undefined' || currVal == key) {
      return false;
    }
  }
  return true;
}
