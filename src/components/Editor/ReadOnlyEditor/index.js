import React, { PureComponent } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { htmlToEditorState } from '../utils';
import styles from './index.less';

export default class ReadOnlyEditor extends PureComponent {
  render() {
    const { html } = this.props;
    const contentState = htmlToEditorState(html);

    return (
      <Editor
        toolbarClassName={styles.editorToolbar}
        editorClassName={styles.editorEditor}
        readOnly
        defaultEditorState={contentState}
        toolbarHidden
      />
    );
  }
}
