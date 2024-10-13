// frontend/src/components/PieChart.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const pieChartData = {
    labels: ['Vencido', 'Pagado', 'Pendiente'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3],
            backgroundColor: ['#E84949', '#45B0E4', '#46D73D'],
            hoverBackgroundColor: ['#E84949', '#45B0E4', '#46D73D'],
        },
    ],
};

const PieChart = () => {
    return <Pie data={pieChartData} />;
};

export default PieChart;