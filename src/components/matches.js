import React, { Fragment, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleFetchMatches, handleLoadMoreMatches } from '../actions/handle-fetch-matches';
import { humanizeString } from '../utils/helpers';
import moment from 'moment';
import queryString from 'query-string';
import ErrorMsg from './error-msg';
import Loading from './loading';

const Matches = ({ matchIds, matches, handleFetchMatches, handleLoadMoreMatches, location }) => {
    const { platform } = queryString.parse(location.search);

    useEffect(() => {
        handleFetchMatches(platform, matchIds);
    }, [platform, matchIds]);

    const renderMatchData = (match) => {
        if (match.error) {
            return <p>{match.error}</p>
        }

        const {
            createdAt,
            mapName,
            gameMode,
            isCustomMatch,
            duration
        } = match.data.attributes;

        return (
            <Fragment>
                <div className='match-item match-created-at'>
                    {moment(createdAt).fromNow()}
                </div>
                <div className='match-item match-map-name'>
                    <span className='match-item-label'>Map</span> <span className='match-item-value'>{humanizeString(mapName)}</span>
                </div>
                <div className='match-item match-game-mode'>
                    <span className='match-item-label'>Mode</span> <span className='match-item-value'>{humanizeString(gameMode)}</span>
                </div>
                <div className='match-item match-is-custom-match'>
                    <span className='match-item-label'>Custom</span> <span className='match-item-value'>{isCustomMatch ? 'Yes' : 'No'}</span>
                </div>
                <div className='match-item match-duration'>
                    <span className='match-item-label'>Duration</span> <span className='match-item-value'>{duration}s</span>
                </div>
            </Fragment>
        )
    }

    const renderMatches = () => {
        if (matches.error) {
            return <ErrorMsg errorMsg={matches.error.error} />
        }

        if (matches.loading) {
            return <Loading />
        }

        if (!matches.data.length) {
            return <p>No matches to be found.</p>
        }

        return (
            <Fragment>
                {
                    matches.data.map((match, index) => {

                        return (
                            <li key={index} className='match'>
                                {renderMatchData(match)}
                            </li>
                        )
                    })
                }
                <button
                    // Loads more matches.
                    // We pass in platform, matchIds, the current length of matches array, and number of matches to fetch.
                    className='load-more-matches-button'
                    onClick={() => handleLoadMoreMatches(platform, matchIds, matches.data.length, 10)}
                    disabled={matches.data.length >= matchIds.length}
                >
                    More
                </button>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <h3>Player Matches</h3>
            <ul className='player-matches-wrapper'>
                {renderMatches()}
            </ul>
        </Fragment>
    )
}

const mapStateToProps = ({ matches }) => {
    return {
        matches
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ handleFetchMatches, handleLoadMoreMatches }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Matches));