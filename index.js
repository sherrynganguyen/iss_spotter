const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     // console.log("It didn't work!" , error);
//     return;
//   }
//   return ip;
//   // console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP("162.245.144.188", (error, coords) => {
//   if (error) {
//     // console.log("Wrong IP" , error);
//     return;
//   }
//   return coords;
//   // console.log('Latitude and Longitude' , coords);
// });


// fetchISSFlyOverTimes({ latitude: '49.26200', longitude: '-123.13000' }, (error, time) => {
//   if (error) {
//     // console.log("Wrong" , error);
//     return;
//   }
//   // return time;
//   console.log('Passing time and duration\n' , time);
// });

const printISSTimes = function(time) {
  for (let i = 0; i < time.length; i++) {
    let duration = time[i].duration;
    let date = new Date(0);
    date.setUTCSeconds(time[i].risetime);
    console.log(`Next pass at ${date} for ${duration} seconds!`);
  }
};
nextISSTimesForMyLocation((error, time) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printISSTimes(time);
});


