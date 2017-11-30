import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Card, Avatar, Divider, Icon, Table, Collapse,
  Modal, Button, List, Row, Col, Tag } from 'antd';


import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from './index.less';

export default class TeahouseDetails extends Component {
  render() {
    const loading = false;
    return (
      <PageHeaderLayout
        title="这个是帖子详情"
        content="作者信息"
      >
        <Card bordered={false} loading={loading}>
          帖子内容
        </Card>
      </PageHeaderLayout>);
  }
}
