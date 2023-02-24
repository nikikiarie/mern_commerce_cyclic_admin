import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Main>
        <Sidebar />

        <Outlet />
      </Main>
    </div>
  );
};

export default Layout;

const Main = styled.div`
  display: flex;
`;
