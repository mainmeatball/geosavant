import { useNavigate } from "react-router-dom";

export const BackButton = ({ to }) => {
  console.log("BackButton rendering...");
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1); // fallback if no "to" specified
    }
  };

  return (
    <button className="back-button" onClick={handleClick}>
      ← Back
    </button>
  );
};
