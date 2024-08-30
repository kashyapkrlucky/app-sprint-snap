import React from "react";
import Chart from "react-apexcharts";
import Layout from '../components/Layout'

function ChartsPage() {
    const data = {
        options: {
            chart: {
                id: "Line"
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996]
            },
            colors: ['#dfdfdf', '#0099cc'],
            stroke: {
                width: 3,
                curve: 'stepline',
            }

        },
        series: [
            {
                type: 'line',
                name: "Actual",
                data: [25, 20, 15, 10, 5, 0],
            },
            {
                type: 'line',
                name: "covered",
                data: [25, 25, 25, 25, 10, 0],
            }
        ]
    };
    return (
        <Layout>
            <div className="p-4">
                {/* Header */}
                <header className="mb-6">
                    <h1 className="text-2xl font-bold">Charts</h1>
                    <p className="text-sm text-gray-500">This is the tagline.</p>
                </header>

                {/* Section One: Dropdown */}
                <section className="mb-6">
                    <div className="w-36">
                        <label htmlFor="dropdown" className="block text-sm font-medium text-gray-700">
                            Select sprint:
                        </label>
                        <select
                            id="dropdown"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                        </select>
                    </div>
                </section>

                {/* Section Two: Two Boxes */}
                <section className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-md border">
                        <h2 className="text-lg font-semibold">Burndown Chart</h2>
                        <Chart
                            options={data.options}
                            series={data.series}
                            type="line"
                        />
                    </div>
                    <div className="p-4 rounded-md border">
                        <h2 className="text-lg font-semibold">Velocity Chart</h2>
                        <Chart
                            options={data.options}
                            series={data.series}
                            type="line"
                        />
                    </div>
                </section>
            </div>
        </Layout>
    )
}

export default ChartsPage