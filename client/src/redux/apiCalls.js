import  axios  from "axios";
import {
  addProductSuccess,
  addProuctFailure,
  addProuctStart,
  deleteProductSuccess,
  deleteProuctFailure,
  deleteProuctStart,
} from "./productSlice";
import { loginFailure, loginStart, loginSuccess } from "./userSlice";

export const login = async (dispatch, data, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/api/auth/login", {
      username: data.username,
      password: data.password,
    });
    dispatch(loginSuccess(res.data));
    navigate("/home");
  } catch (err) {
    dispatch(loginFailure(err.response.data));
  }
};

export const addProduct = async (dispatch, product, token) => {
  dispatch(addProuctStart());
  try {
    const res = await axios.post(`/api/products/`, product, {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(addProductSuccess(res.data));
    console.log(res.data);
  } catch (error) {
    console.log(error);
    dispatch(addProuctFailure());
  }
};

export const editUser = async (id, user, token, setData) => {
  try {
    const res = await axios.put(`/api/users/${id}`, user, {
      headers: { token: `Bearer ${token}` },
    });
    console.log(res.data);
    setData(res.data);
  } catch (error) {}
};

export const deleteProduct = async (dispatch,id, token) => {
  dispatch(deleteProuctStart());
  try {
    const res = await axios.delete(`/api/products/${id}`, {
      headers: { token: `Bearer ${token}` },
    });
    console.log(res.data);
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(deleteProuctFailure(id));
  }
};
