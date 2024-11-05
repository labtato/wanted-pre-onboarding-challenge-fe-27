import { Suspense } from "react";
import Fallback from "../ui/suspense/fallback";

const withSuspense = (Component: React.ComponentType) => {
  return (props) => {
    return (
      <Suspense fallback={<Fallback />}>
        <Component {...props} />
      </Suspense>
    );
  };
};

export default withSuspense;
