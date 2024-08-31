import { RouterProvider } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'
import router from './libs/routes'
import { Helmet } from "react-helmet";
import ToUp from './components/ToUp';
import useSWR from 'swr';
import { client } from './libs/api';
import { act, useEffect } from 'react';
import { action } from './libs/store';

function App() {
  const {
    data: healthCheckData,
    error: healthCheckError,
    isLoading: healthCheckLoading
  } = useSWR('health-check', () => client.handleHealthCheck(), {
    refreshInterval: 30
  })

  

  useEffect(() => {
    action("SET_STATUS", healthCheckData?.status)
    action("SET_META_DATA", healthCheckData?.metaData)
  }, [healthCheckData]);

  useEffect(() => {
    if (healthCheckError) {
      action("SET_STATUS", "ERROR")
    }
  } 
  , [healthCheckError]);

  return (
    <>
      <Helmet>
        <title>Test Case - Eray Aydın</title>
        <meta name="description" content="The Rick and Morty API" />
        <meta
          name="keywords"
          content="Rick and Morty, API, Characters, Locations, Episodes"
        />
        <meta name="author" content="github.com/LuckyEden" />
        
        {/*Social Media Meta Tags*/}
        <meta property="og:title" content="The Rick and Morty API" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rickandmortyapi.com" />
        <meta property="og:description" content="The Rick and Morty API" />
        <meta property="og:site_name" content="The Rick and Morty API" />

      </Helmet>

      <RouterProvider
        router={router}
      />

      <Tooltip id="tooltip-globe" place="top"
        style={{
          zIndex: 9999
        }}
      />

      <ToUp />
    </>
  )
}

export default App
