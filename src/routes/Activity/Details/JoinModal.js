import React, { Component } from 'react';
import { Form, Input, Alert, Icon, Radio, Checkbox } from 'antd';

import { statement, genderColor } from '../../../common/config';

const FormItem = Form.Item;

@Form.create()
export default class JoinModal extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { xs: { span: 24 }, sm: { span: 3 }, md: { span: 4 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 20 }, md: { span: 16 } },
    };
    const formItemLayoutSmall = {
      labelCol: { xs: { span: 24 }, sm: { span: 3 }, md: { span: 4 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 6 }, md: { span: 6 } },
    };
    const roleOptions = ['领队', '协作', '头驴', '尾驴', '财务', '后勤', '环保', '作业', '摄影', '医护', '厨师'];

    const formData1 = [
      {
        label: '昵称',
        id: 'nickName',
        required: true,
        message: '请输入你的昵称!',
        whitespace: true,
        initialValue: 'userdata.user_nick',
      }, {
        label: '真实姓名',
        id: 'realName',
        required: true,
        message: '请输入你的真实姓名!',
        whitespace: true,
        initialValue: 'userdata.user_name',
      },
    ];

    const campOptions = ['暂无', '单人帐篷', '双人帐篷', '三人帐篷', '其他请在备注说明'];
    const fangchaodianOptions = ['暂无', '单人防潮垫', '双人防潮垫', '三人防潮垫', '其他请在备注说明'];
    const duijiangjiOptions = [
      '暂无',
      'V频段136-174MHz',
      'U频段400-470MHz',
      'U频段400-430MHz',
      'U频段450-470MHz',
      '其他情况请在备注说明',
    ];
    const lutouOptions = ['暂无', '扁气罐接口炉头', '长气罐接口炉头', '酒精炉头', '其他请在备注说明'];
    const taoguoOptions = ['暂无', '3人及以下小锅', '4-6人中锅', '7人以上大锅', '其他请在备注说明'];

    const formData2 = [
      {
        label: '帐篷',
        id: 'camp',
        datasource: campOptions,
      }, {
        label: '防潮垫',
        id: 'fangchaodian',
        datasource: fangchaodianOptions,
      }, {
        label: '对讲机',
        id: 'duijiangji',
        datasource: duijiangjiOptions,
      }, {
        label: '炉头',
        id: 'lutou',
        datasource: lutouOptions,
      }, {
        label: '套锅',
        id: 'taoguo',
        datasource: taoguoOptions,
      },
    ];
    return (
      <div>
        <Alert
          style={{ marginBottom: 32 }}
          message="请认真填写个人信息及装备情况，除了备注，任何一项都不可留空。"
          type="warning"
        />

        {/* ------------ 基本信息 --------------- */}
        <FormItem>
          <h3>基本信息</h3>
        </FormItem>

        {formData1.map(item => (
          <FormItem {...formItemLayout} label={item.label} id={item.id} hasFeedback>
            {getFieldDecorator(item.id, {
            rules: [
              {
                required: item.required,
                message: item.message,
                whitespace: item.whitespace,
              },
            ],
            initialValue: item.initialValue,
          })(
            <Input />)}
          </FormItem>
        ))}

        <FormItem {...formItemLayout} label="性别" id="gender">
          {getFieldDecorator('gender', {
          rules: [
            {
              required: true,
              message: '请选择性别',
            },
          ],
          initialValue: 'GG',
        })(
          <Radio.Group>
            <Radio value="GG">
              <Icon type="man" style={{ color: genderColor.GG }} />GG
            </Radio>
            <Radio value="MM">
              <Icon type="woman" style={{ color: genderColor.MM }} />MM
            </Radio>
          </Radio.Group>)}
        </FormItem>
        <FormItem {...formItemLayout} label="Email" id="email" hasFeedback>
          {getFieldDecorator('email', {
          rules: [
            {
              type: 'email',
              message: '非法邮箱地址',
            }, {
              required: true,
              message: '请输入邮箱',
            },
          ],
          initialValue: 'a@b.c',
        })(
          <Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="电话" id="phoneNum" hasFeedback>
          {getFieldDecorator('phoneNum', {
          rules: [
            {
              type: 'string',
              pattern: /^[0-9]+$/,
              message: '请输入正确的电话号码',
            }, {
              required: true,
              message: 'Please input your phone number!',
            },
          ],
          initialValue: '12345678901',
        })(
          <Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="住址" id="address" hasFeedback>
          {getFieldDecorator('address')(<Input value="userdata.user_address" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="团队角色" id="role">
          {getFieldDecorator('role', { initialValue: '领队' })(
            <Checkbox.Group options={roleOptions} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="QQ" id="qq" hasFeedback>
          {getFieldDecorator('qq')(
            <Input value="userdata.user_qq" />)}

        </FormItem>
        <FormItem {...formItemLayout} label="微博" id="weibo" hasFeedback>
          {getFieldDecorator('weibo')(
            <Input value="userdata.user_weiboLink" />)}
        </FormItem>

        {/* ========== 基本信息 ========== */}

        {/* ---------- 保险信息 ---------- */}
        <FormItem>
          <h3>保险信息</h3>
        </FormItem>
        <FormItem {...formItemLayout} label="紧急联系人" id="emergencyMan" hasFeedback>
          {getFieldDecorator('emergencyMan', {
          rules: [
            {
              required: true,
              message: '请输入紧急联系人',
              whitespace: true,
            },
          ],
          initialValue: 'userdata.user_urgentName',
        })(
          <Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="紧急联系人电话" id="emergencyNum" hasFeedback>
          {getFieldDecorator('emergencyNum', {
          rules: [
            {
              type: 'string',
              pattern: /^[0-9]+$/,
              message: '请输入正确的电话号码',
            }, {
              required: true,
              message: '请输入紧急联系人电话号码',
            },
          ],
          initialValue: '12345678910',
        })(
          <Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="保险信息"
          id="insurance"
          hasFeedback
        >
          {getFieldDecorator('insurance')(
            <Input type="textarea" />)}
        </FormItem>
        {/* ========== 保险信息 ========== */}

        {/* ---------- 装备信息 ---------- */}
        <FormItem>
          <h3>装备信息</h3>
        </FormItem>
        <FormItem
          {...formItemLayoutSmall}
          label="登山包容量"
          id="backpack"
          hasFeedback
        >
          {getFieldDecorator('backpack')(
            <Input addonAfter="L" />)}
        </FormItem>
        <FormItem
          {...formItemLayoutSmall}
          label="睡袋温标"
          id="sleepBag"
          hasFeedback
        >
          {getFieldDecorator('sleepBag')(
            <Input addonAfter="℃" />)}
        </FormItem>

        {formData2.map(item => (
          <FormItem {...formItemLayout} label={item.label} id={item.id}>
            {getFieldDecorator(item.id)(
              <Checkbox.Group options={item.datasource} />)}
          </FormItem>
        ))}
        {/* ========== 装备信息 ========== */}
        {/* ---------- 备注信息 ---------- */}
        <FormItem>
          <h3>备注信息</h3>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="备注信息"
          id="notes"
          hasFeedback
        >
          {getFieldDecorator('notes')(
            <Input type="textarea" />)}
        </FormItem>
        {/* ========== 备注信息 ========== */}
        <FormItem>
          <h3>
        请认真阅读活动声明：
          </h3>
          <div style={{ border: 1, backgroundColor: '#CCFFFF' }}>
            <ol>
              {statement.map(value => (
                <li type="1">{value}</li>
              ))}
            </ol>
          </div>
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('agreement', {
          valuePropName: 'checked',
          rules: [
            {
              required: true,
              transform: value => (value
                ? 'true'
                : null),
              message: '请先同意声明条款',
            },
          ],
        })(
          <Checkbox>本人已经仔细阅读以上声明内容，认为完全符合本人意愿并同意签署.</Checkbox>)}
        </FormItem>
      </div>
    );
  }
}
