import React from "react";
import "./Result.scss";

export default function Result({ output, clearOutput }) {
  return (
    <div className="result">
      <p className="result__p">Plaground:</p>
      <button className="result__btn" onClick={clearOutput}>
        clear playground
      </button>
      <table>
        {output.length !== 0 ? (
          <tr>
            {Object.keys(output[0]).map((val, key) => (
              <th key={key} className="result__table">
                {val}
              </th>
            ))}
          </tr>
        ) : null}
        {output.map((item, key) => (
          <tr key={key}>
            {Object.values(item).map((val, key) => (
              <td key={key} className="result__table">
                {val}
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
}
