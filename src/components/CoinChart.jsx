import { useState, useEffect } from 'react'
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale
} from 'chart.js'
import 'chartjs-adapter-date-fns'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale
);

const API_URL = import.meta.env.VITE_COIN_API_URL;

const CoinChart = ({ coinId }) => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        const fetchPrices = async () => {
            setLoading(true);
            try {
                const url = API_URL && API_URL.includes('/markets')
                    ? `${API_URL}&ids=${encodeURIComponent(coinId)}&days=7`
                    : `${API_URL}/${coinId}/market_chart?vs_currency=usd&days=7`;

                const res = await fetch(url);
                if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
                const data = await res.json();

                const prices = (data.prices || []).map((price) => ({
                    x: price[0],
                    y: price[1]
                }));

                if (!mounted) return;
                setChartData({
                    datasets: [
                        {
                            label: 'Price (USD)',
                            data: prices,
                            fill: true,
                            borderColor: '#007bff',
                            backgroundColor: 'rgba(0, 123, 255, 0.1)',
                            pointRadius: 0,
                            tension: 0.3,
                        }
                    ]
                });
            } catch (err) {
                console.error(err);
                if (mounted) setChartData(null);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        if (coinId) fetchPrices();
        return () => { mounted = false; };
    }, [coinId])

            if(loading) return <p>Loading...</p>

    return ( 

            <div style={{ marginTop: '30px' }}>
                <Line
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: { display: false }, // Hide the legend
                        tooltip: { mode: 'index', intersect: false }, // Tooltip appears when hovering near a point
                    },
                    scales: {
                    x: {
                    type: 'time', // Uses date-based axis
                    time: {
                        unit: 'day', // Each tick on the axis represents a day
                    },
                    ticks: {
                        autoSkip: true, // Skip ticks if there are too many
                        maxTicksLimit: 7, // Show at most 7 ticks
                    }
                    },  
                     y: {
                    ticks: {
                        callback: (value) => `$${value.toLocaleString()}`, // Format numbers like $25,000
                    },
                    }
                            },
                        }}
                />
            </div>
     );
}
 
export default CoinChart;