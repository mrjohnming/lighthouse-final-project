import { React, useState } from "react";
import axios from "axios";

export default function NewTask(props) {
  const [name, setName] = useState(props.name || '');
  const [description, setDescription] = useState(props.description || '');
  const [priority, setPriority] = useState(props.priority || false);
  const [status, setStatus] = useState(props.status || false);


  const save = () => {
    const task = {
      name: name,
      description: description,
      priority: priority,
      status: status,
      deliverable_id: props.deliverable
    }
    if (!props.id) {
      axios.put('/tasks/new', task)
        .then(res => {
          task.id = res.data.id
          console.log('res: ', res.data)
          props.saveTask(task)
        });
    } else {
      task.id = props.id;
      axios.put(`/tasks/${task.id}`, task)
        .then(() => {
          props.editTask(task)
        })
    }
  }

  return (
    <main className="new_task_container">
      <section className="new_task">
        <form onSubmit={event => {
          event.preventDefault();
          props.showTaskForm();
        }}>
          {/* Name */}
          <label>Task Title:</label>
          <input name="name" type="text" placeholder="Enter Task Title" value={name} onChange={event => setName(event.target.value)}>
          </input>
          {/* Description */}
          <label>Description:</label>
          <input name="description" type="text" placeholder="Enter Task Description" value={description} onChange={event => setDescription(event.target.value)}>
          </input>
          {/* Priority */}
          <label>High Priority?:</label>
          <input name="priority" type="checkbox" value={priority} onChange={event => setPriority(prevCheck => !prevCheck)}>
          </input>
          {/* Status */}
          <label>Completed?:</label>
          <input name="status" type="checkbox" value={status} onChange={event => setStatus(prevCheck => !prevCheck)}>
          </input>
        </form>
        <button onClick={() => save()}>Save</button>
        <button onClick={props.showTaskForm}>Cancel</button>
      </section>
    </main>
  )
}