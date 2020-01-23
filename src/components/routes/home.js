import React, { useLayoutEffect } from 'react';
import { NavLink } from 'react-router-dom';
import CoverPhoto from '../cover-photo';
import SearchForm from '../search-form';

const Home = () => {

    useLayoutEffect(() => {
        document.body.classList.add('homepage');

        return () => {
            document.body.classList.remove('homepage');
        }
    }, [])

    return (
        <CoverPhoto>
            <SearchForm />
            <div className='recommended-searches'>
                <h3>Recommended Searches</h3>
                <div className='searches'>
                    <NavLink to='search?platform=steam&username=chocoTaco'>chocoTaco</NavLink>
                    <span>|</span>
                    <NavLink to='search?platform=steam&username=Lurn'>Lurn</NavLink>
                    <span>|</span>
                    <NavLink to='search?platform=steam&username=Halifax'>Halifax</NavLink>
                </div>
            </div>
        </CoverPhoto>
    )
}

export default Home;