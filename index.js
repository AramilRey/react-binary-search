import "./style.css";
import React, { useState } from "react";

const defaultCompare = (a, b) => (a > b ? 1 : a < b ? -1 : 0);

export default ({ list, element, step = 1000, compare = defaultCompare }) => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(list.length - 1);
  const [result, setResult] = useState();
  const [explanation, setExplanation] = useState("");

  const middle = Math.floor((right + left) / 2);
  const comparison = compare(element, list[middle]);

  if (result === undefined) {
    setTimeout(() => {
      let explainLookup;
      if (left <= right) {
        explainLookup = `${list[middle]} was `;
        switch (comparison) {
          case -1: {
            explainLookup += "bigger than ";
            setRight(middle - 1);
            break;
          }
          case 1: {
            explainLookup += "smaller than ";
            setLeft(middle + 1);
            break;
          }
          default: {
            explainLookup += "equal to ";
            setResult(middle);
            break;
          }
        }
        explainLookup += element;
      } else {
        explainLookup = `${element} is not on the list`;
        setResult(-1);
      }
      setExplanation(explainLookup);
    }, step);
  }

  return (
    <div className="binary-search">
      <div className="row">
        <div key={-1}>
          <div className={`column index ${result === -1 ? "found" : ""}`}>
            <span>{-1}</span>
          </div>
          <div className="column item">
            <span />
          </div>
        </div>
        {list.map((n, i) => {
          let itemClass = "item ";
          let indexClass = "index ";

          if (i === middle) {
            if (i === result) {
              indexClass += " found";
            }
            itemClass += " middle";
          } else if (i < left || i > right) {
            itemClass += "inactive";
          } else {
            itemClass += "active";
          }

          return (
            <div key={i}>
              <div className={"column " + indexClass}>
                <span>{i}</span>
              </div>
              <div className={"column " + itemClass}>
                <span>{n}</span>
              </div>
            </div>
          );
        })}
      </div>
      {!!explanation && (
        <div className="process">
          <p>{explanation}</p>
        </div>
      )}
      {result !== undefined && (
        <div className="result">
          <p>Result: {result}</p>
        </div>
      )}
    </div>
  );
};
