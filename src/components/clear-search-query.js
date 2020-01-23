import React from 'react';
import history from '../history';

const ClearSearchQuery = () => {
    const clearSearchQuery = () => {
        history.push({ pathname: '/', search: '' });
    }

    return (
        <button onClick={clearSearchQuery} className='clear-search-btn'>
            <i className='fas fa-times'></i>
        </button>
    )
}

export default ClearSearchQuery;