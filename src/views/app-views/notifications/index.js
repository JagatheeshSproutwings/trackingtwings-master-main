import React, { useEffect, useState } from "react";
import { Checkbox, List, Card, Row, Col } from "antd";
import Flex from "components/shared-components/Flex";
import api from "configs/apiConfig";

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];

const App = () => {
  const [checked, setChecked] = useState([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    setIndeterminate(checked.length && checked.length !== data.length);
    setCheckAll(checked.length === data.length);
  }, [checked]);

  const onCheckAllChange = (e) => {
    setChecked(e.target.checked ? data.map((item) => item.title) : []);
    setCheckAll(e.target.checked);
  };

  return (
    <Card title="Edit Device">
      <Flex>
        <div className="container">
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            Check all
          </Checkbox>
          <Row>
            <Col sm={4} md={8} lg={8}>
              <Checkbox.Group
                style={{ width: "100%" }}
                value={checked}
                onChange={(checkedValues) => {
                  setChecked(checkedValues);
                }}
              >
                <List
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Checkbox value={item.title} />}
                        title={<a href="https://ant.design">{item.title}</a>}
                      />
                    </List.Item>
                  )}
                />
              </Checkbox.Group>
            </Col>
          </Row>
          <div style={{ marginTop: 20 }}>
            <b>Selecting:</b> {checked.join(", ")}
          </div>
        </div>
      </Flex>
    </Card>
  );
};

export default App;
