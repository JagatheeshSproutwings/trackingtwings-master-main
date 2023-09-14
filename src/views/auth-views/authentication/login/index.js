import React from "react";
import LoginForm from "../../components/LoginForm";
import { Card, Row, Col,Avatar } from "antd";
import { useSelector } from "react-redux";
import { UserOutlined } from '@ant-design/icons';
import 'assets/styles/login_new.css'
const backgroundStyle = {
  backgroundImage: "url(/img/login_new.jpg)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const Login = (props) => {
  const theme = useSelector((state) => state.theme.currentTheme);
  return (
    <div className="h-100" style={backgroundStyle}>
      <div className="container d-flex flex-column justify-content-center h-100" style={{float:'right'}}>
        <Row justify="center" style={{backgroundColor:'transparent'}}>
          <Col xs={20} sm={20} md={20} lg={10}>
            <Card>
              <div className="my-4">
                <div className="text-center">
                <Avatar size={100} icon={<UserOutlined />} />
                  {/* <img
                    className="img-fluid"
                    src={`/img/${
                      theme === "light" ? "logo.png" : "logo-white.png"
                    }`}
                    alt=""
                  /> */}
                </div>
                <Row justify="center" >
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <LoginForm {...props} />
                  </Col>
                  
                </Row>
                
              </div>
            </Card>
            
          </Col>
          
        </Row>
        
      </div>
    </div>
  );
};

export default Login;
