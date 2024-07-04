import React, { useState,useEffect,useMemo } from 'react';
import Select from 'react-select';
import { useDeleteSensorReadingByIntervalOptimizedMutation,useDeleteSensorReadingByIntervalUnoptimizedMutation, useGetSensorsQuery } from '../api/api';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { intervalOptions } from './constants';
import { customStyles } from '../constants';

const DeleteByInterval = () => {
    const [sensor, setSensor] = useState(null);
    const [optimizedData, setOptimizedData] = useState([]);
    const [unoptimizedData, setUnoptimizedData] = useState([]);

    const handleSensorChange = (selectedOption) => {
        setSensor(selectedOption);
    };

    const handleIntervalChange = (selectedOption) => {
        setInterval(selectedOption);
    };


    const [interval, setInterval] = useState(null);

    const { data: sensors } = useGetSensorsQuery();

    const [deleteSensorReadingByIntervalOptimized,deleteSensorOptimizedResults] = useDeleteSensorReadingByIntervalOptimizedMutation();
    const [deleteSensorReadingByIntervalUnoptimized,deleteSensorUnoptimizedResults] = useDeleteSensorReadingByIntervalUnoptimizedMutation();

    useEffect(() => {
        if(deleteSensorOptimizedResults.data){
            setOptimizedData((prev) => [...prev,deleteSensorOptimizedResults.data.time])
        }
    },[deleteSensorOptimizedResults.data])
    useEffect(() => {
        if(deleteSensorUnoptimizedResults.data){
            setUnoptimizedData((prev) => [...prev,deleteSensorUnoptimizedResults.data.time])
        }
    },[deleteSensorUnoptimizedResults.data])

    const handleSubmit = (event) => {
        event.preventDefault();

        if (sensor && interval) {
            deleteSensorReadingByIntervalUnoptimized({
                sensorId: sensor.value,
                interval: interval.value
            })


            deleteSensorReadingByIntervalOptimized({
                sensorId: sensor.value,
                interval: interval.value
            })

            // Reset form fields
            setSensor(null);
            setInterval(null);
        }
    };
    const cmbxOptions = useMemo(() => sensors?.uniqueSensorReadings?.map((sensor) => ({
        value: sensor,
        label: sensor
    })),[sensors])

    const options = useMemo(( ) => ({
        title: {
            text: 'Response times for deleting by interval'
        },
        xAxis: {
            title: {
                text: 'Number of measurements'
            },
        },
        yAxis: {
            title: {
                text: 'Response (ms)'
            }
        },
        series: [{
            type: 'line',
            name: 'Optimized Response Times',
            data: optimizedData
        },
        {
            type: 'line',
            name: 'Unoptimized Response Times',
            data: unoptimizedData
        }],
    }),[optimizedData,unoptimizedData]);


    return (
        <div className='delete-by-interval'>
                  <h2>Delete by interval</h2>
            <form onSubmit={handleSubmit}>
                <label>Select Sensor:</label>
                <Select
                  styles={customStyles}
                  disabled={deleteSensorOptimizedResults.isLoading || deleteSensorUnoptimizedResults.isLoading}
                    value={sensor}
                    onChange={handleSensorChange}
                    options={cmbxOptions}
                />

                <label>Select Interval:</label>
                <Select
                styles={customStyles}
                    disabled={deleteSensorUnoptimizedResults.isLoading || deleteSensorOptimizedResults.isLoading}
                    value={interval}
                    onChange={handleIntervalChange}
                    options={intervalOptions}
                />
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />

                <button disabled={deleteSensorReadingByIntervalOptimized.isLoading || deleteSensorReadingByIntervalUnoptimized.isLoading}  type="submit">Delete Interval Data</button>
            </form>
        </div>
    );
};

export default DeleteByInterval;
