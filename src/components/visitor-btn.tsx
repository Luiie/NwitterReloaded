import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
  margin-top: 10px;
  background-color: white;
  font-weight: 500;
  width: 100%;
  color: black;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;


export const StateContext = React.createContext({
  isVisitor: false,
  setValue: (newValue: boolean) => {}
});

export default function GithubButton() {
  const [isVisitor, setIsVisitor] = useState(false);
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      await signInWithEmailAndPassword(auth, "visitor@temp.com", "visitor");
      setIsVisitor(true);
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
    <Button onClick={onClick}>
        Continue as Visitor
    </Button>
    </>
    )
}