import React from 'react';
import {Col, Form, Row, Layout,Select} from 'antd';

export default function({label, value, onChange, data, key}) {
  console.log(arguments)
  return(
   <Form.Item label={label}>
    <Select value={value} onChange={onChange}>
      {
        data.map((item, index) => {
          return <Select.Option value={item.value} key={key || index}>{item.label}</Select.Option>
        })
      }
    </Select>
  </Form.Item>   
  )
}

