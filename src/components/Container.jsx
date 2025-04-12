import { Outlet } from "react-router-dom";

import ContentList from "./Container.contentList";

function Container({ listData, isListLoading, listError }) {
  return (
    <main className="flex flex-col px-12 justify-center mx-auto w-max-[1440px]">
      <section className="flex flex-wrap gap-8 box-border mx-auto">
        <Outlet />
      </section>
      <section className="flex flex-col box-border my-24 border-t border-gray-500 w-max-[1440px] w-[80%] mx-auto">
        <ContentList
          listData={listData}
          isLoading={isListLoading}
          listError={listError}
        />
      </section>
    </main>
  );
}

export default Container;
