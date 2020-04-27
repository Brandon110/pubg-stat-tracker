import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleFetchLifetimeStats } from '../actions/handle-fetch-lifetime-stats';
import { humanizeString, roundNum } from '../utils/helpers';
import queryString from 'query-string';
import Loading from './loading';
import ErrorMsg from './error-msg';

const LifetimeStats = ({ location, playerId, handleFetchLifetimeStats, lifetimeStats }) => {
    const { platform, username } = queryString.parse(location.search);

    const [currentMode, setCurrentMode] = useState('fpp');
    const [gameModes] = useState({
        fpp: ['solo-fpp', 'duo-fpp', 'squad-fpp'],
        tpp: ['solo', 'duo', 'squad']
    });

    useEffect(() => {
        handleFetchLifetimeStats(platform, playerId);
    }, [platform, playerId, username]);

    const onGameModeChange = (e) => {
        setCurrentMode(e.target.value);
    }

    const renderStats = (mode, index) => {
        /**
         * Displays gameModeStats at index of the mode.
         */
        const {
            wins,
            kills,
            longestKill,
            roundMostKills,
            top10s,
            assists,
            losses } = lifetimeStats.data.attributes.gameModeStats[mode];

        return (
            <div className={`lifetime-stats-content ${mode}-stats`} key={index}>
                <h5>{humanizeString(mode)}</h5>
                {
                    /**
                     * Check to see if there is data to show
                     * 
                     * We check to see if there is game data to show by checking if
                     * players wins or losses are above 0. Else we assume there 
                     * is no game data to show.
                     */
                    wins > 0 || losses > 0 ?
                        <Fragment>
                            <p className='top-10s'><span>Top 10s</span> {top10s}</p>
                            <p className='wins-loosses'><span>Wins/Losses</span> {wins}/{losses}</p>
                            <ul>
                                <li><span className='stat-label'>Most Kills</span> <span className='stat-value'>{roundMostKills}</span></li>
                                <li><span className='stat-label'>Kills</span> <span className='stat-value'>{kills}</span></li>
                                <li><span className='stat-label'>Longest Kill</span> <span className='stat-value'>{roundNum(longestKill)}m</span></li>
                                <li><span className='stat-label'>Assists</span> <span className='stat-value'>{assists}</span></li>
                            </ul>
                        </Fragment>
                        :
                        <p className='no-stats-to-show'>Currently no {humanizeString(mode)} stats to show.</p>
                }
            </div>
        )
    }
    
    if (lifetimeStats.error) {
        return <ErrorMsg errorMsg={lifetimeStats.error.error} />
    }

    if (lifetimeStats.loading) {
        return <Loading />
    }

    if(!lifetimeStats.data) {
        return <p>No lifetime stats to show.</p>
    }
 
    return (
        <Fragment>
            <select className='select-mode' onChange={onGameModeChange} value={currentMode}>
                {
                    Object.keys(gameModes).map((key, index) => (
                        <option key={index} value={key}>{key}</option>
                    ))
                }
            </select>
            <div className='lifetime-stats-wrapper'>
                {
                    /**
                     * Loop through gameModes at the index of currentMode 
                     */
                    gameModes[currentMode].map((mode, index) => (
                        renderStats(mode, index)
                    ))
                }
            </div>
        </Fragment>
    )
}

const mapStateToRrops = ({ lifetimeStats }) => {
    return {
        lifetimeStats
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ handleFetchLifetimeStats }, dispatch);
}

export default connect(mapStateToRrops, mapDispatchToProps)(withRouter(LifetimeStats));