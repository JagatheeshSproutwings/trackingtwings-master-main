import { Row,Form, Col,Button,Card,Input} from 'antd'

import React from 'react'

function IdleReport() {
  const onFinish = values => {
    console.log('Success:', values);
  };
 
  return (
    
    <>
    <Row gutter={12}>
        <Col xl={24}>
          <Card title="Idle Form">
            <Row gutter={16}> 
              <Form name="demo-form" onFinish={onFinish}>
              <Form.Item
            name="month"
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 'calc(50% - 5px)' }}
          >
            <Input placeholder="Input birth month" />
          </Form.Item>
              <Form.Item label=" " colon={false}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
              </Form>
            </Row>
          </Card>
        </Col>
    </Row>
    </>
  )
}

export default IdleReport