import { createPortal } from "react-dom";

export type PortalProps = {
  children: React.ReactNode;
  container?: Element;
};

const Portal = ({ children, container }: PortalProps) => {
  return createPortal(children, container ?? document.body);
};

export default Portal;
