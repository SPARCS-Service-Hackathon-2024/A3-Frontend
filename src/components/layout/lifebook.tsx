import { useState } from "react";
import axios from "axios";

//create life book, get recorded text and put into input

export default function Lifebook() {
  const [text, setText] = useState(""); //text should contain both question and recorded text
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const getResult = async () => {
    setLoading(true);
    try {
      const res = await axios.post("api/question", { text }); //api/question to be updated
      setResult(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  return <>//:TODO: add return modal</>;
}
