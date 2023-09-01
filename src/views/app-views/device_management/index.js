import React,{useState,useEffect} from 'react'
import {Row,Col,Card,Table,Button,Drawer} from 'antd'

const Device = () => {
    const tableColumns = [
        {
          title: "S.No",
          dataIndex: "s_no",
        },
        {
          title: "Vehicle Name",
          dataIndex: "vehicle_name",
        },
        {
          title: "Start Date",
          dataIndex: "start_date",
        },
        {
          title: "End Date",
          dataIndex: "end_date",
        },
        {
          title: "Location",
          dataIndex: "location",
        },
        {
          title: "Duration",
          dataIndex: "duration",
        },
        {
          title: "Map View",
          dataIndex: "map_view",
        },
      ];


  return (
    <div className='table-responsive'>
      <Card title="Device List" >
        <Table tableColumns={tableColumns} >

        </Table>
      </Card>
    </div>
  )
}

export default Device
