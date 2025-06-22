"use client";

import { FC } from "react";
import Link from "next/link";
import { Gamepad2 } from "lucide-react";

const SnakeToggleButton: FC = () => (
  <Link
    href="/snake"
    className="py-2 px-3 rounded-md hover:bg-muted transition"
    title="Play Snake"
  >
    <Gamepad2 className="w-4 h-4" />
  </Link>
);

export default SnakeToggleButton;
