import { useContext } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ChartData,
    ChartArea,
    ChartOptions,
} from 'chart.js';
import { getCssVar } from '../utils';
import { AppContext } from '../App';
import 'chartjs-adapter-moment';

import { useColorModeValue, Box, Skeleton, Spinner } from '@chakra-ui/react';

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function CoinChart() {
    const chartRef = useRef<ChartJS>(null);

    const { timeframe, selected } = useContext(AppContext);

    const [chartData, setChartData] = useState<ChartData<'line'>>({ datasets: [] });
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        if (Object.keys(selected).length) {
            fetch(
                `https://api.coingecko.com/api/v3/coins/${selected.id}/market_chart?vs_currency=usd&days=${timeframe}`
            )
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw response;
                })
                .then((data) =>
                    setChartData({
                        datasets: [
                            {
                                data: data.prices,
                                backgroundColor: createGradient(),
                                borderColor: 'rgba(15, 97, 254, 1)',
                                fill: true,
                            },
                        ],
                    })
                )
                .catch((err) => {
                    console.log(err.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [timeframe, selected]);

    function createGradient() {
        if (!!chartRef.current) {
            const ctx: CanvasRenderingContext2D = chartRef.current.ctx;
            const area: ChartArea = chartRef.current.chartArea;
            const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
            gradient.addColorStop(0, 'rgba(15, 97, 254, 0)');
            gradient.addColorStop(1, 'rgba(15, 97, 254, 1)');
            return gradient;
        }
    }

    const [colorScheme, setColorScheme] = useState({
        white: '',
        black: '',
        lightGray: '',
        darkGray: '',
        middleGray: '',
    });

    useEffect(() => {
        setColorScheme({
            white: getCssVar('--chakra-colors-white'),
            black: getCssVar('--chakra-colors-black'),
            lightGray: getCssVar('--chakra-colors-gray-300'),
            darkGray: getCssVar('--chakra-colors-brand-700'),
            middleGray: getCssVar('--chakra-colors-gray-500'),
        });
    }, []);

    const chartOptions: ChartOptions = {
        maintainAspectRatio: false,
        animation: {
            duration: 1000,
        },
        responsive: true,
        scales: {
            x: {
                type: 'time',
                time: {
                    stepSize: 1,
                    minUnit: 'minute',
                },
                grid: {
                    display: true,
                    drawBorder: true,
                    color: 'rgba(255,255,255,0.0)',
                    tickColor: useColorModeValue(colorScheme.lightGray, colorScheme.darkGray),
                    borderColor: useColorModeValue(colorScheme.lightGray, colorScheme.darkGray),
                },
                ticks: {
                    color: colorScheme.middleGray,
                },
            },
            y: {
                grid: {
                    borderColor: useColorModeValue(colorScheme.lightGray, colorScheme.darkGray),
                    color: useColorModeValue(colorScheme.lightGray, colorScheme.darkGray),
                },
                ticks: {
                    color: colorScheme.middleGray,
                },
            },
        },
        elements: {
            point: {
                radius: 0,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                cornerRadius: 0,
                displayColors: false,
                padding: 12,
                backgroundColor: useColorModeValue(colorScheme.white, colorScheme.black),
                titleColor: useColorModeValue(colorScheme.black, colorScheme.white),
                bodyColor: useColorModeValue(colorScheme.black, colorScheme.white),
            },
        },
        interaction: {
            intersect: false,
        },
    };

    return timeframe && Object.keys(selected).length ? (
        <Box h={{base: '500px', md:"100%"}} position="relative">
            {loading && (
                <Spinner
                    position="absolute"
                    size="xl"
                    thickness="3px"
                    color="brand.500"
                    left="50%"
                    top="50%"
                    transform="translate(-50%, -50%)"
                />
            )}
            <Chart type="line" ref={chartRef} options={chartOptions} data={chartData} />
        </Box>
    ) : (
        <Skeleton h="100%" w="100%" />
    );
}
