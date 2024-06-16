import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Wrapper, Title, Form, Input, Error, Switcher } from "../components/auth-components";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {target: {name, value}} = e;

    if(name === "name"){
      setName(value);
    } else if(name === "email"){
      setEmail(value);
    } else if(name === "password"){
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if( isLoading || name === "" || email === "" || password === "" ){
      return
    };

    try {
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credentials.user, {
        displayName: name,
      })
      navigate("/");
    } catch (error) {
      if(error instanceof FirebaseError){
        setError(error.message);
      }

    } finally {
      setLoading(isLoading);
    }
  };
  
  return (
    <Wrapper>
      <Title>Join</Title>
      <Form onSubmit={onSubmit}>
        <Input name="name" value={name} placeholder="Name" type="text" onChange={onChange} required />
        <Input name="email" value={email} placeholder="Email" type="email" onChange={onChange} required />
        <Input name="password" value={password} placeholder="Password" type="password" onChange={onChange} required />
        <Input type="submit" value={isLoading ? "Loading...": "Create Account"} />
      </Form>
      {error === "" ? null : <Error>{error}</Error>}
      <Switcher>
        Already have Account?{" "}
        <Link to="/login">Log In</Link>
      </Switcher>
    </Wrapper>
    );
}