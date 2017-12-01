import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Form, Input, Button, Select, Row, Col, Radio, Checkbox, Tooltip, Icon } from 'antd';
import styles from './Register.less';
import { genderColor, roleOptions } from '../../common/config';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

@connect(state => ({
  register: state.sRegister,
}))
@Form.create()
export default class Register extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields({ force: true },
      (err, values) => {
        if (!err) {
          this.props.dispatch({
            type: 'sRegister/submit',
            payload: values,
          });
        }
      }
    );
  }

  render() {
    const { form, register } = this.props;
    const { getFieldDecorator, validateFields, getFieldValue } = form;

    const formItemLayout = num => ({
      labelCol: { xs: { span: 24 }, sm: { span: 6 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: num } },
    });
    const checkConfirm = (rule, value, callback) => {
      if (value) {
        validateFields(['confirm'], { force: true });
      }
      callback();
    };
    const checkPassword = (rule, value, callback) => {
      if (value && value !== getFieldValue('password')) {
        callback('两次输入的密码不一致');
      } else {
        callback();
      }
    };

    return (
      <Row>
        <Col xs={{ span: 22, offset: 1 }} sm={{ span: 18, offset: 3 }}>
          <h3>新用户注册</h3>
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout(12)} label="邮箱" hasFeedback>
              {getFieldDecorator('mail', {
                rules: [{
                  required: true, message: '请输入邮箱地址！',
                }, {
                  type: 'email', message: '邮箱地址格式错误！',
                }],
              })(
                <Input placeholder="邮箱" />
              )}
            </FormItem>
            <FormItem {...formItemLayout(12)} label="昵称" hasFeedback >
              {getFieldDecorator('nickname', {
                rules: [{
                  required: true,
                  message: '请输入昵称',
                  whitespace: true,
                }],
              })(
                <Input placeholder="个性户外小昵称，方便队友间互认" />)}
            </FormItem>
            <FormItem {...formItemLayout(12)} label="密码" hasFeedback>
              {getFieldDecorator('password', {
                rules: [{
                  required: true,
                  message: '密码至少6位',
                  min: 6,
                }, {
                  required: true,
                  message: '请设置用户密码',
                }, {
                  validator: checkConfirm,
                }],
              })(
                <Input type="password" placeholder="至少6位密码，区分大小写" />)}
            </FormItem>
            <FormItem {...formItemLayout(12)} label="密码确认" hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true,
                  message: '请设置用户密码',
                }, {
                  validator: checkPassword,
                }],
              })(
                <Input type="password" placeholder="确认密码" />)}
            </FormItem>
            <FormItem
              {...formItemLayout(12)}
              label={
                <span>真实姓名&nbsp;
                  <Tooltip title="户外属于高风险活动，需记录真实姓名。">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>}
              hasFeedback
            >
              {getFieldDecorator('realName', {
                rules: [{
                  required: true,
                  message: '请输入真实姓名',
                  whitespace: true,
                }],
              })(
                <Input placeholder="您的真实姓名" />)}
            </FormItem>
            <FormItem {...formItemLayout(12)} label="性别" id="gender">
              {getFieldDecorator('gender', {
                rules: [{
                  required: true,
                }],
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
            <FormItem {...formItemLayout(8)} label="电话号码">
              {getFieldDecorator('phone', {
                rules: [{
                  required: true, message: '请输入手机号！',
                }, {
                  pattern: /^1\d{10}$/, message: '手机号格式错误！',
                }],
              })(<Input placeholder="11位手机号" />)}
            </FormItem>
          </Form>
          <FormItem {...formItemLayout(12)} label="住址">
            {getFieldDecorator('address', {
              rules: [{
                required: true,
                message: '输入住址',
              }],
            })(<Input placeholder="常驻地址" />)}
          </FormItem>
          <FormItem
            {...formItemLayout(12)}
            label={(
              <span>紧急联系人&nbsp;
                <Tooltip title="户外属于高风险活动，需记录紧急联系人。紧急联系人不能互为同一个活动的成员。">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>)}
            hasFeedback
          >
            {getFieldDecorator('emergency', {
              rules: [{
                required: true,
                message: '请输入真实姓名',
                whitespace: true,
              }],
            })(
              <Input placeholder="紧急联系人" />)}
          </FormItem>
          <FormItem {...formItemLayout(8)} label="紧急联系人电话">
            {getFieldDecorator('emergencyPhone', {
              rules: [{
                required: true, message: '请输入手机号！',
              }, {
                pattern: /^1\d{10}$/, message: '手机号格式错误！',
              }],
            })(<Input placeholder="紧急联系人的11位手机号" />)}
          </FormItem>
          <FormItem {...formItemLayout(8)} label="QQ">
            {getFieldDecorator('QQ')(
              <Input />)}
          </FormItem>
          <FormItem {...formItemLayout(8)} label="微博">
            {getFieldDecorator('weibo')(
              <Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout(14)}
            label={
              <span>兴趣领域&nbsp;
                <Tooltip title="感兴趣的方面">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>}
          >
            {getFieldDecorator('role')(
              <Checkbox.Group options={roleOptions} />)}
          </FormItem>
          <FormItem {...formItemLayout(12)} label="个性签名" id="role">
            {getFieldDecorator('notes')(
              <TextArea placeholder="你想说的话" />)}
          </FormItem>
          <FormItem>
            <Row>
              <Col sm={{ offset: 6, span: 8 }}>
                <Button size="large" loading={register.submitting} className={styles.submit} type="primary" htmlType="submit">
              注册
                </Button>
                <Link className={styles.login} to="/user/login">使用已有账户登录</Link>
              </Col>
            </Row>
          </FormItem>
        </Col>
      </Row>);
  }
}
