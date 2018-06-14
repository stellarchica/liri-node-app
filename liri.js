require("dotenv").config();

var keys = require("./keys.js")
console.log("These are keys",keys)

var request = require("request");
var twitter = require("twitter");
// v specific
var spotifyAPI = require("node-spotify-api");
var client = new twitter(keys.twitterKeys);
var fs = require("fs");

// user type
// do what it says not working completely?
console.log("Type my-tweets , spotify-this-song , movie-this , or do-what-it-says to get started!");

// argument array
var userCommand = process.argv[2];
var commandTwo = process.argv[3];

// allows longer searches (multiple words)
    for(i=4; i<process.argv.length; i++){
        commandTwo += "+" + process.argv[i];
    }

// switches case
// allows user to continue
function userSwitch(){
    switch(userCommand){
        
        case 'my-tweets':
        fetchTweets();
        break;

        case 'spotify-this-song':
        mySpotify();
        break;

        case 'movie-this':
        myMovie();
        break;

        case 'do-what-it-says':
        followDirections();
        break;
    }
};

// TWITTER
function fetchTweets(){
    // console.log("Please hold – fetching tweets now");

    // referenced in key.js
    var client = new twitter({
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token_key: process.env.ACCESS_TOKEN_KEY,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
    });

    // establishes twitter function parameters
    // pulls 20 latest tweets from account
    var parameters = {
        screen_name: "smartinezcodes",
        count: 20
    };

    // determines how info/tweets will be displayed
    client.get("statuses/user_timeline",parameters, function(error, tweets,response){
        if (!error) {
            for (i=0; i<tweets.length; i++) {
                var returnTweets = ("Number: " + (i+1) + "\n" + tweets[i].created_at + "\n" + tweets[i].text + "\n");
                console.log(returnTweets);
                console.log("-------------------------");
            }
        };
    });
};

// SPOTIFY
function mySpotify(){
    // console.log("Look at all these tunes!");

    // referenced in keys.js
    var spotify = new spotifyAPI ({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    })

    // default track
    var searchTrack;
    if(commandTwo === undefined){
        searchTrack = "I Want it That Way"
    }else{
        searchTrack = commandTwo;
    }
    // user search

    // !!! these diff, technical about naming due to API !!!
    spotify.search({type:"track", query:searchTrack}, function(err,data){
        if(err){
            console.log("Error occured: " + err);
            return;
        }else{
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
	        console.log("Song: " + data.tracks.items[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            // not working
	        console.log("Listen to a preview here: " + data.tracks.items[0].preview_url);
        }
    });
};

// MOVIE
function myMovie(){
    // console.log("My neck, my back, my Netflix & my snacks");

    // default movie
    var searchMovie;
    if(commandTwo === undefined){
        searchMovie = "Mr. Nobody";
    }else{
        searchMovie = commandTwo
    };
    // user movie

    // key in the right place???
    // fixed
    var url = "http://www.omdbapi.com/?apikey=trilogy&t=" + searchMovie + "&y=&plot=long&tomatoes=true&r=json";
    request(url, function(error, response, body){
        // console.log(JSON.parse(body))
        // overwhelmed before
        // functioning now
        if(!error && response.statusCode === 200){
	        console.log("Title: " + JSON.parse(body)["Title"]);
	        console.log("Year: " + JSON.parse(body)["Year"]);
            console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
	        console.log("Country: " + JSON.parse(body)["Country"]);
	        console.log("Language: " + JSON.parse(body)["Language"]);
	        console.log("Plot: " + JSON.parse(body)["Plot"]);
	        console.log("Actors: " + JSON.parse(body)["Actors"]);
        }
    });
};

// not fully working with do-what-it-says
function followDirections(){
    console.log("Reading random.txt now");
    fs.readFile("random.txt", "utf8", function(error, data) {
        if(error){
            console.log(error);
        }else{
            // split data & declaring variables
            var dataArr = data.split(",");
            userCommand = dataArr[0];
            commandTwo = dataArr[1];
            // enables multiple word searches
            for(i=2; i<dataArr.length; i++){
                commandTwo = commandTwo + "+" + dataArr[i];
            };
                userSwitch();
        };
    });
};
// essential!!
userSwitch();