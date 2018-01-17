import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { Form, Card, Radio, List, Tag, Icon, Avatar, Button } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { eventTypeColor } from '../../common/config';
import styles from './ActivityList.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const TIME_FORMAT = 'M月D日(ddd) HH:mm';


@Form.create()
@connect(({ activity, loading }) => ({
  activity,
  loading: loading.models.activity,
}))
export default class ActivityList extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'activity/fetch',
      payload: {
        pageSize: 10,
        page: 1,
      },
    });
  }
  handlePageChange = (page, pageSize) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'activity/fetch',
      payload: {
        page, pageSize,
      },
    });
  };
  handleAddNew=() => {
    this.props.dispatch(routerRedux.push('/activities/create'));
  }

  render() {
    const { form, loading, activity: { list, pagination } } = this.props;

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    const ListContent = ({ data: {
      event_comments, event_join_endtime, event_createUserAvatarUrl, event_createUserNick, event_createUserId,
    } }) => (
      <div className={styles.listContent}>
        <div className={styles.description}>{event_comments}</div>
        <div className={styles.extra}>
          <Avatar src={event_createUserAvatarUrl} size="small" />
          <Link to={`/users/${event_createUserId}`}>{event_createUserNick}</Link>
          <em>报名截止：{moment(event_join_endtime).format(TIME_FORMAT)}</em>
        </div>
      </div>
    );
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      total: pagination.total,
      current: pagination.page,
      onChange: this.handlePageChange,
      onShowSizeChange: this.handlePageChange,
    };

    const extraContent = (
      <RadioGroup defaultValue="all">
        <RadioButton value="all">全部</RadioButton>
        <RadioButton value="progress">进行中</RadioButton>
        <RadioButton value="end">已结束</RadioButton>
      </RadioGroup>
    );

    const imgWrapper = url => (
      <div className={styles.listItemExtra}>
        <img src={url} alt="cover" />
      </div>
    );
    return (
      <PageHeaderLayout
        title="我们的活动"
        content="AA户外概念下，人人都是领队，如果有好玩的路线或者点子，不妨创建一个活动，找到小伙伴们一起协助组织玩耍，认识更多靠谱的朋友们。"
      >
        <div>
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
              rowKey="id"
              itemLayout="vertical"
              pagination={paginationProps}
              dataSource={list}
              renderItem={item => (
                <List.Item
                  key={item.event_id}
                  actions={[
                    <IconText type="team" text={`${item.event_memberNum}/${item.event_maxhiker}`} />,
                    <IconText
                      type="calendar"
                      text={`${moment(item.event_starttime).format(TIME_FORMAT)} To ${moment(item.event_endtime).format(TIME_FORMAT)}`}
                    />,
                  ]}
                  extra={imgWrapper(item.event_cover)}
                >
                  <List.Item.Meta
                    title={(
                      <Link to={`/activities/${item.event_id}`}><div className={styles.listItemMetaTitle}>{item.event_name}</div></Link>
                    )}
                    description={
                      <span>
                        <Tag color={eventTypeColor[item.event_type]}>{item.event_type}</Tag>
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
