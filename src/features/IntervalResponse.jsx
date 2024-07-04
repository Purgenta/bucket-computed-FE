import React,{useState,useEffect,useMemo} from 'react'
import { useGetSensorByIntervalUnoptimizedQuery,useGetSensorsQuery,useGetSensorByIntervalOptimizedQuery } from '../api/api';
import Select from 'react-select'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { intervalOptions } from './constants';
import { customStyles } from '../constants';
const IntervalResponse = () => {
    const [sensor,setSensor] = useState('')
    const [interval,setInterval] = useState('')
    const { data, error, isFetching, } = useGetSensorsQuery();
    const { data: optimizedData, error: optimizedError, isFetching: optimizedIsFetching, } = useGetSensorByIntervalOptimizedQuery({sensorId: sensor,interval},{skip: !Boolean(sensor) || !Boolean(interval)})
    const { data: unoptimizedData, error: unoptimizedError, isFetching: unoptimizedIsFetching, } = useGetSensorByIntervalUnoptimizedQuery({sensorId: sensor,interval},{skip: !Boolean(sensor) || !Boolean(interval)})
    const [optimizedResponseTimes,setOptimizedResponseTimes] = useState([])
    const [unoptimizedResponseTimes,setUnoptimizedResponseTimes] = useState([])
    useEffect(() => {
        if(optimizedData){
          setOptimizedResponseTimes((prev) => [...prev,optimizedData.time])
        }
      },[optimizedData])
    useEffect(() => {
        if(unoptimizedData){
          setUnoptimizedResponseTimes((prev) => [...prev,unoptimizedData.time])
        }
      },[unoptimizedData])
    
    const cmbxOptions = useMemo(() => data?.uniqueSensorReadings?.map((sensor) => ({
        value: sensor,
        label: sensor
    })),[data])

    const options = useMemo(() => ({
        title: {
          text: 'Response times for interval measurements'
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
          data: optimizedResponseTimes
        },
        {
          type: 'line',
          name: 'Unoptimized Response Times',
          data: unoptimizedResponseTimes
        }],

    }),[optimizedResponseTimes,unoptimizedResponseTimes])
 
  return (
    <div>
       <label>Select Sensor:</label><Select styles={customStyles} isDisabled={optimizedIsFetching || unoptimizedIsFetching} onChange={(newValue) => {
        setSensor(newValue.value)
      } } label={'Sensor options'} options={cmbxOptions}></Select>
       <label>Select Interval:</label>
      <Select styles={customStyles} isDisabled={optimizedIsFetching || unoptimizedIsFetching} onChange={(newValue) => {
        setInterval(newValue.value)
      } } label={'Interval options'} options={intervalOptions}></Select>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}/>
      </div>
  )
}

export default IntervalResponse