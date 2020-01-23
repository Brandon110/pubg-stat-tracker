import { FETCH_MATCHES_SUCCESS, FETCH_MATCHES_ERROR, MATCHES_IS_LOADING } from '../constants/fetch-matches';

const initialState = {
    data: [],
    error: undefined,
    loading: false
}

export const handleMatchesData = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MATCHES_SUCCESS:
            return Object.assign({}, state, {
                data: [...state.data, ...action.matches],
                error: undefined
            });

        case FETCH_MATCHES_ERROR:
            return Object.assign({}, state, {
                error: action.error
            });

        case MATCHES_IS_LOADING:
            return Object.assign({}, state, {
                loading: action.isLoading
            });

        default:
            return state;
    }
}