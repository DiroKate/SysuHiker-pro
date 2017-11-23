import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Card, Avatar, Divider, Icon, Table, Collapse } from 'antd';
import { Editor } from 'react-draft-wysiwyg';

import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import DescriptionList from '../../../components/DescriptionList';
import { htmlToEditorState } from '../../../utils/editor';
import styles from './index.less';

const { Description } = DescriptionList;
const { Panel } = Collapse;
const TIME_FORMAT = 'MM月DD日(dddd) HH:mm';

@connect(state => ({
  details: state.activity.details,
  loading: state.activity.detailsLoading,
  members: state.activity.members,
  mLoading: state.activity.membersLoading,
}))
export default class ActivityDetails extends Component {
  componentDidMount() {
    const { match, dispatch } = this.props;
    const { id } = match.params;
    dispatch({
      type: 'activity/getDetails',
      payload: { id },
    });
    dispatch({
      type: 'activity/getMembers',
      payload: { id },
    });
  }

  render() {
    const { details, loading, members, mLoading } = this.props;
    const leaderInfo = (
      <div className={styles.extra}>
        <Avatar src={details.event_createUserAvatarUrl} size="small" />
        <Link to={`/users/${details.event_createUserId}`}>{details.event_createUserNick}</Link>
        <em>发布于 {moment(details.event_createtime).fromNow()}</em>
      </div>
    );
    const term = (text, type) => (
      <span>
        <Icon type={type} /><span style={{ marginLeft: 8 }}>{text}</span>
      </span>);
    const duration = moment(details.event_endtime) - moment(details.event_starttime);

    const contentState = htmlToEditorState(details.event_detail);

    const baseInfoCard = (
      <Card bordered={false} loading={loading}>
        <DescriptionList size="large" title="时间地点" col={1} style={{ marginBottom: 32 }}>
          <Description term={term('目的地', 'environment-o')}>{details.event_destination}</Description>
          <Description term={term('活动时间', 'calendar')}>
            {`${moment(details.event_starttime).format(TIME_FORMAT)}   到   ${moment(details.event_endtime).format(TIME_FORMAT)}, 共${moment.duration(duration).humanize()}`}
          </Description>
          <Description term={term('报名时间', 'user-add')}>{`${moment(details.event_endtime).format(TIME_FORMAT)} 前`}</Description>
        </DescriptionList>
        <Divider style={{ marginBottom: 32 }} />
        <DescriptionList size="large" title="集合信息" style={{ marginBottom: 32 }}>
          <Description term={term('集合地点', 'rocket')}>{details.event_gather_location}</Description>
          <Description term={term('集合时间', 'clock-circle-o')}>{moment(details.event_gather_time).format(TIME_FORMAT)}</Description>
        </DescriptionList>
        <Divider style={{ marginBottom: 32 }} />
        <DescriptionList size="large" title="活动信息" col={1} style={{ marginBottom: 32 }}>
          <Description style={{ marginTop: -96 }}>
            <Editor
              readOnly
              defaultEditorState={contentState}
              toolbarHidden
              toolbarClassName="show-editor-empty-toolbar"
            />
          </Description>
        </DescriptionList>
        <Divider style={{ marginBottom: 32 }} />
        <DescriptionList size="large" title="备注" col={1} style={{ marginBottom: 32 }}>
          <Description>
            <div>{details.event_comments}</div>
          </Description>
        </DescriptionList>
      </Card>);

    const columns = [{
      title: 'index',
      key: 'index',
      render: (t, r, index) => (<div>{index + 1}</div>),
    }, {
      title: 'name',
      key: 'name',
      render: (_, record) => (
        <div className={styles.extra}>
          <Avatar src={record.event_joinlist_userAvatarUrl} size="small" />
          <Link to={`/users/${record.event_joinlist_userid}`}>{record.event_joinlist_usernick}</Link>
          <Icon type={record.event_joinlist_usergender === 'GG' ? 'man' : 'woman'} />
        </div>
      ),
    }, {
      title: 'role',
      width: '20%',
      dataIndex: 'event_joinlist_userrole',
      key: 'event_joinlist_userrole',
    }, {
      title: '备注',
      width: '40%',
      dataIndex: 'event_joinlist_comments',
      key: 'event_joinlist_comments',
    }, {
      title: 'time',
      key: 'time',
      render: (_, record) => (
        <div>{moment(record.event_joinlist_joindate).fromNow()}</div>
      ),
    }, {
      title: 'status',
      name: 'status',
      render: () => (<div>活动成员</div>),
    }];

    const memberInfoCard = (
      <Panel header="活动成员" key="1" className={styles.collapseHeader}>
        <Table
          loading={mLoading}
          rowKey="name"
          dataSource={members}
          columns={columns}
          pagination={false}
          showHeader={false}
        />
      </Panel>
    );

    return (
      <PageHeaderLayout
        title={details.event_name}
        content={leaderInfo}
      >
        {baseInfoCard}
        <Collapse bordered={false} defaultActiveKey={['1']} style={{ marginTop: 32 }}>
          {memberInfoCard}
        </Collapse>
      </PageHeaderLayout>
    );
  }
}