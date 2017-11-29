import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { Form, Card, Radio, List, Tag, Icon, Avatar, Button, Input } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import StandardFormRow from '../../components/StandardFormRow';
import TagSelect from '../../components/TagSelect';
import { bbsTypeOptions } from '../../common/config';
import styles from './Teahouse.less';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const TIME_FORMAT = 'YYYY年MM月DD日';


@Form.create()
@connect(state => ({
  teahouse: state.teahouse,
}))
export default class ActivityList extends Component {
  state = {
    type: 'all',
  };
  componentDidMount() {
    this.props.dispatch({
      type: 'teahouse/fetch',
      payload: {
        pageSize: 10,
        page: 1,
        type: this.state.type,
      },
    });
  }
  handlePageChange = (page, pageSize) => {
    console.log(page,pageSize);
    const { dispatch } = this.props;
    console.log(this.state.type);
    dispatch({
      type: 'teahouse/fetch',
      payload: {
        page, pageSize, type: this.state.type,
      },
    });
  };
  handleTypeChange = (e) => {
    e.preventDefault();
    const { target } = e;
    const { dispatch } = this.props;
    dispatch({
      type: 'teahouse/fetch',
      payload: {
        page: 1, pageSize: 10, type: target.value,
      },
    });
    this.setState({
      type: target.value,
    });
  }
  handleAddNew=() => {
    this.props.dispatch(routerRedux.push('/activities/create'));
  }

  render() {
    const { form, teahouse: { list, loading, pagination } } = this.props;
    const { getFieldDecorator } = form;

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    const ListContent = ({ data: {
      post_keywords: keywords, post_createTime: createAt,
      post_createUserAvatarUrl: avatarUrl, post_createUserNick: userName,
      post_createUserId: userId,
    } }) => (
      <div className={styles.listContent}>
        <div className={styles.description}>
          {keywords.split(',').map(value => (
            <Tag>{value}</Tag>
          ))}
        </div>
        <div className={styles.extra}>
          <Avatar src={avatarUrl} size="small" />
          <Link to={`/users/${userId}`}>{userName}</Link>
          <em>发布于：{moment(createAt).format(TIME_FORMAT)}</em>
        </div>
      </div>
    );
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: pagination.pageSize,
      total: pagination.total,
      current: pagination.page,
      onChange: this.handlePageChange,
      onShowSizeChange: this.handlePageChange,
    };

    const extraContent = (
      <RadioGroup defaultValue="all" onChange={this.handleTypeChange}>
        <RadioButton value="all">全部</RadioButton>
        {
          Object.keys(bbsTypeOptions).map(option => (
            <RadioButton value={option}>{option}</RadioButton>
          ))
        }
      </RadioGroup>
    );

    const imgWrapper = url => (
      <div className={styles.listItemExtra}>
        <img src={url} alt="cover" />
      </div>
    );
    return (
      <PageHeaderLayout
        title="逸仙茶馆"
        content="想灌水想发布攻略想寻求其他帮助？发个贴吧！"
      >
        <div>
          <Card bordered={false}>
            <Form layout="inline">
              <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
                <FormItem>
                  {getFieldDecorator('category')(
                    <TagSelect onChange={this.handleFormSubmit} expandable>
                      {
                        Object.keys(bbsTypeOptions).map(option => (
                          <TagSelect.Option value={option}>{option}</TagSelect.Option>
                        ))
                      }
                    </TagSelect>
                  )}
                </FormItem>
              </StandardFormRow>
              <StandardFormRow
                title="话题搜索"
                block
              >
                <Input.Search
                  placeholder="请输入"
                  enterButton="搜索"
                  size="large"
                  onSearch={this.handleFormSubmit}
                  style={{ width: 522 }}
                />
              </StandardFormRow>
            </Form>
          </Card>
          <Card
            className={styles.listCard}
            bordered={false}
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Button type="dashed" style={{ width: '100%', marginBottom: 8 }} icon="plus" onClick={this.handleAddNew}>
              添加
            </Button>
            <List
              size="large"
              loading={loading}
              rowKey="post_id"
              itemLayout="vertical"
              pagination={paginationProps}
              dataSource={list}
              renderItem={item => (
                <List.Item
                  key={item.post_id}
                  actions={[
                    <IconText type="message" text={item.post_countRe} />]}
                  extra={imgWrapper(item.post_cover)}
                >
                  <List.Item.Meta
                    title={(
                      <Link to={`/teahouse/${item.post_id}`}><div className={styles.listItemMetaTitle}>{item.post_title}</div></Link>
                    )}
                    description={
                      <span>
                        <Tag color={bbsTypeOptions[item.post_type]}>{item.post_type}</Tag>
                      </span>
                    }
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
