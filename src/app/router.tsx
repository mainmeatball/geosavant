import { useRoutes } from "react-router-dom";
import { MainPage } from "../pages/MainPage/MainPage";
import { ThemePage, RegionPage, LevelPage } from "../components";
import { InfiniteLevelPage } from "../pages/LevelPage/InfiniteLevelPage";

export function MainRouter() {
  const routes = useRoutes([
    { path: "/*", element: <MainPage /> },
    { path: "/home/*", element: <MainPage /> },
    { path: "/learn/:theme", element: <ThemePage /> },
    { path: "/learn/:theme/:region", element: <RegionPage /> },
    { path: "/learn/:theme/:region/level/infinite", element: <InfiniteLevelPage /> },
    { path: "/learn/:theme/:region/level/:levelNumber", element: <LevelPage /> },
  ]);

  return routes;
}
