import "./styles.css";
import * as dataJson from "./data.json";
import { useEffect, useState } from "react";

function find(arr, name, parent) {
  return arr.find((el) => el[name] === parent);
}
export default function App() {
  const [data, setData] = useState([]);
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

    let uniqueEmotions = [...new Set(w.map((item) => item.emotion))];
    uniqueEmotions = uniqueEmotions.map((item) => {
      return {
        name: item,
        children: []
      };
    });
    uniqueEmotions.forEach((unique, idx) => {
      var flag = 0;
      w.forEach((item, idx2) => {
        if (flag === 1) {
          uniqueEmotions[idx]["children"][
            uniqueEmotions[idx]["children"].length - 1
          ]["children"].push({ name: item.name });
          flag = 0;
        }
        if (item.emotion === unique.name) {
          if (
            unique.children.filter((el) => el.name === item.parent).length === 0
          ) {
            uniqueEmotions[idx]["children"].push({
              name: item.parent,
              children: [{ name: item.name }]
            });
            flag = 1;
          }
        }
      });
    });

    console.log(uniqueEmotions);
    setData(uniqueEmotions);
  }, []);
  console.log(data);
  return (
    <>
      {data.length &&
        data.map((item) => (
          <div key={item.name} className="emotionParent">
            {item.name}
            <ul>
              {item.children.map((item2) => (
                <>
                  <li>{item2.name}</li>
                  <ul>
                    {item2.children.map((item3) => (
                      <li>{item3.name}</li>
                    ))}
                  </ul>
                </>
              ))}
            </ul>
          </div>
        ))}
    </>
  );
}
