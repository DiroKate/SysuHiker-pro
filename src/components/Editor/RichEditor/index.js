import React, { Component } from 'react';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { htmlToEditorState, editorStateToHtml, uploadImageCallBack } from '../utils';

import styles from './index.less';

export default class RichEdiotr extends Component {
  state={
    editorState: EditorState.createEmpty(),
  };
  componentWillMount() {
    const { html } = this.props;
    const editorState = htmlToEditorState(html);
    this.setState({
      editorState,
    });
  }
  onChange=(editorState) => {
    this.setState({
      editorState,
    });
  };
  getHtmlFromEditorState=() => {
    return editorStateToHtml(this.state.editorState);
  };

  render() {
    const defaultState = ContentState.createFromText('请输入内容。。。');
    return (
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

        editorState={this.state.editorState}
        defaultEditorState={EditorState.createWithContent(defaultState)}
        onEditorStateChange={this.onChange}
      />
    );
  }
}
