import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { auth } from "../firebase";
import { Wrapper, Title, Form, Input, Error, Switcher } from "../components/auth-components";
import GithubButton from "../components/github-btn";
import VisitorButton from "../components/visitor-btn";

export default function LogIn() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {target: {name, value}} = e;

    if(name === "email"){
      setEmail(value);
    } else if(name === "password"){
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if( isLoading || email === "" || password === "" ){
      return
    };

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
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
    <Wrapper><Title>Log In</Title>
      <Form onSubmit={onSubmit}>
        <Input name="email" value={email} placeholder="Email" type="email" onChange={onChange} required />
        <Input name="password" value={password} placeholder="Password" type="password" onChange={onChange} required />
        <Input type="submit" value={isLoading ? "Loading...": "Log In"} />
      </Form>
      {error === "" ? null : <Error>{error}</Error>}
      <Switcher>
        No Account?{" "}
        <Link to="/create-account">Create One</Link>
      </Switcher>
      <GithubButton />
      <VisitorButton />
    </Wrapper>
    );
}