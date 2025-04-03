import { Outlet } from "react-router-dom";

import ContentList from "./Container.contentList";

function Container({ listData, isListLoading, listError }) {
  return (
    <main>
      <Outlet />
      <section>
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
