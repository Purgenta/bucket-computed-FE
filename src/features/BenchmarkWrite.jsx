import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useGetBenhmarkWriteQuery } from '../api/api';

const BenchmarkWrite = () => {
    const [unoptimized, setUnoptimized] = useState([]);
    const [optimized, setOptimized] = useState([]);

    const { data: benchmarkWriteData,refetch } = useGetBenhmarkWriteQuery();

    useEffect(() => {
        if (benchmarkWriteData) {
            setOptimized((prev) => [...prev,benchmarkWriteData.timeOptimized]);
            setUnoptimized((prev) => [...prev,benchmarkWriteData.timeUnoptimized]);
        }
    },[benchmarkWriteData])

    const handleRefetch = () => {
        refetch();
    };
    const options = {
        title: {
            text: 'Benchmark Write'
        },
        xAxis: {
            title: {
                text: 'Number of measurements'
            },
        },
        yAxis: {
            title: {
                text: 'Time (ms)'
            }
        },
        series: [{
            type: 'line',
            name: 'Optimized Response Times',
            data: optimized
        },
        {
            type: 'line',
            name: 'Unoptimized Response Times',
            data: unoptimized
        }],
    };
    

    return (
        <div>
            <h2>Benchmark for adding new data randomly</h2>
            <HighchartsReact highcharts={Highcharts} options={options} />
            <button onClick={handleRefetch}>Trigger benchmark write</button>
        </div>
    );
};

export default BenchmarkWrite;