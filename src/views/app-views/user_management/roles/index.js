import React, {useState} from 'react'
import {Table,Button,Card,Select, Input} from 'antd'
import Flex from 'components/shared-components/Flex'
import { PlusOutlined,FileExcelOutlined,SearchOutlined } from '@ant-design/icons';
import utils from 'utils'
import OrderListData from "assets/data/order-list.data.json"
import userData from "assets/data/user-list.data.json";
const { Option } = Select
export const Role = () => {
    const [list, setList] = useState(OrderListData)
    const [selectedRows, setSelectedRows] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const tableColumns = [
        {
            title: 'Name',
            dataIndex:'name'
        },
        {
            title: 'Mobile',
            dataIndex: 'mobile_number',
        },
        {
            title: 'Created On',
            dataIndex: 'created_at',
        },
        {
            title: 'Action',
            dataIndex: 'action',
        },
    ]
    const handleShowStatus = value => {
		if(value !== 'All') {
			const key = 'paymentStatus'
			const data = utils.filterArray(OrderListData, key, value)
			setList(data)
		} else {
			setList(OrderListData)
		}
	}
    const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value? list : OrderListData
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
		setSelectedRowKeys([])
	}
    const rowSelection = {
		onChange: (key, rows) => {
			setSelectedRows(rows)
			setSelectedRowKeys(key)
		}
	};
    return(
        
        <>
        <Card title="Roles">
            <Flex alignItems="center" justifyContent="space-between" mobileFlex={false}>
                <Flex className="mb-1" mobileFlex={false}>
					<div className="mr-md-3 mb-3">
						<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)}/>
					</div>
					<div className="mr-md-3 mb-3">
						<Select 
							defaultValue="All" 
							className="w-100" 
							style={{ minWidth: 180 }} 
							onChange={handleShowStatus} 
							placeholder="Status"
						>
							<Option value="All">All</Option>
							
						</Select>
					</div>
                    <div className="mb-3">
                    <Button type="primary" icon={<FileExcelOutlined/>} >Export</Button>
                    </div>
                    
                    <div className="mb-3">
                        
                    </div>
                    
				</Flex>
                <div className="mb-3">
                <Button type="primary" icon={<PlusOutlined/>} ghost>Add Role</Button>
				</div>
                
            </Flex>
            <div className="table-responsive">
				<Table 
					bordered
                    columns={tableColumns} 
					dataSource={list} 
					rowKey='id' 
					rowSelection={{
						selectedRowKeys: selectedRowKeys,
						type: 'checkbox',
						preserveSelectedRowKeys: false,
						...rowSelection,
					}}
				/>
			</div>
				
        </Card>
        </>
    )
}
export default Role;