import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Card, List, Avatar } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@connect(state => ({
  user: state.suser.currentUser,
}))
export default class Details extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'suser/fetchCurrent',
    });
  }
  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <PageHeaderLayout
        content="fadfad"
        extraContent="fadfad"
      >
        hahah
      </PageHeaderLayout>
    );
  }
}
