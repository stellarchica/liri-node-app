// tom's recommendation
// require("dotenv").config();

// from instructions (example)
// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);


console.log('this is loaded');

exports.twitter = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
};

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};