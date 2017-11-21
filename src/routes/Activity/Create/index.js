import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Card, Alert, Radio, List, Tag, Icon, Avatar, Button, Input } from 'antd';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from './index.less';


const FormItem = Form.Item;
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

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    const pageHeaderContent = (<Alert message="请认真填写活动详情。" type="warning" />);
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
            <FormItem
              {...formItemLayout}
              label="标题"
            >
              {getFieldDecorator('title', {
                rules: [{
                  required: true, message: '请输入标题',
                }],
              })(
                <Input placeholder="给目标起个名字" />
              )}
            </FormItem>
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
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
