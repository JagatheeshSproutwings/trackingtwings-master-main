import React, { useEffect, useState } from "react";
import { Card, Table, Button, notification } from "antd";
import api from "configs/apiConfig";

const App = () => {
  const [alerttypes, setAlertTypes] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const GetData = () => {
    console.log(selectedRowKeys);
    SaveAlertTypes(selectedRowKeys);
  };

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("id") || ""
  );

  const loadAlertTypes = async () => {
    try {
      const user_data = { user_id: currentUser };
      const response = await api.post("alert_notifications_list", user_data);

      if (response.data && Array.isArray(response.data.data)) {
        const processedData = response.data.data.map((item) => ({
          alert_type_id: item.alert_type_id,
          alert_type: item.alert_type,
          user_status: item.user_status,
          key: item.alert_type_id,
        }));

        // Create an array of alert_type_ids where user_status is 1
        const selectedKeys = processedData
          .filter((item) => item.user_status === 1)
          .map((item) => item.alert_type_id);

        setSelectedRowKeys(selectedKeys); // Set selectedRowKeys
        setAlertTypes(processedData);
      } else {
        console.error("API request was not successful");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const SaveAlertTypes = async (selectedRowKeys) => {
    try {
      const user_data = {
        user_id: currentUser,
        alert_type_id: selectedRowKeys,
      };
      const response = await api.post("alert_notification/update", user_data);
      openNotification(
        "success",
        "Alert",
        "Alert Configuration Updated Successfully!"
      );
      loadAlertTypes();
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const tableColumns = [
    {
      title: "Name",
      dataIndex: "alert_type_id",
      key: "alert_type_id",
    },
    {
      title: "Mobile",
      dataIndex: "alert_type",
      key: "alert_type_id",
    },
    {
      title: "Status",
      dataIndex: "user_status",
      render: (user_status) => (
        <input type="checkbox" checked={user_status === 1} />
      ),
    },
  ];

  useEffect(() => {
    setCurrentUser(localStorage.getItem("id") || "");
    loadAlertTypes();
  }, []);

  return (
    <Card title="Alert Configuration">
      <Button onClick={GetData}>Update</Button>
      <Table
        size="small"
        bordered
        columns={tableColumns}
        dataSource={alerttypes}
        rowKey="key"
        rowSelection={{
          selectedRowKeys: selectedRowKeys,
          type: "checkbox",
          preserveSelectedRowKeys: false,
          ...rowSelection,
        }}
      />
    </Card>
  );
};

export default App;
