/* eslint-disable */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { MainPlate, ContentPlate, Nav } from '../components';
import { ProtectedRoute } from '../shared/components';
import { Auth } from './auth';
import { Properties } from './properties';
import { Profile } from './profile';

export const Routes = () => (
  <Switch>
    <Route path="/auth" component={Auth} />
    <Route>
      <MainPlate>
        <Nav.Plate color="BLUE">
          <Nav.Item icon="House" to="/profile" label="Profile" />
          <Nav.Item icon="TreeView" to="/properties" label="Properties" />
        </Nav.Plate>
        <ContentPlate>
          <Switch>
            <ProtectedRoute exact path="/profile" component={Profile} />
          </Switch>
          <Switch>
            <ProtectedRoute exact path="/properties" component={Properties} />
            {/* <Redirect to="/properties" /> */}
          </Switch>
        </ContentPlate>
      </MainPlate>
    </Route>
  </Switch>
);
