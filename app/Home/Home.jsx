import { View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppCarousel from '../../components/Carousel/Carousel';
import UpComing from '../../components/UpComing/UpComing';
import TopRated from '../../components/TopRated/TopRated';
import TopBar from '../../components/TopBar/TopBar';
import Loading from '../../components/Loading/Loading';

const Home = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])
  
  return (
    <>
      {/* top bar */}
      <TopBar />

      {loading ? (
        <Loading />
      ) : (
        <ScrollView >
          {/* carousel */}
          <AppCarousel />

          {/* upcoming movies */}
          <UpComing />

          {/* top rated movies */}
          <TopRated />
        </ScrollView>
      )}
    </>
  )
}

export default Home