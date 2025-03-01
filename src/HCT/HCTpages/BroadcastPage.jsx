import React, { useEffect, useState } from 'react'
import BroadcastComp from '../HCT components/HCT Broadcast/BroadcastComp'
import { useNavigate } from 'react-router-dom'
import client from '../../API/api'

const BroadcastPage = () => {
    const [auth, setAuth] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        // client.get("pagination/", {
        //     withCredentials: true,
        //     params: {
        //         page: 1
        //     }
        // }).then((resp) => {
        //     console.log(resp.data)
        //     if (resp.data.status === 'unauthorized_user') {
        //         navigate("/")
        //     }
        //     else {
        //         setAuth(true)
        //     }
        // })

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
            {auth && <BroadcastComp />}
            {/* <BroadcastComp /> */}
        </div>
    )
}

export default BroadcastPage
