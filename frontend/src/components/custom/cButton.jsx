import { Button } from "@chakra-ui/react";
import { useState } from "react";

export default function CButton(props) {
  // This button is only for handling async functions
  const [loading, setLoading] = useState(false);
  return (
    <Button
      {...props.children}
      isLoading={loading}
      onClick={() => {
        setLoading(true);
        props.onClick().then(() => setLoading(false));
      }}
    >
      {props.content}
    </Button>
  );
}
