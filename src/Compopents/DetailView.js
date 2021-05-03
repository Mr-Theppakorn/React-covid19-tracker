import React from 'react'

const totalKeyState = ['confirmed', 'recovered', 'deaths'];

function DetailView(props) {

    const { location: { country, province, latest }, onClickClose } = props;

    let title = country;
    if (province !== '' && province !== country) {
        title = `${province}, ${country}`
    }

    const totalElements = totalKeyState.map(key => {
        const count = latest[key];
        return (
            <div key={key} className="columns">
                <div className="column">
                    <h6 className="title is-6">{key}</h6>
                </div>
                <div className="column">
                    <h6 className="title is-6">{count}</h6>
                </div>
            </div>

        )

    });


    return (
        <div className="details-view">
            <div className="details-view-close" onClick={onClickClose}>&times;</div>
            <div className="details-view-content">
                <h4 className="title is4">{title}</h4>
                {totalElements}
            </div>
        </div>
    );
}

export default DetailView;
