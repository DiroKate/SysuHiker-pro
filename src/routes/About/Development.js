import React, { PureComponent } from 'react';
import { Tag, Card, Icon } from 'antd';

import LocalIcon from '../../components/LocalIcon';
import DescriptionList from '../../components/DescriptionList';
import styles from './index.less';

const { Description } = DescriptionList;


export default class Development extends PureComponent {
  render() {
    const cardBox = (iconType, title, userName, email, github, tags) => (
      <Card bordered>

        <DescriptionList
          size="large"
          title={<span><LocalIcon type={iconType} className={styles.devIcon} />{title}</span>}
          col={1}
        >
          <Description term={<Icon type="user" />}>{userName}</Description>
          <Description term={<Icon type="mail" />}>{email}</Description>
          <Description term={<Icon type="github" />}>
            <a href={`https://github.com/${github}`}>{github}</a>
          </Description>
          <Description term={<Icon type="tags" />}>
            <div>
              { tags.map(value => (
                <Tag key={value}>{value}</Tag>
            ))}
            </div>
          </Description>

        </DescriptionList>
      </Card>

    );

    return (
      <div>

        <h2>sysuhiker 是一个平台，主要供组织活动的时候报名使用.</h2>
        <br />
        <p><LocalIcon type="guanwang" />唯一官网：<a href="http://sysuhiker.cc">http://sysuhiker.cc</a>
        </p>
        <br />
        <p>欢迎各位码农宅男加入逸仙徒步活动平台系统的开发,贡献免费劳动力，使之功能更健全更易用，方便咱广大驴友。</p>
        <DescriptionList size="large" title="有意者请联系" style={{ marginBottom: 32 }} col={2}>
          <Description>
            {cardBox('php', '后端', 'later', 'later.h.p@qq.com',
              'later2015/sysuhiker', ['PHP', 'SAE', 'mysql'])}
          </Description>
          <Description>
            {cardBox('react', '前端', 'diroguan', 'diroguan@foxmail.com',
              'DiroKate/SysuhikerCC', ['Node.js', 'Reactjs', 'AntdPro'])}
          </Description>
        </DescriptionList>

      </div>
    );
  }
}
