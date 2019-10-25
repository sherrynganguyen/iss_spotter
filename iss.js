const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      body = JSON.parse(body);
      let ip = body.ip;
      callback(error, ip);
      // callback(ip, callback);
    }
  });
};
const fetchCoordsByIP = function(ip, callback) {
  // iptemp = "162.245.144.188";
  let coords = {latitude: "",longitude:""};
  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      body = JSON.parse(body);
      coords.latitude = body.data.latitude;
      coords.longitude = body.data.longitude;
      // console.log(latLng);
      // console.log(coords);
      callback(error, coords);
      // callback(coords, callback);
    }
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  // coords = { latitude: '49.27670', longitude: '-123.13000' };
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      body = JSON.parse(body);
      let time = body.response;
      callback(error, time);
    }
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
    }
    fetchCoordsByIP(ip, (error,coords) => {
      if (error) {
        callback(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, time) => {
        if (error) {
          callback(error, null);
        }
        callback(null, time);
      });
    });
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};