import React from 'react'
import {Card,Table} from 'antd'
const tableColumns = [
    {
        title:'S.No',
        dataIndex:'id'
    },
    {
        title:'Module',
        dataIndex:'module'
    },
    {
        title:'Parent Menu',
        dataIndex:'parent_menu'
    },
    {
        title:'Child Menu',
        dataIndex:'child_menu'
    },
    {
        title:'Permission',
        dataIndex:'permission'
    }
]
const Permission = () => {
  return (
    <>
    <Card title="Permissions">
        <Table bordered columns={tableColumns}></Table>
    </Card>
    </>
  )
}

export default Permission