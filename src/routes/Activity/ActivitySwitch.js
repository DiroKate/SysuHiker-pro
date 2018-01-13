import React, { PureComponent } from 'react';
import { Route, Redirect, Switch } from 'dva/router';
import NotFound from '../Exception/404';
import { getRoutes } from '../../utils/utils';


export default class ActivitySwitch extends PureComponent {
  render() {
    const { match, routerData } = this.props;
    return (
      <Switch>
        {
          getRoutes(match.path, routerData).map(item => (
            <Route
              key={item.key}
              path={item.path}
              component={item.component}
              exact={item.exact}
            />
          ))
        }
        <Redirect exact from="/activities" to="/activities/list" />
        <Route render={NotFound} />
      </Switch>
    );
  }
}
