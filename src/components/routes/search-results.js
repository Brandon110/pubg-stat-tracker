import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleFetchPlayer } from '../../actions/handle-fetch-player';
import { handleClearSearch } from '../../actions/handle-clear-search';
import queryString from 'query-string';
import LifetimeStats from '../lifetime-stats';
import Matches from '../matches';
import ErrorMsg from '../error-msg';
import Loading from '../loading';
import ClearSearchQuery from '../clear-search-query';

const SearchResults = ({ playerInfo, location, handleFetchPlayer, handleClearSearch }) => {
    const { platform, username } = queryString.parse(location.search);

    useEffect(() => {
        handleFetchPlayer(platform, username);

        return () => {
            handleClearSearch();
        }
    }, [platform, username]);

    const renderSearchresults = () => {

        if (playerInfo.error) {
            return <ErrorMsg errorMsg={playerInfo.error.error} />
        }

        if (playerInfo.loading) {
            return <Loading />
        }

        if (!playerInfo.data.length) {
            return <p>No player data to show.</p>
        }

        const {
            attributes,
            id,
            relationships } = playerInfo.data[0];

        return (
            <Fragment>
                <header>
                    <ClearSearchQuery />
                    <h2>{attributes.name}</h2>
                    <p className='platform'>Platform: {attributes.shardId}</p>
                </header>
                <LifetimeStats playerId={id} />
                <Matches matchIds={relationships.matches.data} />
            </Fragment >
        )
    }

    return (
        <div className='search-results-wrapper'>
            {renderSearchresults()}
        </div>
    )
}

const mapStateToProps = ({ playerInfo }) => {
    return {
        playerInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ handleFetchPlayer, handleClearSearch }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);