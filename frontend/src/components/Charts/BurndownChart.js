import React from 'react';
import { useQuery } from '@apollo/client';
import { Line } from 'react-chartjs-2';
import { GET_BURNDOWN_DATA } from '../../graphql/queries';

const BurndownChart = ({ sprintId }) => {
    const { loading, error, data } = useQuery(GET_BURNDOWN_DATA, {
        variables: { sprintId },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const burndownData = data?.getBurndownData || [];

    const chartData = {
        labels: burndownData.map(day => day.date),
        datasets: [
            {
                label: 'Remaining Tasks',
                data: burndownData.map(day => day.remainingTasks),
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Burndown Chart</h2>
            <Line data={chartData} />
        </div>
    );
};

export default BurndownChart;
