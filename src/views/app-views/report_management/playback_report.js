import React, {useState} from 'react'
import {Table,Button,Card,Drawer,Select, Input,Form,DatePicker } from 'antd'
import Flex from 'components/shared-components/Flex'

import { PlusOutlined,FileExcelOutlined,SearchOutlined } from '@ant-design/icons';
import utils from 'utils'
import {MapContainer,TileLayer,Marker,Popup,LayersControl} from 'react-leaflet'
const { Option } = Select
const { RangePicker } = DatePicker;
const position = [11.0467, 76.9254];
const { BaseLayer } = LayersControl;
export const PlaybackHistory = () => {
  const [playback_data,setplayBackData] = useState([]);

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
      title: "Map View",
      dataIndex: "map_view",
    },
]
  const onFinish = values => {
    console.log('Success:', values);
  };
  const DateChange = (values) =>{
    alert("Selected Values "+values);
}
const Playback = (values) => {
alert(values);
console.log(values);
}
  return (
    <>
      <Card title="Playback History">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          mobileFlex={false}
        >
          <Flex className="mb-1" mobileFlex={false}>
            <div className="mr-md-6 mr-3">
              <Select
                showSearch
                defaultValue="Today"
                className="w-100"
                style={{ minWidth: 180 }}
                onChange={DateChange}
                name="date_selection"
              >
                <option value="1">Today</option>
                <option value="2">Last 7 Days</option>
                <option value="3">Last Month</option>
                <option value="4">Custom</option>
              </Select>
            </div>
            <div className="mr-md-3 mr-3">
              <RangePicker showTime name="date_range" onChange={DateChange} />
            </div>
            <div className="mr-md-3 mb-3">
              <Select
                mode="multiple"
                name="vehicle_id"
                onChange={DateChange}
                defaultValue="All"
                className="w-100"
                style={{ minWidth: 180 }}
                placeholder="Vehicle"
              >
                <Option value="1">TN01AB1234</Option>
                <Option value="2">TN02AB9874</Option>
              </Select>
            </div>

            <div className="mb-3">
              <Button
                type="primary"
                success
                icon={<SearchOutlined />}
                onClick={Playback}
              >
                Search
              </Button>
            </div>
          </Flex>
        </Flex>
        <div className="table-responsive">
          <Card>
            <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
              <LayersControl>
                <BaseLayer checked name="OpenStreetMap">
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                </BaseLayer>
                <BaseLayer name="Google-Street View">
                  <TileLayer
                    attribution="Google Maps"
                    url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
                  />
                </BaseLayer>
                <BaseLayer checked name="Google-Satelite">
                  <TileLayer
                    url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                    maxZoom={20}
                    subdomains={["mt1", "mt2", "mt3"]}
                  />
                </BaseLayer>
            </LayersControl>
          </MapContainer>
        </Card>
      </div>
    </Card>
    </>
  );
};

export default PlaybackHistory;
