var PubgApi = require('../libs/pubg-api'),
    pubgApiInstance = new PubgApi(process.env.PUBG_API_KEY);

/**
 * All api endpoints use the same error responses so we 
 * created a function to deal with the errors.
 */
var handleErrors = (res, error) => {
    if ('Not Found' == error) {
        return res.status(404).json({ error: 'Not Found' });
    }
    if ('Unsupported Media Type' == error) {
        return res.status(400).json({ error: 'Invalid Request' });
    }
    if ('Too Many Requests' == error) {
        return res.status(429).json({ error: 'To many requests, you are only allowed a max of 10 requests per minute, please wait 1-2 minutes before trying again.' });
    }
    if ('Bad Request' == error) {
        return res.status(400).json({ error: 'Bad request, please try that again.' });
    }

    res.status(500).json({ error: 'Internal Server Error.' });
}

var getPlayer = (req, res) => {
    var { platform, playerName } = req.params;

    pubgApiInstance.getPlayer(platform, playerName).then(player => {
        res.status(200).json(player);
    }).catch(error => {
        handleErrors(res, error);
    });
}

var playerLifetimeStats = (req, res) => {
    var { platform, playerId } = req.params;

    pubgApiInstance.playerLifetimeStats(platform, playerId).then(stats => {
        res.status(200).json(stats);
    }).catch(error => {
        handleErrors(res, error);
    });
}

var getMatches = (req, res) => {
    var { matchIds } = req.query,
        { platform } = req.params,
        ids = matchIds.split(','); // Convert string of ids to array

    /**
     * Loop through ids and return a promise
     * Use Promise.all to handle all promises returned
     */
    Promise.all(
        // Splice the first 20 match ids off ids array
        // We do this to only allow so many requests at a time for a smoother performance.
        // Catch all errors to prevent interrupting resolving promises remaining.
        ids.splice(0, 20).map(id => {
            return pubgApiInstance.getMatch(platform, id).catch(error => { return { error: 'No data for this match' }});
        })
    ).then(matches => {
        res.status(200).json(matches);
    });

}

module.exports = { getPlayer, playerLifetimeStats, getMatches };
