import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form, Card, Radio, List, Tag, Icon, Avatar, Button, Input } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import StandardFormRow from '../../components/StandardFormRow';
import TagSelect from '../../components/TagSelect';
import styles from './ActivityList.less';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const pageSize = 5;

@Form.create()
@connect(state => ({
  list: state.list,
}))
export default class ActivityList extends Component {
  componentDidMount() {
    this.fetchMore();
  }

  setOwner = () => {
    const { form } = this.props;
    form.setFieldsValue({
      owner: ['wzj'],
    });
  }

  fetchMore = () => {
    this.props.dispatch({
      type: 'list/fetch',
      payload: {
        count: pageSize,
      },
    });
  }

  handleTabChange = (key) => {
    const { dispatch } = this.props;
    switch (key) {
      case 'docs':
        dispatch(routerRedux.push('/list/search'));
        break;
      case 'app':
        dispatch(routerRedux.push('/list/filter-card-list'));
        break;
      case 'project':
        dispatch(routerRedux.push('/list/cover-card-list'));
        break;
      default:
        break;
    }
  }

  render() {
    const { form, list: { list, loading } } = this.props;
    const { getFieldDecorator } = form;

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    const ListContent = ({ data: { content, updatedAt, avatar, owner, href } }) => (
      <div className={styles.listContent}>
        <div className={styles.description}>{content}</div>
        <div className={styles.extra}>
          <Avatar src={avatar} size="small" /><a href={href}>{owner}</a> 发布在 <a href={href}>{href}</a>
          <em>{moment(updatedAt).format('YYYY-MM-DD hh:mm')}</em>
        </div>
      </div>
    );


    const extraContent = (
      <RadioGroup defaultValue="all">
        <RadioButton value="all">全部</RadioButton>
        <RadioButton value="progress">进行中</RadioButton>
        <RadioButton value="end">已结束</RadioButton>
      </RadioGroup>
    );
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

    return (
      <PageHeaderLayout
        title="我们的活动"
        content="AA户外概念下，人人都是领队，如果有好玩的路线或者点子，不妨创建一个活动，找到小伙伴们一起协助组织玩耍，认识更多靠谱的朋友们。"
      >
        <div>
          <Card bordered={false}>
            <Form layout="inline">
              <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
                <FormItem>
                  {getFieldDecorator('category')(
                    <TagSelect onChange={this.handleFormSubmit} expandable>
                      <TagSelect.Option value="休闲拉练">休闲拉练</TagSelect.Option>
                      <TagSelect.Option value="正常拉练">正常拉练</TagSelect.Option>
                      <TagSelect.Option value="极限拉练">极限拉练</TagSelect.Option>
                      <TagSelect.Option value="休闲露营">休闲露营</TagSelect.Option>
                      <TagSelect.Option value="长线露营">长线露营</TagSelect.Option>
                      <TagSelect.Option value="休闲户外">休闲户外</TagSelect.Option>
                      <TagSelect.Option value="非户外活动AA约伴">非户外活动AA约伴</TagSelect.Option>
                    </TagSelect>
                  )}
                </FormItem>
              </StandardFormRow>
              <StandardFormRow
                title="活动搜索"
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
            <Button type="dashed" style={{ width: '100%', marginBottom: 8 }} icon="plus">
              添加
            </Button>
            <List
              size="large"
              loading={list.length === 0 ? loading : false}
              rowKey="id"
              itemLayout="vertical"
              pagination={paginationProps}
              dataSource={list}
              renderItem={item => (
                <List.Item
                  key={item.id}
                  actions={[
                    <IconText type="star-o" text={item.star} />,
                    <IconText type="like-o" text={item.like} />,
                    <IconText type="message" text={item.message} />,
                  ]}
                  extra={<div className={styles.listItemExtra} />}
                >
                  <List.Item.Meta
                    title={(
                      <a className={styles.listItemMetaTitle} href={item.href}>{item.title}</a>
                    )}
                    description={
                      <span>
                        <Tag>Ant Design</Tag>
                        <Tag>设计语言</Tag>
                        <Tag>蚂蚁金服</Tag>
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
