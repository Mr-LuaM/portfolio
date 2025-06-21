"use client";
import { FC } from "react";
import { Gamepad2 } from "lucide-react";

interface SnakeToggleButtonProps {
  isGameOpen: boolean;
  toggleGame: () => void;
}

const SnakeToggleButton: FC<SnakeToggleButtonProps> = ({ isGameOpen, toggleGame }) => (
  <button
    onClick={toggleGame}
    className="py-2 px-3 rounded-md hover:bg-muted  transition"
    title={isGameOpen ? "Back to Portfolio" : "Play Snake"}
  >
    <Gamepad2 className="w-4 h-4" />
  </button>
);

export default SnakeToggleButton;
