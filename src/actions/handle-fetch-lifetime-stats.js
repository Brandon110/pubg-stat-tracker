import {
    FETCH_LIFETIME_STATS_SUCCESS,
    FETCH_LIFETIME_STATS_ERROR,
    LIFETIME_STATS_IS_LOADING
} from '../constants/fetch-lifetime-stats';
import { get } from 'axios';

export const handleFetchLifetimeStats = (platform, playerId) => {
    return async (dispatch) => {
        dispatch(handleLifetimeStatsLoading(true));

        try {
            const response = await get(`/pubg/player/lifetimestats/${platform}/${playerId}`);

            dispatch(handleFetchLifetimeStatsSuccess(response.data));
        }
        catch (error) {
            dispatch(handleFetchLifetimeStatsError(error.response.data));
        }

        dispatch(handleLifetimeStatsLoading(false));
    }
}

export const handleFetchLifetimeStatsSuccess = (lifetimeStats) => {
    return {
        type: FETCH_LIFETIME_STATS_SUCCESS,
        lifetimeStats
    }
}

export const handleFetchLifetimeStatsError = (error) => {
    return {
        type: FETCH_LIFETIME_STATS_ERROR,
        error
    }
}

export const handleLifetimeStatsLoading = (isLoading) => {
    return {
        type: LIFETIME_STATS_IS_LOADING,
        isLoading
    }
}