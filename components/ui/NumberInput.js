import React from 'react';
import {Form, InputNumber} from 'antd';

export default function({label, value, onChange, min, max}) {
  return(
    <Form.Item label={label}>
      <InputNumber value={value} onChange={onChange} min={min} max={max} />
    </Form.Item>   
  )
}

