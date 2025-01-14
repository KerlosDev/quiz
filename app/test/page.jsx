'use client'
import React, { useEffect } from 'react'
import GlobalApi from '../api/GlobalApi'



const page = () => {

    useEffect(() => {
        datavar()
    },[])

    const datavar = () => {
        GlobalApi.testapi().then(res => {
            console.log(res)
        })
    }
    return (
        <div>

        </div>
    )
}

export default page