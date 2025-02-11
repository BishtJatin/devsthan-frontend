import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "../../components/itinery/itinery.module.css";
import Image from "next/image";
import styled from "styled-components";

const BannerInner = styled(Carousel)`
  .react-multiple-carousel__arrow{
    background : transparent;
  }

  `;

const Meals = ({ itinerary }) => {
  const [isClient, setIsClient] = useState(false);

  console.log(itinerary);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1, // Show one photo at a time
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className={styles["day-details-outer"]}>
      {/* Heading Section */}
      <div className={styles["day-details-heading"]}>
        <div className={styles["day-details-inner"]}>
          <p className={styles["day-details-dayheading"]}>Day {itinerary.day} :</p>
          <p>{itinerary.title}</p>
        </div>
      </div>

      {/* Day Details */}
      {itinerary?.siteSeen?.isAvailable ? (
        <>
          <div className={styles["day-details"]}>
            <div className={styles["content"]}>
              {/* Render SiteSeen Photos if Available */}
              {itinerary?.siteSeen?.photos?.length > 0 ? (
                <BannerInner
                  responsive={responsive}
                  infinite
                  autoPlay={itinerary.siteSeen.photos.length > 1}
                  autoPlaySpeed={5000}
                  arrows
                >
                  {itinerary.siteSeen.photos.map((photo, index) => (
                    <div key={index} className={styles["carousel-item"]}>
                      <Image
                        src={photo}
                        width={300}
                        height={300}
                        alt={`Day ${itinerary.day} - Image ${index}`}
                      />
                    </div>
                  ))}
                </BannerInner>
              ) : (
                // Fallback for No Photos
                <div >
                  <p>No photo available</p>
                </div>
              )}

              {/* Render Description */}
              {isClient && itinerary.description && (
                <p
                  className={styles["blog-card-description"]}
                  dangerouslySetInnerHTML={{
                    __html: itinerary.description,
                  }}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        // Fallback for No SiteSeen
        <div className={styles["no-hotel"]}>
          <p>No site seen included for this day</p>
        </div>
      )}
    </div>
  );
};

export default Meals;
