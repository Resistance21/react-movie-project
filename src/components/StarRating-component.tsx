import { CSSProperties, ReactElement, useEffect, useState } from "react";
import StarContainer from "./starRatingComponent/StarContainer";
import Star from "./starRatingComponent/Stat";

type StarRatingProps = {
  maxRating: number;
  currentRating: number;
};

const StarRating = ({ maxRating = 5, currentRating = 0 }: StarRatingProps) => {
  const [rating, setRating] = useState<number>(currentRating);
  const [numberRating, setNumberRating] = useState<number>(currentRating);
  const [ratingStars, setRatingStars] = useState<ReactElement>();

  const updateRating = (ratingNumber: number) => {
    setRating(ratingNumber);
  };

  const generateStars = (currentRating: number) => (
    <StarContainer hoverLeave={onStarHoverLeave}>
      {Array.from({ length: maxRating }, (_, i) => (
        <Star
          key={`star-${i + 1}`}
          index={i + 1}
          fill={i + 1 <= currentRating}
          clicked={updateRating}
          hover={onStarHover}
        />
      ))}
    </StarContainer>
  );

  const updateStarRating = () => {
    setRatingStars(generateStars(rating === 0 ? 0 : rating));
  };

  useEffect(() => {
    updateStarRating();
  }, [rating]);

  const onStarHover = (rating: number) => {
    setRatingStars(generateStars(rating));
    setNumberRating(rating);
  };

  const onStarHoverLeave = () => {
    updateStarRating();
    setNumberRating(rating);
  };

  return (
    <>
      <div style={containerStyle}>
        {ratingStars}
        <span style={textStyle}>{numberRating}</span>
      </div>
    </>
  );
};

export default StarRating;

//css properties
const containerStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};
const textStyle: CSSProperties = {
  lineHeight: "1",
  margin: "0",
};
