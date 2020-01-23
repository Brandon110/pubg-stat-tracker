import { combineReducers } from 'redux';
import { HANDLE_CLEAR_SEARCH } from '../constants/clear-search';

import { handlePlayerData } from './handle-player-data';
import { handleLifetimeStatsData } from './handle-lifetime-stats-data';
import { handleMatchesData } from './handle-matches-data';

const rootReducer = (state, action) => {
    if (action.type === HANDLE_CLEAR_SEARCH) {

        state = undefined;
    }

    return reducer(state, action);
}

const reducer = combineReducers({
    playerInfo: handlePlayerData,
    lifetimeStats: handleLifetimeStatsData,
    matches: handleMatchesData
});

export default rootReducer;