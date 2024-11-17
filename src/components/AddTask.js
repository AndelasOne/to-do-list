import { useState } from "react";
import { React } from "react";
import { swal } from "@sweetalert/with-react";
import { Checkbox } from "pretty-checkbox-react";
import "@djthoms/pretty-checkbox";
const AddTask = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      swal(
        <div>
          <h1>Warning</h1>
          <p>Please enter a Task!</p>
        </div>
      );
      return;
    }
    if (!day) {
      swal(
        <div>
          <h1>Warning</h1>
          <p>Please enter a Day & Time!</p>
        </div>
      );
      return;
    }

    onAdd({ text, day, reminder });
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label style={{ paddingLeft: "10px" }}>Task</label>
        <input
          type="text"
          placeholder="Cleaning"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </div>
      <div className="form-control">
        <label style={{ paddingLeft: "10px" }}>Day & Time</label>
        <input
          type="text"
          placeholder="Feb 6th 1:30pm"
          value={day}
          onChange={(event) => setDay(event.target.value)}
        />
      </div>
      <div className="form-control" style={{ paddingLeft: "5px" }}>
        <Checkbox
          bigger
          type="checkbox"
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        >
          Set Reminder
        </Checkbox>
      </div>

      <input type="submit" value="Save Task" className="btn btn-block" />
    </form>
  );
};

export default AddTask;
