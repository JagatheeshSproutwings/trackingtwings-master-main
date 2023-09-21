import React, { useState } from 'react';
import { Dropdown, Avatar } from 'antd';
import { useDispatch,useSelector } from 'react-redux'
import { 
	UserOutlined,
	EditOutlined, 
	SettingOutlined, 
	ShopOutlined, 
	QuestionCircleOutlined, 
	LogoutOutlined 
} from '@ant-design/icons';
import NavItem from './NavItem';
import Flex from 'components/shared-components/Flex';
import { signOut } from 'store/slices/authSlice';
import styled from '@emotion/styled';
import { FONT_WEIGHT, MEDIA_QUERIES, SPACER, FONT_SIZES } from 'constants/ThemeConstant'


const Icon = styled.div(() => ({
	fontSize: FONT_SIZES.LG
}))
const Profile = styled.div(() => ({
	display: 'flex',
	alignItems: 'center'
}))

const UserInfo = styled('div')`
	padding-left: ${SPACER[2]};

	@media ${MEDIA_QUERIES.MOBILE} {
		display: none
	}
`

const Name = styled.div(() => ({
	fontWeight: FONT_WEIGHT.SEMIBOLD
}))

const Title = styled.span(() => ({
	opacity: 0.8
}))

// const MenuItem = (props) => (
// 	<Flex as="a" href={props.path} alignItems="center" gap={SPACER[2]}>
// 		<Icon>{props.icon}</Icon>
// 		<span>{props.label}</span>
// 	</Flex>
// )

const MenuItemSignOut = (props) => {
    //const token = useSelector(state => state.auth);

	const dispatch = useDispatch();
	
	const handleSignOut = () => {
		localStorage.clear()
		dispatch(signOut())
		
	}
	
	return (
		<div onClick={handleSignOut}>
			<Flex alignItems="center" gap={SPACER[2]} >
				<Icon>
					<LogoutOutlined />
				</Icon>
				<span>{props.label}</span>
			</Flex>
		</div>
	)
}

const items = [
	{
		key: 'Sign Out',
		label: <MenuItemSignOut label="Sign Out" />,
	}
]

export const NavProfile = ({mode}) => {
	const token = useSelector(state => state.auth);
	console.log(token);
	const [username,setUsername] = useState(localStorage.getItem('name') || token?.user_info?.name);
	const [useremail,setUseremail] = useState(localStorage.getItem('email_address') || token?.user_info?.email);
	return (
		
		<Dropdown placement="bottomRight" menu={{items}} trigger={["click"]}>
			<NavItem mode={mode}>
				<Profile>
					<Avatar style={{
        backgroundColor: '#87d068',
      }} size={{
      xs: 24,
      sm: 25,
      md: 27,
      lg: 30,
      xl: 35,
      xxl: 40,
    }} icon={<UserOutlined />}  />
					<UserInfo className="profile-text">
						<Name>{username}</Name>
						<Title>{useremail}</Title>
					</UserInfo>
				</Profile>
			</NavItem>
		</Dropdown>
	);
}

export default NavProfile
