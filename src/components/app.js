import React from 'react';
import { Router } from 'react-router-dom';
import history from '../history';
import Header from './header';
import Footer from './footer';
import Routes from './routes';

const App = () => (
    <Router history={history}>
        <Header />
        <div className='site-content'>
            <main className='main-content'>
                <div className='container'>
                    <Routes />
                </div>
            </main>
        </div>
        <Footer />
    </Router>
)

export default App;