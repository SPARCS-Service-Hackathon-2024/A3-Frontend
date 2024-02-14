import { ComponentType, Fragment } from "react";
import { Routes, Route } from "react-router-dom";

const BASIC: Record<
  string,
  { [key: string]: ComponentType<unknown> | undefined }
> = import.meta.glob("/src/pages/404.tsx", { eager: true });

const COMPONENTS: Record<
  string,
  { [key: string]: ComponentType<unknown> | undefined }
> = import.meta.glob("/src/pages/**/[a-zA-Z]*.tsx", { eager: true });

const basics: { [key: string]: ComponentType<unknown> | undefined } =
  Object.keys(BASIC).reduce((basic, file) => {
    const key = file.replace(/\/src\/pages\/|\.tsx$/g, "");
    return { ...basic, [key]: BASIC[file].default };
  }, {});

const components = Object.keys(COMPONENTS).map((component) => {
  const path = component
    .replace(/\/src\/pages|index|\.tsx$/g, "")
    .replace(/\[\.{3}.+\]/, "*")
    .replace(/\[(.+)\]/, ":$1");

  return { path, component: COMPONENTS[component].default };
});

export const Router = () => {
  const NotFound = basics?.["404"] || Fragment;

  return (
    <Routes>
      {components.map(({ path, component: Component = Fragment }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
