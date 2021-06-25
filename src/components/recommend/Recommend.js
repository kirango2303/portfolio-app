import React, { useState, useRef } from "react";
import './Recommend.css';
import axios from "axios"
import { Link, useHistory } from 'react-router-dom'
import CompanyCard from '../CompanyCard/CompanyCard'
import { Button, Form} from 'react-bootstrap';
import CompanyFinancials from "../CompanyFinancials/CompanyFinancials";
function Recommend() {
    const [query, setQuery] = useState('');
    const [similarStocks, setSimilarStocks] = useState([]);
    const [searchedStocks, setSearchedStocks] = useState('');
    const stocksRef = useRef()
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-recommendations?symbol=${query}`;
    const searchSimilarStocks = async () => {
        try {
            const res = await axios.get(url, {
                headers: {
                    "x-rapidapi-key": "a48948c3dbmsh0752220de3da440p119094jsnf7916aa82678",
                    "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
                }
            });

            setSimilarStocks(res.data.finance.result[0].quotes);
            console.log(res.data.finance.result[0].quotes);
        } catch (err) {
            console.log(err);
        }
    }
    console.log(similarStocks)

    const handleSubmitForm = (e) => {
        e.preventDefault()
        searchSimilarStocks()
        setSearchedStocks(stocksRef.current.value)
        stocksRef.current.value=""
  
      }
      console.log(searchedStocks) 
    return (
        <div className="body">

            <h1>Enter a Stocks Symbol</h1>
            <Form onSubmit={(e) => handleSubmitForm(e)}>
            <Form.Control className="Input" type="text" ref ={stocksRef} placeholder="i.e. AAPL"
                    value={query} onChange={(e) => setQuery(e.target.value)} />
                <Button className="Add-Stocks" type="submit">Find similar stocks</Button>
            </Form>

            <div className="company-container">
                <div>
                {similarStocks && similarStocks.map(stock => (
                    <CompanyCard companyName={stock.symbol} width={800} height={200}/>
                ))}
                </div>
                <div>
                   {searchedStocks && <CompanyFinancials companyName = {searchedStocks} width={500} height={800}/> }
                </div>
            </div>
        </div>
    );
}


export default Recommend
