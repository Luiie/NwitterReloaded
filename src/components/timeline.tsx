import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";
import { Unsubscribe } from "firebase/auth";

export interface MyTweet {
    createdAt: number,
    photo?: string,
    tweet: string,
    userId: string,
    username: string,
    id: string,
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

export default function Timeline() {
    const [tweets, setTweets] = useState<MyTweet[]>([]);
    useEffect(() => {
        let unsubscribe: Unsubscribe | null = null;
        const fetchTweet = async() => {
            const tweetsQuery = query(
                collection(db, "tweets"),
                orderBy("createdAt", "desc")
            );
            unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
                const tweets = snapshot.docs.map((doc) => {
                    const { tweet, createdAt, userId, username, photo } = doc.data();
                    return {
                        tweet, createdAt, userId, username, photo,
                        id: doc.id,
                    };
                });
                setTweets(tweets);
            });
        };
        fetchTweet();
        return () => {
            unsubscribe && unsubscribe();
        }
    }, []);
    return <Wrapper>
        {tweets.map((tweet) => (
            <Tweet key={tweet.id} {...tweet}/>
        ))}
    </Wrapper>;
}