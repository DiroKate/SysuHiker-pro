import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Card, Radio, Button, Input, message } from 'antd';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { bbsTypeOptions } from '../../../common/config';
import { editorStateToHtml, uploadImageCallBack } from '../../../utils/editor';
import styles from './index.less';

@Form.create()
@connect(state => ({
  submitting: state.teahouse.formSubmitting,
}))

export default class TeahouseCreatePage extends PureComponent {
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
            type: 'teahouse/create',
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
      labelCol: { xs: { span: 24 }, sm: { span: 3 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 20 } },
    };

    formItems.push(
      <Form.Item {...formItemLayout} label="标题" hasFeedback>
        {getFieldDecorator('title', {
          rules: [
            {
              required: true,
              message: '请输入标题',
              whitespace: true,
            },
          ],
        })(<Input />)}
      </Form.Item>);

    formItems.push(
      <Form.Item {...formItemLayout} label="分类" hasFeedback>
        {getFieldDecorator('type', {
          rules: [
            {
              required: true,
              message: '请选择文章类型',
            },
          ],
        })(
          <Radio.Group>
            {Object.keys(bbsTypeOptions).map(key => (
              <Radio value={key}>{key}</Radio>
            ))}
          </Radio.Group>)}
      </Form.Item>);

    formItems.push(
      <Form.Item {...formItemLayout} label="文章内容" hasFeedback>
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
            image: { uploadCallback: uploadImageCallBack },
          }}
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
        />
      </Form.Item>);
    formItems.push(
      <Form.Item {...formItemLayout} label="关键字" hasFeedback>
        {getFieldDecorator('keywords')(<Input placeholder={"',' 分隔"} />)}
      </Form.Item>);

    formItems.push(
      <Form.Item wrapperCol={{
        span: 12,
        offset: 6,
      }}
      >
        <Button className={styles.submitBtn} type="primary" htmlType="submit" size="large" loading={submitting}>
          发布话题
        </Button>

      </Form.Item>);

    return (
      <PageHeaderLayout
        title="创建话题"
        content="想写作业?想灌水?想发布攻略?想寻求其他帮助？发个贴吧！"
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
