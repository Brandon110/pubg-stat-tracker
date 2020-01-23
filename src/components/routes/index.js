import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './home';
import NotFound from '../404';
import SearchResults from './search-results';

const Routes = () => (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/search' component={SearchResults} />
        <Route component={NotFound} />
    </Switch>
)

export default Routes;