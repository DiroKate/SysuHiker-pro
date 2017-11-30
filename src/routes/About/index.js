import React, { PureComponent } from 'react';
import { Form, Card, Alert, Radio, DatePicker, Button, Input, message } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Description from './Description';
import Development from './Development';
import ContactUs from './ContactUs';


export default class AboutPage extends PureComponent {
  state = {
    tabKey: 'desc',
  };
  handleTabChange = (key) => {
    this.setState({
      tabKey: key,
    });
  };

  render() {
    const { tabKey } = this.state;
    const tabList = [
      {
        key: 'desc',
        tab: '逸仙徒步',
      },
      {
        key: 'dev',
        tab: '平台开发',
      },
      {
        key: 'contact',
        tab: '联系我们',
      },
    ];

    const panel = (key) => {
      switch (key) {
        case 'desc':
          return (<Description />);
        case 'dev':
          return (<Development />);
        case 'contact':
          return (<ContactUs />);
        default:
          break;
      }
    };

    return (
      <PageHeaderLayout
        title="关于我们"
        tabList={tabList}
        onTabChange={this.handleTabChange}
      >
        <Card bordered={false}>
          {panel(tabKey) }
        </Card>
      </PageHeaderLayout>
    );
  }
}
