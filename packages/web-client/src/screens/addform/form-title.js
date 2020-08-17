/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { useState } from "react";
import { Button, Spinner } from "../../components/lib";

function FormTitle({ title, handleChangeTitle, handleAddForm, isLoading }) {
  const [editing, setEditing] = useState(false);

  function toggleEditing() {
    setEditing(!editing);
  }

  return (
    <div
      css={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1em 1.5em",
        border: "1px solid #f1f1f4",
        borderRadius: "3px",
      }}
    >
      <div css={{ flex: "1 0", marginRight: "0.3em" }}>
        {editing ? (
          <input type="text" value={title} onChange={handleChangeTitle} />
        ) : (
          title
        )}
      </div>
      <Button variant="secondary" onClick={toggleEditing}>
        {editing ? (
          <React.Fragment>
            <i className="fas fa-save icon" />
            Save Title
          </React.Fragment>
        ) : (
          <React.Fragment>
            <i className="fas fa-pen icon" />
            Edit Title
          </React.Fragment>
        )}
      </Button>
      <Button css={{ marginLeft: "10px" }} onClick={handleAddForm}>
        {isLoading ? <Spinner css={{ marginLeft: 5 }} /> : "Create New Form"}
      </Button>
    </div>
  );
}

export default FormTitle;
