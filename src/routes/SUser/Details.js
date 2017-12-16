import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Card, Avatar, Divider, Icon } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import { Pie } from '../../components/Charts';
import { genderColor } from '../../common/config';

import styles from './Details.less';

const { Description } = DescriptionList;
const GREETINGS = ['早上好', '中午好', '下午好', '晚上好', '夜猫子早点休息'];
const TIME = value => (`${value}次`);

@connect(state => ({
  user: state.suser.currentUser,
  activities: state.activity.list,
}))
export default class Details extends PureComponent {
  state={
    viewKey: 'welcome',
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'suser/fetchCurrent',
    });
    dispatch({
      type: 'activity/fetch',
      payload: { pageSize: 10, page: 1 },
    });
  }
  handleTabChange = (key) => {
    this.setState({
      viewKey: key,
    });
  }
  render() {
    const { user, activities } = this.props;
    const { user_nick: nick } = user;
    const getGreeting = () => {
      const nowHour = moment().hour();
      if (nowHour < 6) {
        return GREETINGS[4];
      } else if (nowHour < 12) {
        return GREETINGS[0];
      } else if (nowHour < 14) {
        return GREETINGS[1];
      } else if (nowHour < 18) {
        return GREETINGS[2];
      } else if (nowHour < 23) {
        return GREETINGS[3];
      } else {
        return GREETINGS[4];
      }
    };
    const countData = [{
      x: '领队次数',
      y: user.user_start_event_count,
    }, {
      x: '参与次数',
      y: user.user_join_event_count,
    }, {
      x: '飞机次数',
      y: user.user_fly_event_count,
    }];


    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/lctvVCLfRpYCkYxAsiVQ.png" />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>{`${getGreeting()}，${nick}，快去爬山吧！`}</div>
        </div>
      </div>
    );

    const tabList = [{
      key: 'welcome',
      tab: 'Welcome',
      default: true,
    }, {
      key: 'me',
      tab: '我的信息',
    }, {
      key: 'setting',
      tab: '设置',
    }];

    const ShowView = () => {
      if (this.state.viewKey === 'setting') {
        return (
          <div />
        );
      } else if (this.state.viewKey === 'me') {
        return (
          <Card bordered={false}>
            <DescriptionList size="large" col={2} title="个人信息" style={{ marginBottom: 32 }}>
              <Description term="昵称">
                <span>{`${user.user_nick}      `}</span>
                {user.user_gender === 'GG' ?
                  <Icon type="man" style={{ color: genderColor.GG }} /> :
                  <Icon type="woman" style={{ color: genderColor.MM }} />
                }
              </Description>
              <Description term="邮箱">{user.user_email}</Description>
              <Description term="真实名字">{user.user_name}</Description>
              <Description term="联系方式">{user.user_phone}</Description>
              <Description term="常住地址">{user.user_address}</Description>
              <Description term="微博"><a href={user.user_weiboLink}>{`@${user.user_weiboName}`}</a></Description>
              <Description term="QQ">{user.user_qq}</Description>
              <Description term="兴趣领域">{user.user_interest}</Description>
              <Description term="个性签名">{user.user_comments}</Description>
            </DescriptionList>
            <Divider style={{ marginBottom: 32 }} />
            <DescriptionList size="large" title="紧急联系信息" style={{ marginBottom: 32 }} col={1}>
              <Description term="联系人">{user.user_urgentName}</Description>
              <Description term="联系方式">{user.user_urgentPhone}</Description>
            </DescriptionList>
          </Card>);
      } else {
        return (
          <Row gutter={24}>
            <Col xl={16} lg={24} md={24} sm={24} xs={24}>
              <Card
                className={styles.projectList}
                style={{ marginBottom: 24 }}
                title="进行中的活动"
                bordered={false}
                extra={<Link to="/activities">全部活动</Link>}
                bodyStyle={{ padding: 0 }}
              >
                {
                  activities.map(item => (
                    <Card.Grid className={styles.projectGrid} key={item.event_id}>
                      <Card bodyStyle={{ padding: 0 }} bordered={false}>
                        <Card.Meta
                          title={(
                            <div className={styles.cardTitle}>
                              <Avatar size="small" src={item.event_createUserAvatarUrl} />
                              <Link to={`/activities/${item.event_id}`}>{item.event_createUserNick}</Link>
                            </div>
                          )}
                          description={item.event_name}
                        />
                      </Card>
                    </Card.Grid>))
                }
              </Card>
            </Col>
            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
              <Card
                style={{ marginBottom: 24 }}
                bordered={false}
                title="活动统计"
              >
                <Pie
                  hasLegend
                  title="活动累计"
                  subTitle="活动累计"
                  total={TIME(countData.reduce((pre, now) => now.y + pre, 0))}
                  data={countData}
                  valueFormat={val => TIME(val)}
                  height={294}
                />
              </Card>

            </Col>
          </Row>);
      }
    };


    return (
      <PageHeaderLayout
        content={pageHeaderContent}
        tabList={tabList}
        onTabChange={this.handleTabChange}
      >
        {ShowView()}
      </PageHeaderLayout>
    );
  }
}
