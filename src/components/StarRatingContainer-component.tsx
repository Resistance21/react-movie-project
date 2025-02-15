import {
  CSSProperties,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import StarContainer from "./starRatingComponent/StarContainer";
import Star from "./starRatingComponent/Star";

type StarRatingProps = {
  maxRating: number;
  currentRating: number;
};

const StarRatingContainer = ({
  maxRating = 5,
  currentRating = 0,
}: StarRatingProps) => {
  const [rating, setRating] = useState<number>(currentRating);
  const [numberRating, setNumberRating] = useState<number>(currentRating);
  const [ratingStars, setRatingStars] = useState<Array<ReactElement>>([]);
  const onStarHoverRef = useRef<(rating: number) => void>(() => {});

  const updateRating = useCallback((ratingNumber: number) => {
    setRating(ratingNumber);
  }, []);

  const generateStars = useCallback(
    (currentRating: number) => {
      return Array.from({ length: maxRating }, (_, i) => (
        <Star
          key={`star-${i + 1}`}
          index={i + 1}
          fill={i + 1 <= currentRating}
          clicked={updateRating}
          hover={onStarHoverRef.current}
        />
      ));
    },
    [maxRating, updateRating]
  );

  const onStarHover = useCallback(
    (rating: number) => {
      setRatingStars(generateStars(rating));
      setNumberRating(rating);
    },
    [generateStars]
  );

  const onStarHoverLeave = useCallback(() => {
    setRatingStars(generateStars(rating));
    setNumberRating(rating);
    console.log(rating);
  }, [rating, generateStars]);

  useEffect(() => {
    setRatingStars(generateStars(rating));
  }, [rating, generateStars]);

  useEffect(() => {
    onStarHoverRef.current = onStarHover;
  }, [onStarHover]);

  return (
    <>
      <div style={containerStyle}>
        <StarContainer hoverLeave={onStarHoverLeave}>
          {ratingStars}
        </StarContainer>
        <span style={textStyle}>{numberRating}</span>
      </div>
    </>
  );
};

export default StarRatingContainer;

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
