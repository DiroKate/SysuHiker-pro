import React, { Component } from 'react';
import { Card } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DraftEditor from '../../components/DraftEditor';

export default class Demo extends Component {
  render() {
    return (
      <PageHeaderLayout
        title="demo"
        content="demo"
      >
        <Card
          title="进行中的项目"
          bordered={false}
        >
          <DraftEditor />
        </Card>
      </PageHeaderLayout>);
  }
}
