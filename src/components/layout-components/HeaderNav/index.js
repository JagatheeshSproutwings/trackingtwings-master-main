/** @jsxImportSource @emotion/react */
import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TEMPLATE } from "constants/ThemeConstant";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Logo from "../Logo";
import NavProfile from "../NavProfile";
import Header from "./Header";
import HeaderWrapper from "./HeaderWrapper";
import Nav from "./Nav";
import NavNotification from "../NavNotification";
import NavSearch from "../NavSearch";
import SearchInput from "../NavSearch/SearchInput";
import NavEdge from "./NavEdge";
import NavItem from "../NavItem";
import { Button, List, Popover, Space } from "antd";
import { toggleCollapsedNav, onMobileNavToggle } from "store/slices/themeSlice";
import {
  NAV_TYPE_TOP,
  SIDE_NAV_COLLAPSED_WIDTH,
  SIDE_NAV_WIDTH,
} from "constants/ThemeConstant";
import utils from "utils";

export const HeaderNav = (props) => {
  const navigate = useNavigate();
  const { isMobile } = props;

  const [searchActive, setSearchActive] = useState(false);
  const token = useSelector((state) => state.auth);
  const role_id = token?.user_info?.role_id;
  const dispatch = useDispatch();

  const navCollapsed = useSelector((state) => state.theme.navCollapsed);
  const mobileNav = useSelector((state) => state.theme.mobileNav);
  const navType = useSelector((state) => state.theme.navType);
  const headerNavColor = useSelector((state) => state.theme.headerNavColor);
  const currentTheme = useSelector((state) => state.theme.currentTheme);

  const onSearchClose = () => {
    setSearchActive(false);
  };

  const onToggle = () => {
    if (!isMobile) {
      dispatch(toggleCollapsedNav(!navCollapsed));
    } else {
      dispatch(onMobileNavToggle(!mobileNav));
    }
  };
  const topMenuList = (
    <div style={{ maxWidth: 300 }}>
      <div>
        <List size="small" itemLayout="horizontal">
          <List.Item>
            <Link to="/app/stock_management/device">Device</Link>
          </List.Item>
          <List.Item>
            <Link to="/app/stock_management/sim">SIM</Link>
          </List.Item>
        </List>
      </div>
    </div>
  );
  const topLicenceMenuList = (
    <div style={{ maxWidth: 300 }}>
      <div>
        <List size="small" itemLayout="horizontal">
          <List.Item>
            <Link to="/app/points">Point</Link>
          </List.Item>
        </List>
      </div>
    </div>
  );
  const settings = (
    <div style={{ maxWidth: 300 }}>
      <div>
        <List size="small" itemLayout="horizontal">
          <List.Item>
            <Link to="/app/notifications">Notification Settings</Link>
          </List.Item>
        </List>
      </div>
    </div>
  );

  const isNavTop = navType === NAV_TYPE_TOP;
  const isDarkTheme = currentTheme === "dark";

  const navMode = useMemo(() => {
    if (!headerNavColor) {
      return utils.getColorContrast(isDarkTheme ? "#000000" : "#ffffff");
    }
    return utils.getColorContrast(headerNavColor);
  }, [isDarkTheme, headerNavColor]);

  const navBgColor = isDarkTheme
    ? TEMPLATE.HEADER_BG_DEFAULT_COLOR_DARK
    : TEMPLATE.HEADER_BG_DEFAULT_COLOR_LIGHT;

  const getNavWidth = () => {
    if (isNavTop || isMobile) {
      return "0px";
    }
    if (navCollapsed) {
      return `${SIDE_NAV_COLLAPSED_WIDTH}px`;
    } else {
      return `${SIDE_NAV_WIDTH}px`;
    }
  };

  useEffect(() => {
    if (!isMobile) {
      onSearchClose();
    }
  });

  return (
    <Header
      isDarkTheme={isDarkTheme}
      headerNavColor={headerNavColor || navBgColor}
    >
      <HeaderWrapper isNavTop={isNavTop}>
        <Logo logoType={navMode} />
        <Nav navWidth={getNavWidth()}>
          <NavEdge left>
            {isNavTop && !isMobile ? null : (
              <NavItem onClick={onToggle} mode={navMode}>
                <div className="d-flex align-items-center">
                  {navCollapsed || isMobile ? (
                    <MenuUnfoldOutlined className="nav-icon" />
                  ) : (
                    <MenuFoldOutlined className="nav-icon" />
                  )}
                </div>
              </NavItem>
            )}
            <div className="ant-menu-item ant-menu-item-only-child">
              <SearchInput size="small" mode={navMode} isMobile={isMobile} />
            </div>
          </NavEdge>

          <NavEdge right>
            {role_id != 6 && (
              <>
                <Space wrap>
                  <Popover content={topMenuList}>
                    <Button size="small" type="primary">
                      Stock Management
                    </Button>
                  </Popover>
                  <Popover content={topLicenceMenuList}>
                    <Button type="primary" size="small">
                      Licence Management
                    </Button>
                  </Popover>
                </Space>
              </>
            )}
            {role_id == 6 && (
              <>
                <Space wrap>
                  <Popover content={settings}>
                    <Button type="primary" size="small">
                      Settings
                    </Button>
                  </Popover>
                </Space>
              </>
            )}
            {/* <NavNotification mode={navMode} /> */}
            <NavProfile mode={navMode} />
          </NavEdge>
        </Nav>
      </HeaderWrapper>
    </Header>
  );
};

export default HeaderNav;
