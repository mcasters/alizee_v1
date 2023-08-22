import { useState } from "react";

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    console.log(isOpen);
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    toggle,
  };
}
