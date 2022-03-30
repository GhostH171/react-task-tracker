import React, { useState } from "react";

const AddTask = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState(0);
  const [completed, setCompleted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      alert("Please add a todo");
      return;
    }
    onAdd({ title, userId, completed });
    setTitle("");
    setUserId(0);
    setCompleted(false);
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Title</label>
        <input
          type="text"
          placeholder="Add Todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Created by Id </label>
        <input
          type="number"
          placeholder="Id"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          min={0}
        />
      </div>
      <div className="form-control form-control-check">
        <label>Set Completed</label>
        <input
          type="checkbox"
          checked={completed}
          value={completed}
          onChange={() => setCompleted(!completed)}
        />
      </div>

      <input type="submit" value="Save Todo" className="btn btn-block" />
    </form>
  );
};

export default AddTask;
