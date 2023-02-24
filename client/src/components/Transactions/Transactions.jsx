import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Img,
  Name,
  Table,
  Tbody,
  TdAmount,
  TdDate,
  TdStatus,
  TdUser,
  Th,
  Title,
  Tr,
} from "./transactions_styles";
import { publicRequest } from "../../makeRequest";
import { useSelector } from "react-redux";
import axios from "axios";






const Transactions = () => {
  
  
  const [orders,setOrders] = useState([])
  const token = useSelector((state) => state.user.currentUser.accessToken);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/api/orders", {
          headers: { token: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (error) {}
    };
    fetchOrders()
  }, []);

  return (
    <Container>
      <Title>Transactions</Title>
      <Table>
        <Tbody>
          <Tr>
            <Th>Customer</Th>
            <Th>Date</Th>
            <Th>Amount</Th>
            <Th>Status</Th>
          </Tr>
        </Tbody>
        <Tbody>
          {orders.map((item)=>{
            return(
          
          <Tr key={item._id}>
            <TdUser>
              
              <Name>{item.userId}</Name>
            </TdUser>
            <TdDate>{item.createdAt}</TdDate>
            <TdAmount>{item.subTotal}</TdAmount>
            <TdStatus>
              <Button>pending</Button>
            </TdStatus>
          </Tr>
            )
          })}
        </Tbody>
        
      </Table>
    </Container>
  );
};

export default Transactions;
