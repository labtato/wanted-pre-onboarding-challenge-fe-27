import { Outlet } from "react-router-dom";

import withSuspense from "../components/hoc/withSuspense";
import { FC } from "react";
import Header from "@/components/pageMain/Header";

const PageMainLayout: FC = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <Header />
      <div className="h-full p-4">
        <Outlet />
      </div>
    </div>
  );
};

const PageMainLayoutWithSuspense = withSuspense(PageMainLayout);

export default PageMainLayoutWithSuspense;
