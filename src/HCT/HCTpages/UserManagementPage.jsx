import React, { useEffect, useState } from 'react'
import UserManagementComp from '../HCT components/UseManagement/UserManagementComp'
import { useNavigate } from 'react-router-dom'
import client from '../../API/api'

const UserManagementPage = () => {
    const [auth, setAuth] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        if (window.localStorage.getItem("access")) {
            setAuth(true)
        }
        else {
            setAuth(false)
            navigate("/")
        }
    })
    return (
        <div>
            {auth && <UserManagementComp />}
        </div>
    )
}

export default UserManagementPage
