import React from 'react';
import TourCard from '../tourCard/tourCard';

const ToursList = ({ tourData }) => {
  // Helper function to get the maximum price per person for a given season's pricing
  const getMaxPricePerPerson = (seasons) => {
    if (!seasons || seasons.length === 0) {
      return 0; // Default case when no seasons are available
    }

    const currentDate = new Date();

    // Find the season with the closest start date to the current date
    const closestSeason = seasons.reduce((closest, current) => {
      const currentStartDate = new Date(current.startDate);
      const closestStartDate = new Date(closest.startDate || Infinity);

      return Math.abs(currentStartDate - currentDate) < Math.abs(closestStartDate - currentDate)
        ? current
        : closest;
    });

    if (!closestSeason.pricing || closestSeason.pricing.length === 0) {
      return 0; // Return 0 if no pricing is found
    }

    // Find the maximum price in the closest season's pricing
    const maxPriceEntry = closestSeason.pricing.reduce((max, current) =>
      current.price > max.price ? current : max
    );

    // Calculate price per person
    return maxPriceEntry.price / maxPriceEntry.person;
  };

  return (
    <>
      {tourData.length > 0 &&
        tourData.map((data) => {
          let pricePerPerson = 0;

          if (data.batch && data.batch.length > 0) {
            // Use batch data if available
            const latestBatch = data.batch[data.batch.length - 1]; // Assuming the latest batch is the last in the array
            const {
              groupSharingPrice,
              minPeople,
            } = latestBatch;

            // Calculate price per person using minPeople
            if (groupSharingPrice && minPeople) {
              pricePerPerson = groupSharingPrice / minPeople;
            }
          } else if (data.isStandard) {
            // Fallback to season pricing logic
            pricePerPerson = getMaxPricePerPerson(data.standardDetails?.seasons);
          } else if (data.isDeluxe) {
            pricePerPerson = getMaxPricePerPerson(data.deluxeDetails?.seasons);
          } else if (data.isPremium) {
            pricePerPerson = getMaxPricePerPerson(data.premiumDetails?.seasons);
          }

          return (
            <TourCard
              key={data.uuid} // Add a unique key for each child in a list
              data={data}
              duration={data.duration}
              location={data.location}
              uuid={data.uuid}
              imageUrl={data.bannerImage}
              title={data.name}
              tourType={data.tourType}
              startingPrice={`Rs.${Math.floor(pricePerPerson)}`} // Show the calculated price
            />
          );
        })}
    </>
  );
};

export default ToursList;
