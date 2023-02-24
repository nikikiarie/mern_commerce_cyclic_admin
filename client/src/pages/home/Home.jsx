import React, { useEffect, useMemo, useState } from "react";
import Chart from "../../components/Chart/Chart";
import FeaturedInfo from "../../components/FeaturedInfo/FeaturedInfo";
import { Bottom, Container } from "./home_styles";
import Transactions from "../../components/Transactions/Transactions";
import Members from "../../components/Members/Members";
import { publicRequest } from "../../makeRequest";
import { useSelector } from "react-redux";
import axios from "axios";

const Home = () => {
  const token = useSelector((state) => state.user.currentUser.accessToken);
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("/api/users/stats", {
          headers: { token: `Bearer ${token}` },
        });

        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch {}
    };

    getStats();
  }, [MONTHS, token]);

  return (
    <Container>
      <FeaturedInfo />
      <Chart
        data={userStats}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <Bottom>
        <Members />
        <Transactions />
      </Bottom>
    </Container>
  );
};

export default Home;
