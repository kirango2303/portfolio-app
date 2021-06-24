import React, { useEffect, useRef } from 'react'
import CompanyCard from '../CompanyCard/CompanyCard'
import "./Filter.css"
import Topbar from '../../elements/topbar/Topbar'
const Filter = () => {
    return (
        <>
        <Topbar />
        <div className="container">
            <CompanyCard companyName="AAPL" width={1000}/>
            <CompanyCard companyName="MSFT" width={1000}/>
            <CompanyCard companyName="GOOGL" width={1000}/>
            <CompanyCard companyName="AMD" width={1000}/>
        </div>
        </>
    )
}

export default Filter
