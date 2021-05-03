import React from 'react';

const totalKeyState = ['confirmed', 'recovered', 'deaths'];

function ListView(props) {

    const { locationState, selectedLocattion, handleSelectLocation, handleDeselectLocation } = props;

    function onClickItem(id) {
        if (selectedLocattion === null) handleSelectLocation(id);
        else if (selectedLocattion.id != id) handleSelectLocation(id);
        else handleDeselectLocation();

    }

    const totalElements = totalKeyState.map(key => {
        const sum = locationState.reduce((sum, location) => {
            return sum + location.latest[key];
        }, 0)
        return (
            <div key={key} className="columns">
                <div className="column">
                    <h6 className="title is-6">{key}</h6>
                </div>
                <div className="column">
                    <h6 className="title is-6">{sum}</h6>
                </div>
            </div>
        )

    });

    const locationElement = locationState.map(location => {
        const {
            id, country_code,
            country, province,
            latest: { confirmed }
        } = location;

        let title = country;
        if (province !== '' && province !== country) {
            title = `${province}, ${country}`
        }

        let locationClass = 'list-view-location';
        if (selectedLocattion !== null) {
            if (location.id === selectedLocattion.id) {
                locationClass += ' selected';
            }
        }

        return (
            <div key={`${id}-${country_code}`} className={locationClass} onClick={() => onClickItem(id)}>
                <div className="columns">
                    <div className="column">
                        <h6 className="title is-6 ">{title}</h6>
                    </div>
                    <div className="column">
                        <h6 className="title is-6">{confirmed}</h6>
                    </div>
                </div>
            </div>
        )
    });

    return (
        <div className="list-view">
            <div className="list-view-brand">
                <h2 className="title is-4">Covid-19 Tracker</h2>
            </div>
            <div className="list-view-total">
                <h2 className="title is-4">Total</h2>
                {totalElements}
            </div>
            <div className="list-view-locations">
                {locationElement}
            </div>
        </div>
    )
}

export default ListView;
