import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Card, List, Avatar } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';

import styles from './Details.less';
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
    const {user_nick:nick} = user;

    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar size="large" src="https://gw.alipayobjects.com/zos/rmsportal/lctvVCLfRpYCkYxAsiVQ.png" />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>早安，{nick},祝你开心每一天！</div>
          <div>交互专家 | 蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED</div>
        </div>
      </div>
    );
    return (
      <PageHeaderLayout
        content={pageHeaderContent}
      >
        hahah
      </PageHeaderLayout>
    );
  }
}
