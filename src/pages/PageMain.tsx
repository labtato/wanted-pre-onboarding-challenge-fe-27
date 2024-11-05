import { Outlet } from "react-router-dom";

import withSuspense from "../components/hoc/withSuspense";
import { FC } from "react";

const PageMainLayout: FC = () => {
  return (
    <div className="h-full w-full p-4">
      <Outlet />
    </div>
  );
};

const PageMainLayoutWithSuspense = withSuspense(PageMainLayout);

export default PageMainLayoutWithSuspense;
