import React, { useState } from 'react'
import styled from 'styled-components'
import { login } from '../../redux/apiCalls'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

const LogIn = () => {
  const dispatch = useDispatch()
  const {error} = useSelector((state)=>state.user)
  const navigate = useNavigate()


  const [data,setData] = useState({
    username:"",
    password:""
  }) 

const handleClick =  (e) =>{
  e.preventDefault()
 
  login(dispatch,data,navigate)
}



const handleChange = (e) => {
  setData({...data,[e.target.name]:e.target.value}) 
}

  return (
    <Container>
        <Input placeholder='username' onChange={(e)=>handleChange(e) } name = "username"/>
        <Input placeholder='password' onChange={(e)=>handleChange(e)} name = "password"/>
<Button onClick={ (e) =>handleClick(e)}>Log iN</Button>
{error ? <span style={{color:"red"}}>{error}</span> : ""}
    </Container>
  )
}

export default LogIn


const Input = styled.input`
    padding:5px 0px;
    width: 200px;

` 

const Button = styled.button`
    width: 200px;
    margin-top: 20px;
    width: 200px;

` 
const Container = styled.div`
height: 100vh;

    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

` 