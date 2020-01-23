import {
    FETCH_PLAYER_SUCCESS,
    FETCH_PLAYER_ERROR,
    PLAYER_IS_LOADING
} from '../constants/fetch-player';
import { get } from 'axios';

// Handle fetch player 
export const handleFetchPlayer = (platform, username) => {
    return async dispatch => {
        dispatch(handlePlayerLoading(true));

        try {
            const response = await get(`/pubg/player/${platform}/${username}`);

            dispatch(handleFetchPlayerSuccess(response.data));
        }
        catch (error) {
            dispatch(handleFetchPlayerError(error.response.data));
        }

        dispatch(handlePlayerLoading(false));
    }
}

export const handleFetchPlayerSuccess = (player) => {
    return {
        type: FETCH_PLAYER_SUCCESS,
        player
    }
}

export const handleFetchPlayerError = (error) => {
    return {
        type: FETCH_PLAYER_ERROR,
        error
    }
}

export const handlePlayerLoading = (isLoading) => {
    return {
        type: PLAYER_IS_LOADING,
        isLoading
    }
}