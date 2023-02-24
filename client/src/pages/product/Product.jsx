import React, { useEffect, useMemo, useState } from "react";
import { productData } from "../../dummyData";
import {
  Bottom,
  Button,
  Container,
  Detail,
  FileInput,
  Form,
  FormDiv,
  FormImg,
  FormLeft,
  FormRight,
  FormTitle,
  Img,
  Info,
  Input,
  Label,
  LabelForm,
  Middle,
  Name,
  OneProduct,
  Option,
  ProductDetails,
  ProductName,
  RightTop,
  Sales,
  Select,
  Title,
  Top,
  UpdateButton,
} from "./product_styles";
import Chart from "../../components/Chart/Chart";
import { Publish } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { publicRequest } from "../../makeRequest";
import { useSelector } from "react-redux";
import axios from "axios";

const Product = () => {
  const token = useSelector((state) => state.user.currentUser.accessToken);
  const [productStats, setProductStats] = useState([]);
  const { id } = useParams();
console.log(productStats);
  const productDetails = useSelector((state) =>
    state.products.products.find((item) => item._id === id)
  );


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
        const res = await axios.get(`/api/orders/income?pid=${id}`,{headers:{token:`Bearer ${token}`}});
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setProductStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [id, MONTHS]);

  return (
    <Container>
      <Top>
        <Title>Product</Title>
        <Link to="/newProduct">
          <Button>Create</Button>
        </Link>
      </Top>
      <Middle>
        <Sales>
          <Chart
            title="Sales Performance(last 3 months)"
            data={productData}
            dataKey="Sales"
          />
        </Sales>
        <OneProduct>
          <ProductName>
            <Img src={productDetails.img} />
            <Name>{productDetails.title}</Name>
          </ProductName>
          <ProductDetails>
            <Detail>Id:</Detail>
            <Info>{productDetails._id}</Info>
          </ProductDetails>
          <ProductDetails>
            <Detail>Color:</Detail>
            {productDetails.color?.map((item) => {
              return (
                <>
                  <Info>{item}</Info>
                </>
              );
            })}
          </ProductDetails>
          <ProductDetails>
            <Detail>Sizes:</Detail>
            {productDetails.size?.map((item) => {
              return (
                <>
                  <Info>{item}</Info>
                </>
              );
            })}
          </ProductDetails>
          <ProductDetails>
            <Detail>In Stock:</Detail>
            <Info>Yes</Info>
          </ProductDetails>
        </OneProduct>
      </Middle>
      <Bottom>
        <Form>
          <FormDiv>
            <FormLeft>
              <FormTitle>Product</FormTitle>
              <Input placeholder="airpod" />
              <Label>In Stock</Label>
              <Select name="inStock" id="inStock">
                <Option value="yes">Yes</Option>
                <Option value="no">No</Option>
              </Select>
              <Label>Active</Label>
              <Select name="active" id="active">
                <Option value="yes">Yes</Option>
                <Option value="no">No</Option>
              </Select>
            </FormLeft>
            <FormRight>
              <RightTop>
                <FormImg src={productDetails?.img} />
                <LabelForm htmlFor="file">
                  <Publish />
                </LabelForm>
                <FileInput type="file" id="file" />
              </RightTop>
              <UpdateButton>Update</UpdateButton>
            </FormRight>
          </FormDiv>
        </Form>
      </Bottom>
    </Container>
  );
};

export default Product;
