import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Card, Avatar, Divider, Icon, Table, Collapse,
  Modal, Button, List, Row, Col, Tag } from 'antd';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import DescriptionList from '../../../components/DescriptionList';
import { eventTypeColor } from '../../../common/config';

import { htmlToEditorState, uploadImageCallBack } from '../../../utils/editor';
import JoinModal from './JoinModal';
import styles from './index.less';

const { Description } = DescriptionList;
const { Panel } = Collapse;
const TIME_FORMAT = 'MM月DD日(dddd) HH:mm';

@connect(state => ({
  details: state.activity.details,
  loading: state.activity.detailsLoading,
  members: state.activity.members,
  mLoading: state.activity.membersLoading,
  reList: state.activity.reList,
  reLoading: state.activity.reLoading,
}))
export default class ActivityDetails extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    modalVisible: false,
    modalInputValues: {},
  };
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
    dispatch({
      type: 'activity/getRe',
      payload: { id, page: 1, pageSize: 5 },
    });
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }
  handleReSubmit = (e) => {
    e.preventDefault();
    // TODO
  }
  handleRePageChange = (page, pageSize) => {
    const { dispatch, match } = this.props;
    const { id } = match.params;
    dispatch({
      type: 'activity/getRe',
      payload: {
        page, pageSize, id,
      },
    });
  };

  render() {
    const { details, loading, members, mLoading,
      reList: { list: replys, pagination: rePage }, reLoading } = this.props;
    const { editorState, modalVisible, modalInputValues } = this.state;
    // TODO: 处理当前页面状态
    const isOpen = true;
    const isAdmin = false;
    const isMember = false;
    // --------------------

    let btnGroup = [];
    const joinBtn = (
      <Col><Button
        onClick={() => this.handleModalVisible(true)}
        type="primary"
        icon="check"
      >报名参加</Button>
      </Col>);
    const editEventBtn = (<Col><Button icon="edit">编辑活动</Button></Col>);
    const editJoinBtn = (<Col><Button icon="tool">编辑报名信息</Button></Col>);
    const quitBtn = (<Col><Button type="danger" icon="close">退出活动</Button></Col>);
    const disabledBtn = (<Col><Button type="danger" icon="frown-o" disabled>活动已截止报名</Button></Col>);

    if (isOpen) {
      if (isAdmin) {
        btnGroup = [editEventBtn, editJoinBtn, quitBtn];
      } else if (isMember) {
        btnGroup = [editJoinBtn, quitBtn];
      } else {
        btnGroup = [joinBtn];
      }
    } else if (isAdmin) {
      btnGroup = [editEventBtn, disabledBtn];
    } else {
      btnGroup = [disabledBtn];
    }

    const leaderInfo = (
      <Row type="flex" align="middle" justify="space-between">
        <Col span={10}>
          <div className={styles.extra}>
            <Avatar src={details.event_createUserAvatarUrl} size="small" />
            <Link to={`/users/${details.event_createUserId}`}>{details.event_createUserNick}</Link>
            <Tag
              style={{ marginLeft: 8 }}
              color={eventTypeColor[details.event_type]}
            >{details.event_type}
            </Tag>
            <em>发布于 {moment(details.event_createtime).fromNow()}</em>
          </div>
        </Col>
        <Col span={12}>
          <Row type="flex" align="middle" justify="end" gutter={8}>
            {btnGroup}
          </Row>
        </Col>
      </Row>
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
          <Icon
            style={{ marginLeft: 8, color: record.event_joinlist_usergender === 'GG' ? '#0033FF' : '#FF0066' }}
            type={record.event_joinlist_usergender === 'GG' ? 'man' : 'woman'}
          />
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

    const memberInfoPanel = (
      <Panel
        header={(<div className={styles.memberInfoPanelHeader}>活动成员</div>)}
        key="1"
        className={styles.collapseHeader}
      >
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

    const rePaginationProps = {
      pageSize: rePage.pageSize,
      total: rePage.total,
      current: rePage.page,
      onChange: this.handleRePageChange,
    };

    const contentNode = detail => (
      <div className={styles.contentNode}>
        <Editor
          readOnly
          defaultEditorState={htmlToEditorState(detail)}
          toolbarHidden
        />
      </div>
    );
    const reEditor = (
      <div className={styles.reEditorWrapper}>
        <Editor
          localization={{ locale: 'zh' }}
          toolbarClassName={styles.editorToolbar}
          wrapperClassName={styles.editorWrapper}
          editorClassName={styles.editorEditor}
          toolbarOnFocus
          toolbar={{
            options: ['inline', 'colorPicker', 'link', 'image', 'emoji', 'history'],
            inline: { options: ['bold', 'italic', 'underline'] },
            image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
          }}
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
        />
        <Button className={styles.reSubmitBtn} size="large" type="primary" onClick={this.handleReSubmit}>发表评论</Button>
      </div>
    );
    const discussPanel = (
      <Panel
        header={(
          <div>
            <span style={{ fontSize: 16 }}>讨论</span>
            <span>{`(${rePage.total})`}</span>
          </div>)}
        key="2"
        className={styles.collapseHeader}
      >
        <List
          rowKey="re_id"
          loading={reLoading}
          pagination={rePaginationProps}
          dataSource={replys}
          locale={{
            emptyText: '居然没有人讨论',
          }}
          renderItem={item => (
            <List.Item
              actions={[<span>{`#${item.re_orderId}`}</span>]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.re_createUserAvatarUrl} />}
                title={(<Link to={`/users/${item.re_createUserId}`}>{item.re_createUserNick}</Link>)}
                description={moment(item.re_createTime).fromNow()}
              />
              {contentNode(item.re_detail)}
            </List.Item>
          )}
        />
        {reEditor}
      </Panel>
    );

    return (
      <PageHeaderLayout
        title={details.event_name}
        content={leaderInfo}
      >
        {baseInfoCard}
        <Collapse bordered={false} defaultActiveKey={[]}>
          {memberInfoPanel}
          {discussPanel}
        </Collapse>
        <Modal
          title={`正在报名 @${details.event_createUserNick} 发起的 [${details.event_name}]`}
          width={800}
          visible={modalVisible}
          onOk={this.handleAdd}
          onCancel={() => this.handleModalVisible()}
        >
          <JoinModal />
        </Modal>
      </PageHeaderLayout>

    );
  }
}
