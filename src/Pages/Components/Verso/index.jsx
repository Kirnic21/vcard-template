import React from "react";


const Verso = (props) => {
  return (
    <div className="verso">

      <p className="metadados">{props.categoria} </p>
      <p className="metadados">{props.url} </p>
      <p className="metadados">{props.dados}</p>
    </div>
  );
};
export default Verso;
