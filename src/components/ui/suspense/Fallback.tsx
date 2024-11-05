import { useEffect, useState } from "react";

type FallbackProps = {
  delay?: number;
};

const Fallback = ({ delay }: FallbackProps) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, delay || 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [delay]);

  return (
    show && (
      <div className="h-full w-full p-4 flex justify-center items-center">
        loading
      </div>
    )
  );
};

export default Fallback;
