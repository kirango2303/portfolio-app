import React, {useState} from "react";
import './Recommend.css';
import axios from "axios"
import { Link, useHistory } from 'react-router-dom'
import CompanyCard from '../CompanyCard/CompanyCard'

function Recommend(){
    const [query, setQuery] = useState('');
    const [similarStocks, setSimilarStocks] = useState([]);
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-recommendations?symbol=${query}`;
    const searchSimilarStocks = async (e) => {
        e.preventDefault(); 
        try {
            const res = await axios.get(url, { headers: {
                "x-rapidapi-key": "a48948c3dbmsh0752220de3da440p119094jsnf7916aa82678",
                "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
            }});
            
            setSimilarStocks(res.data.finance.result[0].quotes);
            console.log(res.data.finance.result[0].quotes);
        }catch(err){
            console.log(err);
        }
    }
    console.log(similarStocks)
    return (
        <div className="body">
        
        <h1>Enter a Stocks Symbol</h1>
            <form onSubmit={searchSimilarStocks}>
                <input type="text" name="query"
                    placeholder="i.e. AAPL"
                    value={query} onChange={(e) => setQuery(e.target.value)}
                    />
                <button className="Add-Stocks" type="submit">Find similar stocks</button>
            </form>
           

            <div className="company-container">
                {similarStocks && similarStocks.map(stock => (
                    <CompanyCard companyName={stock.symbol} width={1000}/>
                ))}
            </div>    
        </div>
    );
}


export default Recommend
