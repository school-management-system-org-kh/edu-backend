
import { Card } from 'antd';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const FeesDashboard = ({t}) => {

    // Sample data for the charts
    const barData = {
        labels: [
            t('April'),
            t('May'),
            t('June'),
            t('July'),
            t('August'),
            t('September'),
            t('October'),
            t('November'),
            t('December'),
            t('January'),
            t('February'),
            t('March'),
        ],
        datasets: [
            {
                label: t('Fees Collection'),
                data: [12000, 19000, 15000, 18000, 22000, 21000, 17000, 20000, 23000, 25000, 24000, 26000],
                backgroundColor: '#82ca9d',
            },
            {
                label: t('Expenses'),
                data: [8000, 12000, 10000, 11000, 15000, 13000, 12000, 14000, 16000, 17000, 15000, 18000],
                backgroundColor: '#ff4d4f',
            },
        ],
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: `${t("Amount")} ($)`,
                },
            },
        },
    };

    return (
        <Card
            title={`${t("Fees Collection & Expenses For Session") } 2024-2025`}
            style={{ height: '27.5rem' }}
        >
            <div style={{ height: '300px', display:'flex', justifyContent:'center' }}>
                <Bar data={barData} options={barOptions} />
            </div>
        </Card>
    );
};

export default FeesDashboard;