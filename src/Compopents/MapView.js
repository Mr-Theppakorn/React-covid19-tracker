import { divIcon } from 'leaflet';
import React from 'react';
import { TileLayer, MapContainer, Marker, Popup } from 'react-leaflet';

const iconExtra = {
    xxSmall: divIcon({ className: 'marker-icon pink', iconSize: [12, 12] }),
    xSmall: divIcon({ className: 'marker-icon pink', iconSize: [16, 16] }),
    small: divIcon({ className: 'marker-icon pink', iconSize: [24, 24] }),
    normal: divIcon({ className: 'marker-icon purple', iconSize: [32, 32] }),
    large: divIcon({ className: 'marker-icon purple', iconSize: [48, 48] }),
    xLarge: divIcon({ className: 'marker-icon red', iconSize: [72, 72] }),
    xxLarge: divIcon({ className: 'marker-icon red', iconSize: [96, 96] })
}

function MapView(props) {
    const { locationState, positionNew, onSelectMarker } = props;
    const theMarker = locationState.map(location => {
        const {
            id, country_code,
            country, province,
            coordinates: { latitude, longitude },
            latest: { confirmed }
        } = location;

        let markerIcon = iconExtra.xxSmall;
        if (confirmed >= 101 && confirmed <= 500) {
            markerIcon = iconExtra.xSmall;
        }
        else if (confirmed >= 501 && confirmed <= 1000) {
            markerIcon = iconExtra.small;
        }
        else if (confirmed >= 1001 && confirmed <= 5000) {
            markerIcon = iconExtra.normal;
        }
        else if (confirmed >= 1010 && confirmed <= 500) {
            markerIcon = iconExtra.large;
        }
        else if (confirmed >= 1010 && confirmed <= 500) {
            markerIcon = iconExtra.xLarge;
        }
        else if (confirmed >= 50001) {
            markerIcon = iconExtra.xxLarge;
        }

        let title = country;
        if (province !== '' && province !== country) {
            title = `${province}, ${country}`
        }


        return (
            <Marker key={`${id}-${country_code}`} position={[latitude, longitude]} icon={markerIcon} onClick={() => onSelectMarker(id)} >
                <Popup>{title}</Popup>
            </Marker>
        )
    });

    return (
        <MapContainer className="map-view" center={positionNew} zoom={5} >
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {theMarker}
        </MapContainer>
    )
}

export default MapView;
