import React from 'react';
import Icon from "../../../../Icon/Icon";
import "./Rating.scss";
import useBEMNaming from "../../../../../common/useBEMNaming";

const defaultProps = {
    className: "rating"
}

export default function Rating(givenProps) {
    const props = {...defaultProps, ...givenProps};
    const {getBlock, getElement} = useBEMNaming(props.className);

    const [ratings, setRatings] = React.useState([
        {
            title: "Yes",
            element: "correct",
            icon: "check",
            checked: false
        },
        {
            title: "No",
            element: "incorrect",
            icon: "x",
            checked: false
        }
    ]);

    const makeRadioButton = (rating, index) => {
        const tabIndex = rating.checked ? 0 : (ratings.some(r => r.checked) || index > 0) ? -1 : 0;

        return (
            <div key={index} className={getElement(rating.element)} role="radio" aria-checked={rating.checked}
                 tabIndex={tabIndex} onClick={() => clickRating(index)}>
                <Icon icon={rating.icon}/>
                <span>{rating.title}</span>
            </div>
        )
    };

    const clickRating = (clickedIndex) => {
        const updatedRatings = ratings.map((rating, index) => {
            return {
                ...rating,
                checked: clickedIndex === index
            }
        });

        setRatings(updatedRatings);
    };

    const isChecked = ratings.some(rating => rating.checked);
    if (isChecked)
        return <div className={getElement("submitted")}>Thank you for your feedback!</div>

    return (
        <div className={getBlock()}>
            <div className={getElement('title')}>Are you satisfied with this result?</div>
            <div className={getElement('buttons')} role="radiogroup">
                {
                    ratings.map(makeRadioButton)
                }
            </div>
        </div>
    );
}