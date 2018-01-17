import React, { Component } from 'react';
import { Editor, EditorState } from 'draft-js';

export default class DraftEditor extends Component {
  state={
    editorState: EditorState.createEmpty(),
  };
  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  render() {
    return (
      <Editor editorState={this.state.editorState} onChange={this.onChange} />
    );
  }
}
