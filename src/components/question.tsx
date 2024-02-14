import { useState } from "react";
import LineSplit from "./line-split";
import script from "../dummy-script.json";

export default function Question() {
  const [index, setIndex] = useState(0);

  return (
    <div
      className="flex flex-col items-center"
      onClick={() => setIndex((i) => i + 1)}
    >
      <img src="/laura/default.gif" />
      <div className="mt-12 break-keep px-8 text-center">
        <LineSplit text={script[index % script.length]} />
      </div>
    </div>
  );
}
