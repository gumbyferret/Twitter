/* Set Twitter search phrase */
var TWITTER_SEARCH_PHRASE = '#askthepanel';

var Twit = require('twit');

var Bot = new Twit({
	consumer_key: TWITTER_CONSUMER_KEY,
	consumer_secret: TWITTER_CONSUMER_SECRET,
	access_token: TWITTER_ACCESS_TOKEN, 
	access_token_secret: TWITTER_ACCESS_TOKEN_SECRET
});

console.log('The bot is running...');

/* BotInit() : To initiate the bot */
function BotInit() {
	function BotInitiated (error, data, response) {
		if (error) {
			console.log('Bot could not be initiated, : ' + error);
		}
		else {
  			console.log('Bot initiated');
		}
	}
	
	BotRegister();
}

/* BotRegister() : To store the matching recent tweet */
function BotRegister() {

	var query = {
		q: TWITTER_SEARCH_PHRASE,
		result_type: "recent"
	}

	Bot.get('search/tweets', query, BotGotLatestTweet);

	function BotGotLatestTweet (error, data, response) {
		if (error) {
			console.log('Bot could not find latest tweet, : ' + error);
		}
		else {
			for (var i = 0; i < data.length ; i++) {
        console.log(data[i].text);
      }
		}
	}
	
	/* Set an interval of 1 minute (in microsecondes) */
	setInterval(BotRegister, 1*60*1000);
}

/* Initiate the Bot */
BotInit();
