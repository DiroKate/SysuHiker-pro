import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Card, Radio, List, Tag, Icon, Avatar, Button, Input } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';


const FormItem = Form.Item;
@Form.create()
@connect(state => ({
  activity: state.activity,
}))

export default class ActivityCreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <PageHeaderLayout
        title="hahahaha"
        content="huodongshijian"
      >
        <p>hahahahaha</p>
      </PageHeaderLayout>
    );
  }
}
