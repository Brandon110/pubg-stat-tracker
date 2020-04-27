var fetch = require('node-fetch');

String.prototype.format = function() {
    var content = this;
    
    for(var i = 0; i < arguments.length; i++) {
        var replacement = '{' + i + '}';
        content = content.replace(replacement, arguments[i]);
    }

    return content;
}

/**
 * Handles response from api
 * 
 * Returns a Promise
 */
var handleResponse = (url, headers) => {
    // Wrap response in a promise to access later
    var response = new Promise(async function (resolve, reject) {

        try {
            var response = await fetch(url, {
                headers: headers
            });

            if (!response.ok) {
                reject(response.statusText);
            }

            var data = await response.json();

            resolve(data);

        } catch (error) {
            reject(error);
        }
    });

    // Return promise
    return response;
}

/**
 * PUBG API Constructor
 *
 */
var self;
function PubgApi(apiKey) {

    self = this;
    this.base_url = 'https://api.pubg.com/shards/';
    this.headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    this.endpoints = {
        player: this.base_url + '{0}/players?filter[playerNames]={1}',
        lifetimeStats: this.base_url + '{0}/players/{1}/seasons/lifetime',
        match: this.base_url + '{0}/matches/{1}'
    }
}

PubgApi.prototype.getPlayer = function (platform, playerName) {
    var url = self.endpoints.player.format(platform, playerName);
  
    return handleResponse(url, self.headers);
}

PubgApi.prototype.playerLifetimeStats = function(platform, playerId) {
    var url = self.endpoints.lifetimeStats.format(platform, playerId);

    return handleResponse(url, self.headers);
}

PubgApi.prototype.getMatch = function(platform, matchId) {
    var url = self.endpoints.match.format(platform, matchId);

    return handleResponse(url, self.headers);
}

module.exports = PubgApi;