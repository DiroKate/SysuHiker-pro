import React from 'react';
import { Input, Switch, Select, Form, InputNumber, Transfer, Checkbox } from 'antd';

export function itemInputNode(placeholder) { return (<Input placeholder={placeholder} />); }
export function itemDisabledNode() { return (<Input disabled />); }
export function itemPasswordInputNode(placeholder) { return (<Input type="password" placeholder={placeholder} />); }
export function itemInputNumberNode(step) { return (<InputNumber step={step} min={0} />); }
export function itemTextAreaNode(placeholder) {
  return (<Input.TextArea placeholder={placeholder} />);
}
export function itemSwitchNode() { return (<Switch />); }
export function itemSelectNode(options, placeholder) {
  return (
    <Select placeholder={placeholder}>
      {options.map(option => (
        <Select.Option value={option.key}>{option.value}</Select.Option>
      ))}
    </Select>);
}
export function itemTransferNode(options) {
  return (
    <Transfer
      {...options}
      render={yo => yo.title}
    />
  );
}
export function itemCheckboxNode(label = 'hahaha') {
  return (
    <Checkbox>
      {label}
    </Checkbox>
  );
}
export function getItem({
  id, label, reactNode, options, getFieldDecorator,
  hasFeedback = false,
  formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } } }) {
  if (label) {
    return (
      <Form.Item label={label} hasFeedback={hasFeedback} {...formItemLayout} >
        {getFieldDecorator(id, options)(reactNode)}
      </Form.Item>);
  } else {
    return (
      <Form.Item
        hasFeedback={hasFeedback}
        wrapperCol={
          { span: formItemLayout.wrapperCol.span, offset: formItemLayout.labelCol.span }}
      >
        {getFieldDecorator(id, options)(reactNode)}
      </Form.Item>);
  }
}
