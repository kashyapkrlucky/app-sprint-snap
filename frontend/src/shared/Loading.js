import React from 'react';
import Layout from '../components/Layout';

const Loading = () => {
    return (
        <Layout>
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        </Layout>
    );
};

export default Loading;
