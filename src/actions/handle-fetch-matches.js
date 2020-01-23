import { FETCH_MATCHES_SUCCESS, FETCH_MATCHES_ERROR, MATCHES_IS_LOADING } from '../constants/fetch-matches';
import { get } from 'axios';

export const handleFetchMatches = (platform, matchIds) => {
    return async dispatch => {
        dispatch(handleMatchesLoading(true));
 
        // Create a string of matchIds
        // ex: 'id1,id2,id3'
        const ids = matchIds.map(match => {
            return match.id;
        }).join(',');
    
        try {
            const response = await get(`/pubg/matches/${platform}?matchIds=${ids}`);

            dispatch(handleFetchMatchesSuccess(response.data));
        } catch (error) {
            dispatch(handleFetchMatchesError(error.response.data));
        }

        dispatch(handleMatchesLoading(false));
    }
}

 // Adds 10 more matches to the matches array in redux store
export const handleLoadMoreMatches = (platform, matchIds, index, limit) => {
   
    return dispatch => {
        if (index < matchIds.length) {
            /**
             * Dispatch handleFetchMatches function to fetch match data.
             * We pass in platform, and the match ids to request.
             * We create a copy of the matchIds array with slice method to prevent mutating the original matchIds array values.
             * Splice the ids at the index value(the current length of matches array) and take the next limit number of matchIds.
             */
            dispatch(handleFetchMatches(platform, matchIds.slice(0).splice(index, limit)));
        }
    }
}

const handleMatchesLoading = (isLoading) => {
    return {
        type: MATCHES_IS_LOADING,
        isLoading
    }
}

const handleFetchMatchesSuccess = (matches) => {
    return {
        type: FETCH_MATCHES_SUCCESS,
        matches
    }
}

const handleFetchMatchesError = (error) => {
    return {
        type: FETCH_MATCHES_ERROR,
        error
    }
}