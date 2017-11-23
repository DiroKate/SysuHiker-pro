import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Card, Alert, Radio, DatePicker, Button, Input, message } from 'antd';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { eventTypeColor } from '../../../common/config';
import { editorStateToHtml, uploadImageCallBack } from '../../../utils/editor';
import styles from './index.less';


const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@Form.create()
@connect(state => ({
  submitting: state.activity.formSubmitting,
}))

export default class ActivityCreatePage extends PureComponent {
  state = {
    editorState: EditorState.createEmpty(),
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { contentValue, isEmpty } = editorStateToHtml(this.state.editorState);
        if (!isEmpty) {
          this.props.dispatch({
            type: 'activity/create',
            payload: {
              ...values,
              content: contentValue,
            },
          });
        } else {
          message.warning('请输入活动内容');
        }
      }
    });
  };

  render() {
    const { submitting } = this.props;
    const { getFieldDecorator } = this.props.form;
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
   * @param  {[String]} msg [表单的提示语]
   * @return {[type]}         [description]
   */
    const stringInputValidate = ({ label, id, msg, placeholder }) => (
      <FormItem {...formItemLayout} label={label} id={id} hasFeedback>
        {getFieldDecorator(id, {
          rules: [
            {
              required: true,
              msg,
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

    const pageHeaderContent = (<Alert message="请认真填写活动详情。" type="warning" />);

    /**
     * 活动标题
     */
    const title = stringInputValidate({
      label: '标题',
      id: 'title',
      msg: '请输入标题',
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
    const departure = (stringInputValidate({ label: '集合地点', id: 'departure', msg: '请输入集合地点' }));
    const arrivals = (stringInputValidate({ label: '目的地', id: 'arrivals', msg: '请输入目的地' }));
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
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
          }}
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
        />
      </FormItem>);

    const notes = (
      <FormItem {...formItemLayout} label="备注" id="notes" hasFeedback>
        {getFieldDecorator('notes')(
          <TextArea style={{ minHeight: 32 }} placeholder="活动备注" rows={4} />
        )}
      </FormItem>
    );
    const submitBtn = (
      <FormItem wrapperCol={{ span: 12, offset: 6 }} >
        <Button className={styles.submitBtn} type="primary" htmlType="submit" size="large" loading={submitting}>
          发布活动
        </Button>
      </FormItem>
    );

    formItems.push(title);
    formItems.push(activityType);
    formItems.push(arrivals);
    formItems.push(activityTime);
    formItems.push(maxPeople);
    formItems.push(departure);
    formItems.push(collectionTime);
    formItems.push(applyTime);
    formItems.push(activityContent);
    formItems.push(notes);
    formItems.push(submitBtn);

    return (
      <PageHeaderLayout
        title="创建活动"
        content={pageHeaderContent}
      >
        <Card bordered={false}>
          <Form
            hideRequiredMark
            style={{ marginTop: 8 }}
            onSubmit={this.handleSubmit}
          >
            {formItems}
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
