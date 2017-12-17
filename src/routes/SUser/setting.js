import React, { PureComponent } from 'react';
import { Form, Divider, Radio, Icon, Checkbox, Upload, Button } from 'antd';

import { itemInputNode, itemTextAreaNode, getItem } from '../../utils/formNode';
import { genderColor, roleOptions } from '../../common/config';

import styles from './Details.less';

@Form.create()
export default class SettingForm extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    const { onOk, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onOk(values);
      }
    });
  };

  render() {
    const { form, user } = this.props;
    const { getFieldDecorator } = form;

    const { user_avatar_url: imageUrl } = user;

    const uploadProps = {
      showUploadList: false,
      action: '/api/?service=Upload.Upload',
      accept: 'image/*',
      onSuccess(ret) {
        console.log('onSuccess', ret);
      },
      onError(err) {
        console.log('onError', err);
      },
    };

    const formItems = [];

    formItems.push(<Form.Item><h2>头像修改</h2></Form.Item>);
    formItems.push(
      <Upload
        {...uploadProps}
        className={styles['upload-avatar-uploader']}
      >
        {imageUrl ?
          <img src={imageUrl} alt="" className={styles['upload-avatar']} /> :
          <Icon type="plus" className={styles['upload-avatar-uploader-trigger']} />}
      </Upload>);


    formItems.push(<Divider style={{ marginBottom: 32 }} />);
    formItems.push(<Form.Item><h2>个人信息修改</h2></Form.Item>);

    formItems.push(getItem({
      getFieldDecorator,
      id: 'user_nick',
      label: '昵称',
      reactNode: itemInputNode('请输入昵称'),
      options: { initialValue: user.user_nick, rules: [{ required: true }] },
      hasFeedback: true }));
    formItems.push(getItem({
      getFieldDecorator,
      id: 'user_name',
      label: '真实姓名',
      reactNode: itemInputNode('请输入真实姓名'),
      options: { initialValue: user.user_name, rules: [{ required: true }] },
      hasFeedback: true }));
    formItems.push(getItem({
      getFieldDecorator,
      id: 'user_gender',
      label: '性别',
      options: { initialValue: user.user_gender, rules: [{ required: true }] },
      hasFeedback: true,
      reactNode: (
        <Radio.Group>
          <Radio value="GG">
            <Icon type="man" style={{ color: genderColor.GG }} />GG
          </Radio>
          <Radio value="MM">
            <Icon type="woman" style={{ color: genderColor.MM }} />MM
          </Radio>
        </Radio.Group>),
    }));

    formItems.push(getItem({
      getFieldDecorator,
      id: 'user_phone',
      label: '电话',
      reactNode: itemInputNode('请输入正确的电话号码'),
      options: { initialValue: user.user_phone,
        rules: [{
          pattern: /^[0-9]+$/,
          message: '请输入正确的电话号码',
        }, {
          required: true,
          message: 'Please input your phone number!',
        }],
      },
      hasFeedback: true }));
    formItems.push(getItem({
      getFieldDecorator,
      id: 'user_address',
      label: '住址',
      reactNode: itemInputNode('请输入常住地址'),
      options: { initialValue: user.user_address } }));
    formItems.push(getItem({
      getFieldDecorator,
      id: 'user_qq',
      label: 'QQ',
      reactNode: itemInputNode('请输入QQ号码'),
      options: { initialValue: user.user_qq } }));
    formItems.push(getItem({
      getFieldDecorator,
      id: 'user_weiboName',
      label: '微博',
      reactNode: itemInputNode('请输入微博名称'),
      options: { initialValue: user.user_weiboName } }));
    formItems.push(getItem({
      getFieldDecorator,
      id: 'user_weiboLink',
      label: '微博地址',
      reactNode: itemInputNode('如http://weibo.com/sysuhikers'),
      options: { initialValue: user.user_weiboLink } }));
    formItems.push(getItem({
      getFieldDecorator,
      id: 'user_interest',
      label: '兴趣领域',
      options: { initialValue: user.user_interest ?
        user.user_interest.split('+') : [] },
      reactNode: (<Checkbox.Group options={roleOptions} />),
    }));
    formItems.push(getItem({
      getFieldDecorator,
      id: 'user_comments',
      label: '个性签名',
      reactNode: itemTextAreaNode('显示在首页的个性签名'),
      options: { initialValue: user.user_comments } }));

    formItems.push(<Divider style={{ marginBottom: 32 }} />);
    formItems.push(<Form.Item><h2>紧急联系人</h2></Form.Item>);

    formItems.push(getItem({
      getFieldDecorator,
      id: 'user_urgentName',
      label: '联系人姓名',
      reactNode: itemInputNode('请输入联系人姓名'),
      options: { initialValue: user.user_urgentName, rules: [{ required: true }] },
      hasFeedback: true }));
    formItems.push(getItem({
      getFieldDecorator,
      id: 'user_urgentPhone',
      label: '紧急联系人电话',
      reactNode: itemInputNode('请输入正确的电话号码'),
      options: { initialValue: user.user_urgentPhone,
        rules: [{
          pattern: /^[0-9]+$/,
          message: '请输入正确的电话号码',
        }, {
          required: true,
          message: 'Please input your phone number!',
        }],
      },
      hasFeedback: true }));

    formItems.push(
      <Form.Item>
        <Button className={styles.updateFormSubmitBtn} type="primary" size="large" htmlType="submit">
        提交修改
        </Button>
      </Form.Item>);

    return (
      <Form layout="horizontal" onSubmit={this.handleSubmit}>
        {formItems}
      </Form>
    );
  }
}
