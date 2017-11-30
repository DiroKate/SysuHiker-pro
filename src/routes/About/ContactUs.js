import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import LocalIcon from '../../components/LocalIcon';

import styles from './index.less';

export default class ContactUs extends PureComponent {
  render() {
    return (
      <div>
        <h1>联系我们</h1>
        <Row type="flex" gutter={16} className={styles.contactWrapper}>
          <Col
            xs={{
          span: 24,
        }}
            sm={{
          span: 16,
        }}
          >
            <h2>逸仙徒步社区基金</h2>
            <br />
            <p>逸仙徒步社区基金，属非营利及自愿性质，采用公开及透明的运作方式，来源于大家，服务于大家。</p>
            <br />
            <br />
            <ul>
              <li>
                <b>基金目的：</b>
                <br />
            来源于大家，服务于大家。
              </li>
              <br />

              <li>
                <b>基金主要用途：</b>
                <ol>
                  <li>支付逸仙徒步活动平台网站的服务运维消费费用（首要）。</li>
                  <li>一些公共装备的采购，如公共药品/广告牌/纪念品等（在有结余的情况下）。</li>
                  <li>其他一些管委会议定通过的项目。</li>
                </ol>
              </li>
              <br />

              <li>
                <b>基金筹款途径：</b>
                <ol>
                  <li>众人捐款。</li>
                  <li>活动结余（比如说活动/腐败结束后，还剩几块钱，一个个退回去麻烦，可以直接捐给我们社区基金）。</li>
                  <li>实物义卖。</li>
                  <li>广告赞助（liS：据新浪云官方统计，咱平台过去30天有17万PV的访问量，欢迎各位老板来投放广告，广告费从优！）。</li>
                </ol>
                <img
                  src="http://sysuhiker.cc/upload/maps/201604/wps3FC7.tmp.jpg14601800898351.jpg"
                  alt="170W"
                />
              </li>
              <br />

              <li>
                <b>大家对社区基金的权利：</b>
                <ol>
                  <li>有权查阅任何一期财务报表。</li>
                  <li>如对基金收付有疑义，有权提出并获解答。</li>
                  <li>有权拒绝将本驴本次活动余款上交基金。</li>
                  <li>有权提出基金所涵括用途的任何一项费用申请，但须服从动用程序产生的结果。</li>
                  <li>有权对基金正常动用的结果提出自己的看法和建议， 但不影响管委会对该次动用的判断结果。</li>
                  <li>有权对基金紧急动用的结果提出自己的看法和建议，但不影响管委会对该次动用的判断结果。</li>
                </ol>
              </li>
              <br />

              <li>
                <b>大家对社区基金的义务：</b>
                <ol>
                  <li>对已上交的款项，默认接受管委会的一切管理和决策。</li>
                  <li>对已上交的款项，不论是活动余款还是自愿捐款，不管对基金的运作有何想法，不得退还。</li>
                  <li>对已上交款项，有义务在基金管理帖中发帖申明款项来源及金额。</li>
                </ol>
              </li>
              <br />

              <li>
                <b>社区基金管委会成员</b>
                <p>由逸仙徒步管委会管理。</p>
              </li>
              <br />
            </ul>

            <p>管理组：later，北水，蛋神，柚子，小强，光子</p>

            <p>赞助联系人：蛋神</p>

            <p>财务：北水</p>

          </Col>

          <Col
            xs={{ span: 24 }}
            sm={{ span: 8 }}
          >
            <p className={styles.contact}><LocalIcon className={styles.contactIcon} type="QQqun" />26940421</p>
            <p className={styles.contact}><LocalIcon className={styles.contactIcon} type="guanwang" />
              <a href="http://sysuhiker.cc">http://sysuhiker.cc</a>
            </p>
            <p className={styles.contact}><LocalIcon className={styles.contactIcon} type="weibo" />
              <a href="http://weibo.com/yixiantubu">@逸仙徒步</a>
            </p>
            <p className={styles.contact}><LocalIcon className={styles.contactIcon} type="zhifubao" />sysu_hiker@126.com</p>
            <img
              src="http://sysuhiker.cc/upload/maps/201604/wps3FE7.tmp.png14601800911141.png"
              alt="qrcode"
              className={styles.qrcode}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
