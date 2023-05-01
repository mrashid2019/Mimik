import { Send } from "@mui/icons-material";
import { Button } from "@mui/material";

const SubmitButton = (callBack) => {
  return (
    <Button
      variant="contained"
      endIcon={<Send />}
      type="submit"
      onClick={callBack}
    >
      Submit
    </Button>
  );
};

export default SubmitButton;
