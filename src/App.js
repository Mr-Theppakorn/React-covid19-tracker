import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import MapView from './Compopents/MapView';
import 'leaflet/dist/leaflet.css';
import './Css/App.scss'
import Axios from 'axios'
import ListView from './Compopents/ListView';
import DetailView from './Compopents/DetailView';

const api = 'https://coronavirus-tracker-api.herokuapp.com/v2/locations';

function App() {

  const [locationState, setLocationState] = useState([]);
  const [selectedLocattion, setSelectedLocattion] = useState(null);
  const [mapLocation, setMapLocation] = useState([13, 100]);

  function sortedData(locations) {
    return [...locations].sort((location1, location2) => {
      return location2.latest.confirmed - location1.latest.confirmed;
    });

  }

  const handleSelectLocation = useCallback(
    (id) => {
      const location = locationState.find(_location => _location.id === id);
      if (location === undefined) {
        setSelectedLocattion(null);
        return;
      }
      setSelectedLocattion(location);
      const { coordinates: { latitude, longitude } } = location;
      setMapLocation([latitude, longitude]);
    },
    [locationState],
  );

  const handleDeselectLocation = useCallback(
    () => {
      setSelectedLocattion(null);
    },
    [],
  );

  useEffect(() => {
    Axios.get(api).then(res => {
      const sortedDatas = sortedData(res.data.locations);
      setLocationState(sortedDatas);
    }).catch(error => {
      console.log(error);
    })
  }, []);

  let detaliView = null;
  if (selectedLocattion != null) {
    detaliView = <DetailView location={selectedLocattion} onClickClose={handleDeselectLocation} />

  }

  return (
    <div className="App">
      <ListView locationState={locationState} selectedLocattion={selectedLocattion} handleSelectLocation={handleSelectLocation} handleDeselectLocation={handleDeselectLocation} />
      <MapView locationState={locationState} positionNew={mapLocation} onSelectMarker={handleSelectLocation} />
      {detaliView}
    </div>
  );
}

export default App;
