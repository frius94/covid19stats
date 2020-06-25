import React from "react";

type Props = {
    title: string
    data: number | undefined
}

export const Card: React.FC<Props> = (props) => {

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.data}</p>
            </div>
        </div>
    );
};