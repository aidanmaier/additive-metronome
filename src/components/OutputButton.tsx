import { Button } from "@mui/material";

interface OutputButtonProps {
  text?: string;
  ariaLabel?: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function OutputButton(props: OutputButtonProps) {
  return (
    <Button
      variant={props.selected ? "contained" : "outlined"}
      aria-label={props.ariaLabel}
      onClick={props.onClick}
    >
      {props.text}
    </Button>
  );
}