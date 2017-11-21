import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Card, Alert, Radio, DatePicker, Tag, Icon, Avatar, Button, Input } from 'antd';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { eventTypeColor } from '../../../common/config';
import styles from './index.less';


const FormItem = Form.Item;
const { RangePicker } = DatePicker;

@Form.create()
@connect(state => ({
  activity: state.activity,
}))

export default class ActivityCreatePage extends PureComponent {
  state = {
    editorState: EditorState.createEmpty(),
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { editorState } = this.state;
    const formItems = [];

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
        md: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
        md: { span: 16 },
      },
    };

    /**
   * 表单项：字符串Input组件的表单项
   * @param  {[String]} label   [表单名称]
   * @param  {[ID]} id      [表单ID]
   * @param  {[String]} message [表单的提示语]
   * @return {[type]}         [description]
   */
    const stringInputValidate = ({ label, id, message, placeholder }) => (
      <FormItem {...formItemLayout} label={label} id={id} hasFeedback>
        {getFieldDecorator(id, {
          rules: [
            {
              required: true,
              message,
              whitespace: true,
            },
          ],
        })(
          <Input placeholder={placeholder} />)}
      </FormItem>
    );

    const datePickProps = {
      format: 'YYYY-MM-DD HH:mm',
      showTime: {
        format: 'HH:mm',
      },
    };
    const rangeConfig = {
      rules: [
        {
          type: 'array',
          required: true,
          message: '请选择时间段。',
        },
      ],
    };
    const rangePickerValidate = ({ label, id }) => (
      <FormItem {...formItemLayout} label={label} id={id}>
        {getFieldDecorator(id, rangeConfig)(
          <RangePicker {...datePickProps} />)}
      </FormItem>
    );

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    const pageHeaderContent = (<Alert message="请认真填写活动详情。" type="warning" />);

    /**
     * 活动标题
     */
    const title = stringInputValidate({
      label: '标题',
      id: 'title',
      message: '请输入标题',
      placeholder: '给活动起个名字',
    });

    /**
     * 活动类型
     */
    const activityType = (
      <FormItem {...formItemLayout} label="活动类型" id="activityType" hasFeedback>
        {getFieldDecorator('activityType', {
           rules: [
             {
               required: true,
               message: '请选择活动类型',
             },
           ],
         })(
           <Radio.Group>
             {
                Object.keys(eventTypeColor).map(value => (
                  <Radio value={value}>{value}</Radio>
                ))
              }
           </Radio.Group>)}
      </FormItem>
    );

    /**
     * 出发地，目的地
     */
    const departure = (stringInputValidate({ label: '集合地点', id: 'departure', message: '请输入集合地点' }));
    const arrivals = (stringInputValidate({ label: '目的地', id: 'arrivals', message: '请输入目的地' }));
    /**
     * 活动时间
     */
    const activityTime = (rangePickerValidate({ label: '活动时间', id: 'activityTime' }));
    /**
     * 报名人数上限
     */
    const maxPeople = (
      <FormItem
        labelCol={{ xs: { span: 24 }, sm: { span: 3 }, md: { span: 4 } }}
        wrapperCol={{ xs: { span: 24 }, sm: { span: 3 } }}
        label="人数上限"
        id="maxPeople"
        hasFeedback
      >
        {getFieldDecorator('maxPeople', {
               rules: [
                 {
                   required: true,
                   messge: '请输入活动最大人数',
                 }, {
                   type: 'string',
                   pattern: /^[0-9]+$/,
                   message: '请输入数字',
                 },
               ],
             })(
               <Input />)}
      </FormItem>
    );

    /**
     * 集合时间
     */
    const collectionTime = (
      <FormItem {...formItemLayout} label="集合时间" id="collectionTime" hasFeedback>
        {getFieldDecorator('collectionTime', {
           rules: [
             {
               type: 'object',
               required: true,
               messge: '请输入集合时间',
             },
           ],
         })(
           <DatePicker {...datePickProps} />)}
      </FormItem>
    );
    /**
     * 报名时间
     */
    const applyTime = (rangePickerValidate({ label: '报名时间', id: 'applyTime' }));


    /**
     * 活动内容
     */
    const activityContent = (
      <FormItem
        {...formItemLayout}
        label="活动内容"
        hasFeedback
      >
        <Editor
          localization={{ locale: 'zh' }}
          toolbarClassName={styles.editorToolbar}
          wrapperClassName={styles.editorWrapper}
          editorClassName={styles.editorEditor}
          toolbar={{
          inline: {
              inDropdown: true,
            },
            list: {
              inDropdown: true,
            },
            textAlign: {
              inDropdown: true,
            },
            link: {
              inDropdown: true,
            },
            history: {
              inDropdown: true,
            },
          }}
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
        />
      </FormItem>);


    formItems.push(title);
    formItems.push(activityType);
    formItems.push(arrivals);
    formItems.push(activityTime);
    formItems.push(maxPeople);
    formItems.push(departure);
    formItems.push(collectionTime);
    formItems.push(applyTime);
    formItems.push(activityContent);

    return (
      <PageHeaderLayout
        title="创建活动"
        content={pageHeaderContent}
      >
        <Card bordered={false}>
          <Form
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            {formItems}

          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
