import {
    FETCH_PLAYER_SUCCESS,
    FETCH_PLAYER_ERROR,
    PLAYER_IS_LOADING
} from '../constants/fetch-player';


const initialState = {
    data: [],
    error: undefined,
    loading: false
}

export const handlePlayerData = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PLAYER_SUCCESS:
            return Object.assign({}, state, {
                data: action.player.data,
                error: null
            });

        case FETCH_PLAYER_ERROR:
            return Object.assign({}, state, {
                error: action.error
            });

        case PLAYER_IS_LOADING:
            return Object.assign({}, state, {
                loading: action.isLoading
            });
        default:
            return state;
    }
}