import "./styles.css";
import * as dataJson from "./data.json";
import { useEffect } from "react";

function find(arr, name, parent) {
  return arr.find((el) => el[name] === parent);
}
export default function App() {
  console.log(dataJson);
  const w = [];
  useEffect(() => {
    dataJson.values.forEach((item) => {
      var emotionItem = item.replaceAll(" ", "");
      var emotionItemArray = emotionItem.split("-");

      if (
        !w.some(
          (el) =>
            el.name === emotionItemArray[0] && el.parent === emotionItemArray[1]
        )
      ) {
        w.push({
          name: emotionItemArray[0],
          parent: emotionItemArray[1],
          emotion: emotionItemArray[2]
        });
      }
    });
    console.table(w);
  }, []);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
