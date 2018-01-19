import React, { Component } from 'react';
import { Card, Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import RichEdiotr from '../../components/Editor/RichEditor';
import ReadOnlyEditor from '../../components/Editor/ReadOnlyEditor';
import SimpleEditor from '../../components/Editor/SimpleEditor/index';

export default class Demo extends Component {
  onHandle=() => {
    const demo = this.myEditor.getHtmlFromEditorState();
    console.log(demo);

    const demo2 = this.myEditor2.getHtmlFromEditorState();
    console.log(demo2);
  }
  render() {
    const html = ('<p>nizhidaosha</p>');
    return (
      <PageHeaderLayout
        title="demo"
        content="demo"
      >
        <Card
          title="进行中的项目"
          bordered={false}
        >
          <RichEdiotr ref={(myEditor) => { this.myEditor = myEditor; }} />
          <RichEdiotr ref={(myEditor) => { this.myEditor2 = myEditor; }} html={html} />
          <Button onClick={this.onHandle} >aaaaa</Button>
          <ReadOnlyEditor html={html} />
          <SimpleEditor ref={(myEditor) => { this.myEditor = myEditor; }} />

        </Card>
      </PageHeaderLayout>);
  }
}
