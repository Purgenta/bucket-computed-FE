import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const sensorApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    endpoints: (builder) => ({
      getSensors: builder.query({
        query: () => 'sensor/readUniqueSensor',
      }),
      deleteSensorReadingByIntervalOptimized: builder.mutation({
        query: ({sensorId,interval}) => ({ url: `/sensor/deleteOptimized/${sensorId}/${interval}`,method: 'DELETE'}),
      }),
      deleteSensorReadingByIntervalUnoptimized: builder.mutation({
        query: ({sensorId,interval}) => ({ url: `/sensor/deleteUnoptimized/${sensorId}/${interval}`,method: 'DELETE'}),
      }),

      getSensorByIntervalOptimized: builder.query({
        query: ({sensorId,interval}) => ({ url: `/sensor/readOptimized/${sensorId}/${interval}` }),
      }),
      getSensorByIntervalUnoptimized: builder.query({
        query: ({sensorId,interval}) => ({ url: `/sensor/readUnoptimized/${sensorId}/${interval}` }),
      }),
      getAvgBySensorOptimized: builder.query({
        query: (sensorId) => ({ url: `sensor/averageOptimized/${sensorId}` }),
      }),
      getAvgBySensorUnoptimized: builder.query({
        query: (sensorId) => ({ url: `sensor/averageUnoptimized/${sensorId}` }),
      }),
      getResponseTimeBySensorAndInterval: builder.query({
        query: (sensorId,interval) => ({ url: `sensor/responseTime/${sensorId}/${interval}` }),
      }),
      getBenhmarkWrite: builder.query({
        query: () => `sensor/benchmarkWrite`,
      }),
      getOptimizedCollectionStats: builder.query({
        query: () => `sensor/optimizedCollectionStats`,
      }),
      unoptimizedCollectionStats: builder.query({
        query: () => `sensor/unoptimizedCollectionStats`,
      })

    }),
  })

export const { useGetSensorsQuery,useGetOptimizedCollectionStatsQuery,useUnoptimizedCollectionStatsQuery,useGetBenhmarkWriteQuery,useGetAvgBySensorOptimizedQuery,useDeleteSensorReadingByIntervalOptimizedMutation,useDeleteSensorReadingByIntervalUnoptimizedMutation,useGetSensorByIntervalOptimizedQuery,useGetSensorByIntervalUnoptimizedQuery,useGetAvgBySensorUnoptimizedQuery} = sensorApi
export default  sensorApi