import {useState, useEffect} from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectCurrency from '../hooks/useSelectCurrency'
import { currencies } from '../data/currency'

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color:#FFFFFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Form = ({setCurrencies}) => {

    const [cryptos, setCryptos] = useState([])
    const [error, setError] = useState(false)

    const [currency, SelectCurrency] = useSelectCurrency('Select Currency', currencies);
    const [cryptocurrency, SelectCryptocurrency] = useSelectCurrency('Select Cryptocurrency', cryptos);
    
    useEffect(() => {
        const fetchApi = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

            const response = await fetch(url);
            const result = await response.json();

            const arrayCryptos = result.Data.map( crypto => {

                const object = {
                    id: crypto.CoinInfo.Name,
                    name: crypto.CoinInfo.FullName
                }
                return(object)
            })
            setCryptos(arrayCryptos);
        }
        fetchApi();
    }, [])

    const handleSubmit = e => {
        e.preventDefault();

        if([currency, cryptocurrency].includes('')){
            setError(true);

            return;
        }

        setError(false);
        setCurrencies({
            currency,
            cryptocurrency
        })
    }

    return (
        <>
            {error && <Error>All fields required</Error>}
            <form
                onSubmit={handleSubmit}
            >
                <SelectCurrency/>
                <SelectCryptocurrency/>

                <InputSubmit type="submit" value="Check" />
            </form>
        </>
    )
}

export default Form