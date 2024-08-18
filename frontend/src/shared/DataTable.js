import React, { useState } from 'react';

const DataTable = ({ columns, data }) => {
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    const handleSort = (column) => {
        const newDirection = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortColumn(column);
        setSortDirection(newDirection);
    };

    const sortedData = React.useMemo(() => {
        if (!sortColumn) return data;
        return [...data].sort((a, b) => {
            if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
            if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }, [sortColumn, sortDirection, data]);

    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    {columns.map((col) => (
                        <th
                            key={col}
                            onClick={() => handleSort(col)}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        >
                            {col}
                            {sortColumn === col && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {sortedData.map((row, index) => (
                    <tr key={index}>
                        {columns.map((col) => (
                            <td key={col} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {row[col]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default DataTable;