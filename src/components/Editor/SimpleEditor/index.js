import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { htmlToEditorState, editorStateToHtml, uploadImageCallBack } from '../utils';

import styles from './index.less';

export default class SimpleEditor extends Component {
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
    return (
      <Editor
        localization={{ locale: 'zh' }}
        toolbarClassName={styles.editorToolbar}
        wrapperClassName={styles.editorWrapper}
        editorClassName={styles.editorEditor}
        toolbarOnFocus
        toolbar={{
          options: ['inline', 'colorPicker', 'link', 'image', 'emoji', 'history'],
          inline: { inDropdown: true, options: ['bold', 'italic', 'underline'] },
          image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
        }}
        editorState={this.state.editorState}
        onEditorStateChange={this.onChange}
      />
    );
  }
}
