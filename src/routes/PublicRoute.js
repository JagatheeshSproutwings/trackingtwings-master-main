import React  from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { AUTHENTICATED_ENTRY } from 'configs/AppConfig'

const PublicRoute = () => {

	const { token } = useSelector(state => state.auth)
	const role = localStorage.getItem('role');
	return token ? <Navigate to={AUTHENTICATED_ENTRY} /> : <Outlet/>
}

export default PublicRoute