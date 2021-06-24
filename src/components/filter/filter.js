import React, { useEffect, useRef } from 'react'
import CompanyCard from '../CompanyCard/CompanyCard'
import "./Filter.css"
import Topbar from '../../elements/topbar/Topbar'
import axios from 'axios'

const URL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?region=US&symbols=ZBH,ZBRA,ZION,ZTS`

const Filter = () => {

    const callApi = async () => {
        try {
            const res = await axios.get(URL, { headers: { 
                "x-rapidapi-key": "8b18afce59msh40240d866aa4c6bp1a5a7ejsnbdd82173f217",
                "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
            }})
            console.log(res)
        }
        catch(err){
            console.log(err)
        }
    }
    
    return (
        <>
        <Topbar />
        <div className="container">
            {/* <CompanyCard companyName="AAPL" width={1000}/>
            <CompanyCard companyName="MSFT" width={1000}/>
            <CompanyCard companyName="GOOGL" width={1000}/>
            <CompanyCard companyName="AMD" width={1000}/> */}
            <button onClick={callApi}>call API</button>
        </div>
        </>
    )
}

export default Filter
