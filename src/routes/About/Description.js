import React, { PureComponent } from 'react';
import { Card, Timeline, Row, Col } from 'antd';

import { aboutDescription } from '../../common/config';
import styles from './index.less';


export default class Description extends PureComponent {
  render() {
    return (
      <Row>
        <Col
          className={styles.descWrapper}
          xs={{ span: 22 }}
          sm={{ span: 20 }}
        >
          <p>逸仙徒步是一个以中大及周边高校的在校学生和校友为主力的一个业余的户外爱好者小群体。不定期举行各种AA户外活动。</p>
          <p>逸仙徒步第一次走进人们的视野，可以追溯到海狮同学在2010年12月5日在BBS发的一个徒步召集贴。</p>
          <Card className={styles.card}>
            <p>发信人: sealionhhsh (sealion), 信区: XOutDoor</p>
            <p>标 题: 徒步召集令</p>
            <p>发信站: 逸仙时空 Yat-Sen Channel (Sun Dec 5 19:53:53 2010)</p>
            <br />
            <p>召集中大同学参加周末徒步活动。</p>
            <p>每周常规线路为火凤（火炉山-凤凰山）。</p>
            <p>具体徒步细则及相关户外知识，参照磨房（<ins>www.doyouhike.net</ins>）.</p>
            <p>对徒步感兴趣的同学可加入“逸仙徒步群”（26940421），请注明院系及年级。</p>
            <p>本群可视为磨房衍生群，一切徒步规则以磨房为准。</p>
            <br />
            <p>-------------------------------------</p>
            <br />
            <p>※ 来源:．逸仙时空 Yat-Sen Channel http://argo.sysu.edu.cn [FROM: 202.116.73.154</p>
            <p>本文全文链接:
              <a href="http://argo.sysu.edu.cn/bbscon?board=XOutDoor&file=M.1291550033.A">http://argo.sysu.edu.cn/bbscon?board=XOutDoor&file=M.1291550033.A</a>
            </p>
          </Card>
          <p>然后，逸仙徒步的第一批群众，在看到了这个帖子之后，就加进去逸仙徒步的群里面了。</p>

          <Timeline pending={<a href="/home" > Continue ...</a>} className={styles.timeline}>
            {aboutDescription.map(item => (
              <Timeline.Item>
                <p>{item}</p>
              </Timeline.Item>
      ))}
          </Timeline>
          <h3>今天，我们因为户外而在一起。明天，我们因为在一起而户外！</h3>
        </Col>
      </Row>
    );
  }
}
