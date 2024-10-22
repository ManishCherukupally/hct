import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TemplateComp from '../HCT components/HCT Template/TemplateComp'
import client from '../../API/api'

const TemplatePage = () => {
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
            {auth && <TemplateComp />}
            {/* <TemplateComp /> */}
        </div>
    )
}

export default TemplatePage
