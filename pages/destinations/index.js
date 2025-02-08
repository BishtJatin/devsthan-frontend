import React, { useEffect, useState } from 'react';

import styles from './destinations.module.css';
import { apiCall } from '../../utils/common';
import Link from 'next/link';
import DestinationCard from '../../components/destinationCard/destinationCard';

const Destinations = ({ destinations,destinationsBanner }) => {

  const [viewport, setViewport] = useState("desktop");

 
  const handleScrollParallax = () => {
    const parallaxImage = document.querySelector(`.${styles['parallax-image']}`);
    if (parallaxImage) {
      const scrollPosition = window.scrollY;
      parallaxImage.style.transform = `translateY(${scrollPosition * 0.5}px)`; // Adjust speed factor
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrollParallax);
    return () => window.removeEventListener('scroll', handleScrollParallax);
  }, []);
 

   useEffect(() => {
      const updateViewport = () => {
        if (window.matchMedia("(max-width: 768px)").matches) {
          setViewport("mobile");
        } else if (window.matchMedia("(max-width: 1024px)").matches) {
          setViewport("tablet");
        } else {
          setViewport("desktop");
        }
      };
  
      // Initial check
      updateViewport();
  
      // Listen for changes
      window.addEventListener("resize", updateViewport);
      return () => window.removeEventListener("resize", updateViewport);
    }, []);
  
  
    const getBannerImages = () => {
      switch (viewport) {
        case "mobile":
          return destinationsBanner?.data?.bannerUrls?.mobile || [];
        case "tablet":
          return destinationsBanner?.data?.bannerUrls?.tablet || [];
        case "desktop":
        default:
          return destinationsBanner?.data?.bannerUrls?.desktop || [];
      }
    };

    const bannerImages = getBannerImages();


  return (
    <div className={styles.container}>
     <header className={styles.header}>
        <div className={styles['parallax-container']}>

          <img src={bannerImages} alt="Destination Banner" className={styles['parallax-image']} />

        </div>
        <div className={styles.header_content}>
          {/* <h1 className={styles.title}>Destinations</h1>
          <nav>Home ➔ Destinations</nav> */}
        </div>
      </header>
      <div className={styles['header-text']}>
                <p className={styles['header-text-subtitle']}> Sacred Journeys</p>
                <h2 className={styles['header-text-title']}>Exploring the Worlds Holiest Destinations</h2>
      </div>
      <div className={styles.grid}>
        {destinations.map((destination, index) => (
          <Link href={`/destination/${destination.uuid}`} className={styles.card} key={index}>


           <DestinationCard destination={destination}/>
          </Link>

        ))}
      </div>
      {/* <div className={styles.pagination}>
        <span>01</span>
        <span>02</span>
        <button className={styles.nextButton}>&#10095;</button>
      </div> */}
    </div>
  );
};

export default Destinations;
export async function getStaticProps() {

  const destinations = await apiCall({
    endpoint: '/api/getAllDestinations',
    method: 'GET',

  });
  const destinationsBanner = await apiCall({
    endpoint: `/api/getBanner?page=destinationsBanner`,
    method: 'GET',

  });
  return {
    props: {

      destinations,
      destinationsBanner
    },
    revalidate: 600,

  };
}

