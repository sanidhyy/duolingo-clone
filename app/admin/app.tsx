"use client";

import simpleRestProvider from "ra-data-simple-rest";
import { Admin, Resource } from "react-admin";

import { CourseCreate } from "./course/create";
import { CourseEdit } from "./course/edit";
import { CourseList } from "./course/list";

const dataProvider = simpleRestProvider("/api");

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="courses"
        recordRepresentation="title"
        list={CourseList}
        create={CourseCreate}
        edit={CourseEdit}
      />
    </Admin>
  );
};

export default App;
