import { styled } from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import Timeline from "../components/timeline";

const Wrapper = styled.div``;

export default function Home() {
  return (
    <Wrapper>
      <h1>Home!</h1>
      <br/>
      <PostTweetForm />
      <br/>
      <Timeline />
    </Wrapper>
  );
}