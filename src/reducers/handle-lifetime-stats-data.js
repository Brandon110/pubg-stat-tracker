import {
    FETCH_LIFETIME_STATS_SUCCESS,
    FETCH_LIFETIME_STATS_ERROR,
    LIFETIME_STATS_IS_LOADING
} from '../constants/fetch-lifetime-stats';

const initialState = {
    data: undefined,
    error: undefined,
    loading: false
}

export const handleLifetimeStatsData = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LIFETIME_STATS_SUCCESS:
            return Object.assign({}, state, {
                data: action.lifetimeStats.data,
                error: null
            });

        case FETCH_LIFETIME_STATS_ERROR:
            return Object.assign({}, state, {
                error: action.error
            });

        case LIFETIME_STATS_IS_LOADING:
            return Object.assign({}, state, {
                loading: action.isLoading
            });
        default:
            return state;
    }
}