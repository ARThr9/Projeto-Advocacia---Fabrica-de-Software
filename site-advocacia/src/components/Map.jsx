import React from "react";

function Map({ embedUrl }) {
  return (
    <div className="map-container">
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        referrerPolicy="no-referrer-when-downgrade"
        title="Localização do Escritório no Google Maps"
      ></iframe>
    </div>
  );
}

export default Map;
