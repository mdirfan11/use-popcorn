import { useState } from "react";
import Star from "./Star";
import PropTypes from "prop-types";

const containerStyle ={
    display: 'flex',
    alignItem: 'center',
    gap: "20px",
};

const starContainerStyle = {
    display: 'flex',
}

StarRating.propTypes = {
    maxRating: PropTypes.number,
    size: PropTypes.number,
    messages: PropTypes.array,
    color: PropTypes.string,
}

function StarRating({ maxRating = 5, color = "red", size = 30, messages = [], defaultRating = 0, onSetRating }) {
    const [rating, setRating] = useState(defaultRating);
    const [tempRating, setTempRating] = useState(0);

    const textStyle = {
        lineHeight: "1",
        margin: "0",
        color,
        fontSize: `${size}px`,
    }

    function handleRating(rating) {
        setRating(rating);
        onSetRating(rating);
    }

    return (
        <div style={containerStyle}>
            <div style={starContainerStyle}>
                {Array.from({length: maxRating}, (_, i) => (
                    <Star 
                        key={i} 
                        onRate={() => handleRating(i+1) }
                        isFull = {tempRating ? tempRating >= (i+1) : rating >= (i+1)}
                        onHoverIn = {() => setTempRating(i+1)}
                        onHoverOut = {() => setTempRating(0)}
                        color = {color}
                        size = {size}
                    />
                ))}
            </div>
            <p style={textStyle}>{
                messages.length === maxRating ?
                messages[tempRating ? tempRating - 1 : rating -1] :
                tempRating || rating || ""
            }</p>
        </div>
    );
}

export default StarRating;