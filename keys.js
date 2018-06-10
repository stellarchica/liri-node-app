require("dotenv").config();

console.log('this is loaded');

exports.twitter = {
  consumer_key: process.env.CONSUMER_KEY,
  // consumer_secret: process.env.Mf70kmKAE3cqD40hgZPCW7fve6Va8l7OKwu2c8ClGDMemdELVk,
  // // includes owner ID in first part, is it necessary with the dash? is it fully registering?
  // access_token_key: process.env.1005619908296790016-4kkVzORNWwtlxVCiNgfIEUKJvUGy3F,
  // access_token_secret: process.env.NI9tbLKQuHWI9XShDnuStWABB9isCkQQpaK5yl9mDrLc4
};

// exports.spotify = {
//     // why is this not working???
//   id: process.env.63afd747951a4438bb586920ab0a8a96,
//   secret: process.env.30a64d80258f40488b1f4e5f12c0ff56
// };