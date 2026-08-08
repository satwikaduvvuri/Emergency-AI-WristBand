function LocationCard({ location }) {
  return (
    <div className="card">
      <h2>📍 Live Location</h2>

      <p>
        <strong>Latitude:</strong>{" "}
        {location?.latitude || "Fetching..."}
      </p>

      <p>
        <strong>Longitude:</strong>{" "}
        {location?.longitude || "Fetching..."}
      </p>

      {location?.latitude && location?.longitude && (
        <a
          href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
          target="_blank"
          rel="noreferrer"
        >
          🌍 Open in Google Maps
        </a>
      )}
    </div>
  );
}

export default LocationCard;