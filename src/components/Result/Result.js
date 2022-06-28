import React from "react";
import "./Result.scss";

export default function Result({ output, clearOutput }) {
  return (
    <div className="result">
      <>
        <p className="result__p">Plaground:</p>
        <button className="result__btn" onClick={clearOutput}>
          clear
        </button>
      </>
      {output.map((item) => (
        <tr key={item.id}>
          {Object.values(item).map((val) => (
            <td className="result__table">{val}</td>
          ))}
        </tr>
      ))}
    </div>
  );
}
