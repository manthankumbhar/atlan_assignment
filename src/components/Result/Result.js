import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./Result.scss";

export default function Result({ output, clearOutput, scrollRef }) {
  const data = output;
  const [pagination, setPagination] = useState({
    offset: 0,
    numberPerPage: 100,
    pageCount: 0,
    currentData: [],
  });

  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      pageCount: data.length / prevState.numberPerPage,
      currentData: data.slice(
        pagination.offset,
        pagination.offset + pagination.numberPerPage
      ),
    }));
  }, [pagination.numberPerPage, pagination.offset, data]);

  const handlePageClick = (event) => {
    const selected = event.selected;
    const offset = Math.ceil(selected * pagination.numberPerPage);
    setPagination({ ...pagination, offset });
    scrollRef.current.scrollTo(0, 0);
  };

  return (
    <div className="result" ref={scrollRef}>
      <p className="result__p">Plaground:</p>
      <button className="result__btn" onClick={clearOutput}>
        clear playground
      </button>
      {output.length !== 0 ? (
        <tr>
          {Object.keys(output[0]).map((val, key) => (
            <th key={key} className="result__table result__table--header">
              {val}
            </th>
          ))}
        </tr>
      ) : null}
      {data.length > 100 ? (
        <>
          {pagination.currentData &&
            pagination.currentData.map((item, key) => (
              <tr key={key}>
                {Object.values(item).map((val, key) => (
                  <td key={key} className="result__table">
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          <ReactPaginate
            previousLabel={data.length >= 100 ? "Previous" : null}
            nextLabel={data.length >= 100 ? "Next" : null}
            breakLabel={"..."}
            pageCount={pagination.pageCount}
            marginPagesDisplayed={3}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"pagination__active"}
            pageClassName={"pagination__page"}
          />
        </>
      ) : (
        data.map((item, key) => (
          <tr key={key}>
            {Object.values(item).map((val, key) => (
              <td key={key} className="result__table">
                {val}
              </td>
            ))}
          </tr>
        ))
      )}
    </div>
  );
}
