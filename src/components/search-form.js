import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleFetchPlayer } from '../actions/handle-fetch-player';
import queryString from 'query-string';
import history from '../history';

const SearchForm = ({ handleFetchPlayer, location }) => {
    const { platform } = queryString.parse(location.search);

    const [formValues, setFormValues] = useState({
        username: undefined,
        platform: platform || 'steam'
    });

    const onChange = (e) => {
        const { value, name } = e.target;

        setFormValues({ ...formValues, [name]: value });
    }

    const onSubmit = (e) => {
        // Prevent form submission
        e.preventDefault();

        // Get values from state
        const { platform, username } = formValues;

        // Remove the leading and trailing white spaces 
        const platId = platform.trim();
        const userId = username.trim();

        // Push values from state to url as search params
        history.push(`/search?platform=${platId}&username=${userId}`);

        // Fetch player with values from state
        handleFetchPlayer(platId, userId);

        // Clear the username field 
        clearUsername();
    }

    const clearUsername = () => {
        // Set username property value in formValues to undefined
        setFormValues({ ...formValues, username: undefined });
    }

    return (
        <form onSubmit={onSubmit} className='search-form'>
            <div className='search-wrapper'>
                <input
                    type='search'
                    className='search'
                    name='username'
                    value={formValues['username'] || ''}
                    placeholder='Username'
                    onChange={onChange}
                    required
                />
                <input type='image' className='search-submit-button' src='/images/search-icon.png' />
            </div>
            <select onChange={onChange} value={formValues['platform'] || ''} name='platform' required>
                <option value='steam'>STEAM</option>
                <option value='xbox'>XBOX</option>
                <option value='psn'>PSN</option>
            </select>
            <small>
                Note: Usernames are case sensitive
            </small>
        </form>
    )
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ handleFetchPlayer }, dispatch);
}

export default connect(null, mapDispatchToProps)(withRouter(SearchForm));