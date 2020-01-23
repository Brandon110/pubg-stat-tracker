var fetch = require('node-fetch');

/**
 * Handles response from api
 * 
 * Returns a Promise
 */
var handleResponse = (endpoint, headers) => {
    // Wrap response in a promise to access later
    var response = new Promise(async function (resolve, reject) {

        try {
            var response = await fetch(`https://api.pubg.com/${endpoint}`, {
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
 * PUBG api function
 * 
 * Wrapper for the PUBG API
 */
function PubgApi(apiKey) {

    // PUBG api required info
    this.headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    // Endpoint to query
    var endpoint = '';

    /**
     * Methods
     * 
     * Useed to query the api endpoints
     */

    this.getPlayer = function (platform, playerName) {
        endpoint = `shards/${platform}/players?filter[playerNames]=${playerName}`;
 
        return handleResponse(endpoint, this.headers);
    }

    this.playerLifetimeStats = function (platform, playerId) {
        endpoint = `shards/${platform}/players/${playerId}/seasons/lifetime`;
        
        return handleResponse(endpoint, this.headers);
    }

    this.getMatch = (platform, matchId) => {
        endpoint = `shards/${platform}/matches/${matchId}`;

        return handleResponse(endpoint, this.headers);
    }
}

module.exports = PubgApi;