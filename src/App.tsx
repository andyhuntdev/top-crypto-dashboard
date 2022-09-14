import * as React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Shell from './components/Shell';
import Main from './components/Main';
import { createContext, useState, useEffect } from 'react';

const theme = extendTheme({
    colors: {
        brand: {
            100: '#D0E2FE',
            200: '#0F61FE',
            300: '#0F61FE',
            400: '#4688FF',
            500: '#0F61FE',
            600: '#0043CE',
            700: '#012C9C',
            800: '#001D6C',
            900: '#001141',
        },
    },
});

export const AppContext = createContext<any>({});

export const App = () => {
    const [marketData, setMarketData] = useState([]);
    const [globalData, setGlobalData] = useState({});
    const [selected, setSelected] = useState({});
    const [timeframe, setTimeframe] = useState(null);

    const getData = () => {
        fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1`
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => setMarketData(data))
            .catch((err) => {
                console.log(err.message);
            })
            .finally(() => {});

        fetch(`https://api.coingecko.com/api/v3/global`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => setGlobalData(data.data))
            .catch((err) => {
                console.log(err.message);
            })
            .finally(() => {});
    };

    useEffect(() => {
        getData();
        setInterval(() => {
            getData();
        }, 1000 * 60 * 3);
    }, []);

    useEffect(() => {
        if (marketData.length) {
            !Object.keys(selected).length && setSelected(marketData[0]);
        }
    }, [marketData]);

    return (
        <AppContext.Provider
            value={{ marketData, globalData, selected, setSelected, timeframe, setTimeframe }}
        >
            <ChakraProvider theme={theme}>
                <Shell>
                    <Main />
                </Shell>
            </ChakraProvider>
        </AppContext.Provider>
    );
};
