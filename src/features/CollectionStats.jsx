import React from 'react'
import { useGetOptimizedCollectionStatsQuery,useUnoptimizedCollectionStatsQuery } from '../api/api'
import Highcharts, { chart } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


const CollectionStats = () => {
    const { data: optimizedData, error: optimizedError, isFetching: optimizedIsFetching, } = useGetOptimizedCollectionStatsQuery();
    const { data: unoptimizedData, error: unoptimizedError, isFetching: unoptimizedIsFetching, } = useUnoptimizedCollectionStatsQuery();
    
    


    if(optimizedIsFetching || unoptimizedIsFetching){
        return <div>Loading...</div>
    }
    if(optimizedData === undefined || unoptimizedData === undefined){
        return <div>No data</div>
    }
    const {
        avgObjSize,
        capped,
        count,
        freeStorageSize,
        indexBuilds,
        nindexes,
        numOrphanDocs,
        scaleFactor,
        size,
        storageSize,
        totalIndexSize,
        totalSize
        } = optimizedData?.sensorReadingStats?.[0]?.storageStats
    const {

        capped: cappedUnoptimized,
        count: countUnoptimized,
        freeStorageSize: freeStorageSizeUnoptimized,
        indexBuilds: indexBuildsUnoptimized,
        nindexes: nindexesUnoptimized,
        numOrphanDocs: numOrphanDocsUnoptimized,
        scaleFactor: scaleFactorUnoptimized,
        size: sizeUnoptimized,
        storageSize: storageSizeUnoptimized,
        totalIndexSize: totalIndexSizeUnoptimized,
        totalSize: totalSizeUnoptimized,
        avgObjSize: avgObjSizeUnoptimized,

    } = unoptimizedData?.sensorReadingStats?.[0]?.storageStats


    const options = {
        chart: {
          type: 'bar'
        },
        title: {
          text: 'MongoDB Collection Stats Comparison'
        },
        xAxis: {
          categories: ['Average document size', 'Capped', 'Free Storage Size', 'Index Builds', 'Number of indexes', 'Scale Factor',  'Total index size', 'Total size']
        },
        yAxis: {
          title: {
            text: 'Value'
          }
        },
        series: [
          {
            name: 'Optimized',
            data: [avgObjSize, capped,  indexBuilds, nindexes, scaleFactor, size, storageSize, totalIndexSize]
          },
          {
            name: 'Unoptimized',
            data: [avgObjSizeUnoptimized, cappedUnoptimized,   indexBuildsUnoptimized, nindexesUnoptimized, numOrphanDocsUnoptimized, scaleFactorUnoptimized, totalIndexSizeUnoptimized, ]
          }
        ]
      };
    
    return <div>
            <div>
                <h2>Document count</h2>
            </div>
            <HighchartsReact highcharts={Highcharts} options={{
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Document count'
                },
                xAxis: {
                    title: {
                        text: 'Categories'
                    },
                },
                yAxis: {
                    title: {
                        text: 'Count'
                    }
                },
                series: [{
    
                    name: 'Optimized',
                    data: [optimizedData.sensorReadingStats.map((doc) => doc.storageStats.count)]
                },
                {
              
                    name: 'Unoptimized',
                    data: unoptimizedData.sensorReadingStats.map((doc) => doc.storageStats.count)
                }],
            
            }} />
             <div>
                <h2>Colection size</h2>
            </div>
            <HighchartsReact highcharts={Highcharts} options={{
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Collection size optimized vs unoptimized'
                },
                xAxis: {
                    title: {
                        text: 'Categories'
                    },
                },
                yAxis: {
                    title: {
                        text: 'Collection size in KB'
                    }
                },
                series: [{
    
                    name: 'Optimized',
                    data: [optimizedData.sensorReadingStats.map((doc) => doc.storageStats.size),optimizedData.sensorReadingStats.map((doc) => doc.storageStats.storageSize)]
                },
                {
              
                    name: 'Unoptimized',
                    data: [unoptimizedData.sensorReadingStats.map((doc) => doc.storageStats.size),unoptimizedData.sensorReadingStats.map((doc) => doc.storageStats.storageSize)]
                }],
            
            }} />
        </div>
}

export default CollectionStats