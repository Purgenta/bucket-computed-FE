import { useState,useMemo, useEffect } from 'react'
import Highcharts from 'highcharts'
import './App.css'
import { useGetSensorsQuery,useGetAvgBySensorOptimizedQuery,useGetAvgBySensorUnoptimizedQuery } from './api/api'
import Select from 'react-select'
import HighchartsReact from 'highcharts-react-official'
import IntervalResponse from './features/IntervalResponse'
import DeleteByInterval from './features/DeleteByInterval'
import BenchmarkWrite from './features/BenchmarkWrite'
import CollectionStats from './features/CollectionStats'
import { customStyles } from './constants'
function App() {
  const [optimizedResponseTimes,setOptimizedResponseTimes] = useState([])
  const [unoptimizedResponseTimes,setUnoptimizedResponseTimes] = useState([])
  const [sensor,setSensor] = useState('')
  const { data, error, isFetching, } = useGetSensorsQuery();
  const { data: optimizedData, error: optimizedError, isFetching: optimizedIsFetching, } = useGetAvgBySensorOptimizedQuery(sensor,{skip: !Boolean(sensor)});
  const { data: unoptimizedData, error: unoptimizedError, isFetching: unoptimizedIsFetching, } = useGetAvgBySensorUnoptimizedQuery(sensor,{skip: !Boolean(sensor)});

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

  const cmbxOptions = useMemo(() => data?.uniqueSensorReadings?.map((sensor) => {
    return {
      value: sensor,
      label: sensor
    }
  }))
  const avgTempResponseTimes = useMemo(() => {
    return {
      title: {
      text: 'Response times for avg measurements'
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
    }
  },[optimizedResponseTimes,unoptimizedResponseTimes])




  return (
  <div className="app">
    <h2>Selected sensor</h2>
      <Select styles={customStyles} isDisabled={optimizedIsFetching || unoptimizedIsFetching} onChange={(newValue) => {
        setSensor(newValue.value)
      } } label={'Sensor options'} options={cmbxOptions}></Select>
      <HighchartsReact
      highcharts={Highcharts}
      options={avgTempResponseTimes}

      />
      <h2>Sensor by interval</h2>
      <IntervalResponse/>
      <DeleteByInterval/>
      <BenchmarkWrite/>
      <CollectionStats/>
    </div>
  )
}

export default App
