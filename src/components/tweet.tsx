import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { MyTweet } from "./timeline";
import { styled } from "styled-components";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div``;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
  object-fit: cover;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const EditButton = styled.button`
  background-color: dodgerblue;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

export default function Tweet({tweet, username, photo, userId, id}:MyTweet){
  const user = auth.currentUser;
  const [fixedTweet, SetFixedTweet] = useState(tweet);
  const [edited, SetEdited] = useState(false);
  const onDelete =async () => {
    const ok = confirm("Are you sure?");
    if(!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if(photo) {
        const photoRef = ref(storage, `tweets/${user.uid}-${user.displayName}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    } finally {

    }
  };
  const onEdit = async () => {
    if(user?.uid !== userId) return;
    try {
      SetEdited(!edited);
      if(fixedTweet){
        await updateDoc(doc(db, "tweets", id), {
          "tweet": fixedTweet,
        });
      };
      
      if(photo) {
        // const photoRef = ref(storage, `tweets/${user.uid}-${user.displayName}/${id}`);
        // await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };
  
  const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    SetFixedTweet(e.target.value);
  };
  return (
    <Wrapper>
      <Column>
          <Username>{username}</Username>
          {edited ? 
              <TextArea value={fixedTweet} onChange={onChange} placeholder="Edit your tweet!"/>
           : <Payload>{fixedTweet}</Payload>}
          {user?.uid === userId ? <DeleteButton onClick={onDelete}>Delete</DeleteButton> : null}
          <>{` `}</>
          {user?.uid === userId && !edited ? <EditButton onClick={onEdit}>Edit</EditButton> : null}
          <></>
          {edited ? <EditButton onClick={onEdit}>Done</EditButton> : null}
      </Column>
      <Column>
        {photo? (
          <Photo src={photo}/>
        ): null}
      </Column>
    </Wrapper>
  )
}