import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import SearchForm from './search-form';

const Header = () => (
    <header className='site-header'>
        <div className='site-header-content'>
            <h1 className='site-title'><NavLink to='/'>PUBG STATS</NavLink></h1>
            <SearchForm />
        </div>
    </header>
)

export default withRouter(Header);