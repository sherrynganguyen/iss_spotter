const { fetchMyIP , fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss_promised');

fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(nextISSTimesForMyLocation)
  .then();

const printISSTimes = function(time) {
  for (let i = 0; i < time.length; i++) {
    let duration = time[i].duration;
    let date = new Date(0);
    date.setUTCSeconds(time[i].risetime);
    console.log(`Next pass at ${date} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((time) => {
    printISSTimes(time);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
