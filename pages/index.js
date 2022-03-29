/* eslint-disable react/button-has-type */
import Head from 'next/head';
import React, { useState } from 'react';
import Image from 'next/image';
import ReactMapGL, { Marker, GeolocateControl, Popup } from 'react-map-gl';
import styles from '../styles/Home.module.css';

import {
  Navbar,
  ArtCard,
  ShowMarkers,
  ArtWidget,
  Categories,
  MapView,
} from '../components';
import { getArts } from '../services';

// eslint-disable-next-line react/prop-types
export default function Home({ arts }) {
  console.log(arts);
  const [selectedArt, setSelectedArt] = useState(null);

  const onMarkerClick = (e) => {
    console.clear();
    console.log(e);
    setSelectedArt(e);
  };

  const [showContent, setShowContent] = useState(false);

  const onShowContentClick = (e) => {
    console.clear();
    setShowContent((prev) => !prev);
    console.log(e);
  };

  return (
    <div className={styles.mainContainer}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={
          showContent
            ? `${styles.contentContainer} ${styles.showContent} `
            : `${styles.contentContainer}`
        }
      >
        <ArtWidget />
      </div>
      <div className={styles.mapContainer}>
        <MapView>
          <button
            onClick={(e) => onShowContentClick(e)}
            className={styles.mapButton}
          >
            {showContent ? 'Map View' : 'List View'}
          </button>
          <ShowMarkers
            selectedArt={selectedArt}
            data={arts}
            onClick={(e) => onMarkerClick(e)}
          />
          {selectedArt && (
            <Popup
              anchor="bottom"
              longitude={selectedArt.geolocation.longitude}
              latitude={selectedArt.geolocation.latitude}
              closeOnClick={false}
              onClose={() => setSelectedArt(null)}
              maxWidth="160px"
              offset={[0, -25]}
            >
              <div>
                <h2>{selectedArt.title}</h2>
                <img
                  src={selectedArt.mainImage.url}
                  alt={selectedArt.title}
                  width="100%"
                />
              </div>
            </Popup>

            // <div className="popupContainer">
            //   <div className="popupImage">IMAGE</div>
            //   <div className="popupInfo">Hello</div>
            // </div>
          )}
        </MapView>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const arts = (await getArts()) || [];

  return {
    props: { arts },
  };
}
