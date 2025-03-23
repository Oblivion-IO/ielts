import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function GoBack() {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(-1)} variant="outline">
      Go Back
    </Button>
  );
}
