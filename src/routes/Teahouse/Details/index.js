import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Card, Avatar, Divider, Collapse, Button, List, Tag } from 'antd';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';


import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { bbsTypeOptions } from '../../../common/config';
import { htmlToEditorState, uploadImageCallBack } from '../../../utils/editor';

import styles from './index.less';

const { Panel } = Collapse;

@connect(({ teahouse, loading }) => ({
  details: teahouse.details,
  loading: loading.effects['teahouse/getDetails'],
  reList: teahouse.reList,
  reLoading: loading.effects['teahouse/getRe'],
}))
export default class TeahouseDetails extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };
  componentDidMount() {
    const { match, dispatch } = this.props;
    const { id } = match.params;
    dispatch({
      type: 'teahouse/getDetails',
      payload: { id },
    });
    dispatch({
      type: 'teahouse/getRe',
      payload: { id, page: 1, pageSize: 5 },
    });
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  handleRePageChange = (page, pageSize) => {
    const { dispatch, match } = this.props;
    const { id } = match.params;
    dispatch({
      type: 'teahouse/getRe',
      payload: {
        page, pageSize, id,
      },
    });
  };
  handleReSubmit = (e) => {
    e.preventDefault();
    // TODO
  };
  render() {
    const { details, loading,
      reList: { list: replys, pagination: rePage }, reLoading } = this.props;
    const { editorState } = this.state;

    /*
    * 作者信息
    */
    const writerInfo = (
      <div className={styles.extra}>
        <Avatar src={details.post_createUserAvatarUrl} size="small" />
        <Link to={`/users/${details.post_createUserId}`}>{details.post_createUserNick}</Link>
        <Tag
          style={{ marginLeft: 8 }}
          color={bbsTypeOptions[details.post_type]}
        >{details.post_type}
        </Tag>
        <em>发布于 {moment(details.post_createTime).fromNow()}</em>
      </div>
    );

    /* 帖子内容 */
    const contentState = htmlToEditorState(details.post_detail);
    const content = (
      <div style={{ marginTop: -90 }}>
        <Editor
          readOnly
          defaultEditorState={contentState}
          toolbarHidden
        />
      </div>
    );
    /* 关键字 */
    const { post_keywords: keywordList } = details;
    const keywords = (
      <div>
        {keywordList ? keywordList.split(',').map(value => (
          <Tag key={value}>{value}</Tag>
        )) : keywordList}
      </div>);

    /* 评论列表 */
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
    // 表头
    const panelHeader = (
      <div>
        <span style={{ fontSize: 16 }}>评论席</span>
        <span>{`(${rePage.total})`}</span>
      </div>);
    // 表内容
    const panelContent = (
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
    );

    /* 回复框 */
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


    return (
      <PageHeaderLayout
        title={details.post_title}
        content={writerInfo}
      >
        <Card bordered={false} loading={loading}>
          {content}
          <Divider />
          {keywords}
          <Divider />
          <Collapse bordered={false} defaultActiveKey={['reList']}>
            <Panel
              header={panelHeader}
              key="reList"
            >
              {panelContent}
              {reEditor}
            </Panel>
          </Collapse>

        </Card>
      </PageHeaderLayout>);
  }
}
