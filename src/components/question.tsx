import { useEffect, useState } from "react";
import LineSplit from "./line-split";
import script from "../dummy-script.json";
import { DialogType } from "../dialog";

export default function Question() {
  const [index, setIndex] = useState(0);
  const [dialog, setDialog] = useState<DialogType>(script[0]);
  const [isDialogEnd, setIsDialogEnd] = useState(false);

  useEffect(() => {
    setDialog(script[index % script.length]);
    setIsDialogEnd(false);
  }, [index]);

  const handleSkip = () => {
    if (isDialogEnd) {
      setIndex(index + 1);
    }
  };

  return (
    <div className="flex flex-col items-center" onClick={handleSkip}>
      <img src="/laura/default.gif" />
      <div className="mt-12 break-keep px-8 text-center">
        <LineSplit
          text={script[index % script.length].text}
          hasNext={dialog.isQuestion === false && index < script.length - 1}
          endDialog={() => setIsDialogEnd(true)}
        />
      </div>
    </div>
  );
}
