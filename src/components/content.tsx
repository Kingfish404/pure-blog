import { useState } from "react";

export function HeadContent(
  { title, motto, desc }:
    { title?: string, motto?: string | Array<string>, desc?: string }) {
  const [message, setMessage] = useState(() => {
    return Array.isArray(motto) ? motto[0] : motto;
  });
  return (
    <div>
      <h1 onClick={() => {
        if (Array.isArray(motto)) {
          setMessage(motto[Math.floor(Math.random() * motto.length)]);
        }
      }}>{title}</h1>
      <h2 title={message}>{message}</h2>
      <p dangerouslySetInnerHTML={{ __html: desc || "" }} />
      <style jsx>{`
      div {
        text-align: center;
      }
    
      h1 {
        font-size: 36px; 
        transition: all ease 1s;
        cursor: pointer;
        user-select: none;
        margin: 40px auto 5px;
      }

      h1:hover {
        letter-spacing: 1px;
      }

      h2 {
        line-height: 45px;
        max-width: 600px;
        margin: auto;

        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: #6D6D6D;
      }

      p {
        font-size: 18px;
        line-height: 30px;
        display: inline-block;
        max-width: 550px;
        word-break: keep-all;
      }

      @media screen and (max-width: 600px) {
        h1 {
          font-size: xxx-large;
        }

        h2 {
          font-size: x-large;
        }

        div {
          padding: 10px
        }

        p {
          padding: 10px;
          word-break: break-word;
        }
      }
      `}</style>
    </div>
  );
}
