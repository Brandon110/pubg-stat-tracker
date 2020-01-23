var { getPlayer, playerLifetimeStats, getMatches } = require('../controllors/pubg-api');

module.exports = function (router) {
    router.get('/pubg/player/:platform/:playerName', getPlayer);

    router.get('/pubg/player/lifetimestats/:platform/:playerId', playerLifetimeStats);
 
    router.get('/pubg/matches/:platform', getMatches);
}