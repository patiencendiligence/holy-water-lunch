import { MouseEventHandler, ReactNode } from "react";
import styled from "@emotion/styled";

interface IChipProps {
  compact?: boolean;
  children: ReactNode;
  htmlType?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  outlined?: boolean;
  isBounce: boolean;
  fullWidth?: boolean;
  size?: "medium" | "large";
  gradation?: boolean;
  loading?: boolean;
  width: string;
  color: string;
  text: string;
}
const ChipStyle = styled.button`
  position: relative;
  display: inline-flex;
  margin: 2%;
  padding: 15px 10px;
  border-width: 8px;
  border-radius: 12em;
  font-size: 1.5em;
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: center;
  align-items: center;
`;
const Chip = ({
  disabled = false,
  onClick,
  outlined = false,
  isBounce = false,
  fullWidth = false,
  size = "medium",
  gradation = false,
  loading = false,
  width = "100%",
  color = "",
  text = "",
  children,
}: IChipProps) => {
  return (
    <>
      <ChipStyle
        style={{
          width: width,
          color: outlined ? color : "#fff",
          backgroundColor: !outlined ? color : "#fff",
          borderColor: outlined ? color : "transparent",
        }}
        className={`${
          isBounce ? "animate-bounce " : ""
        } hover:scale-110 ease-in-out duration-150 group`}
        disabled={disabled}
        onClick={loading ? () => null : onClick}
      >
        <span className="invisible group-hover:visible block animate-ping absolute h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        {text}
      </ChipStyle>
    </>
  );
};

export default Chip;
