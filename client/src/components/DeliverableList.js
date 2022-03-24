import { React } from 'react';
import useAppData from '../hooks/useAppData';
import DeliverableListItem from './DeliverableListItem';
import NewDeliverable from './NewDeliverable';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './DeliverableList.scss';
import useVisualMode from '../hooks/useVisualMode';

// Container for each DeliverableListItem.
export default function DeliverableList(props) {
  const { state, deliverablePercentComplete } = useAppData();
  const { transition } = useVisualMode(null);

  const listItem = props.deliverables.map(deliverable =>
    <DeliverableListItem
      key={deliverable.id}
      id={deliverable.id}
      name={deliverable.name}
      description={deliverable.description}
      count={deliverable.count}
      selected={deliverable.priority}
      onToggle={props.onToggle}
      setDeliverable={props.onChange}
      transition={props.transition}
      showDelivForm={props.showDelivForm}
      editDeliverable={props.editDeliverable}
      deliverablePercentComplete={deliverablePercentComplete(state, deliverable.id)}
      deleteDeliverable={event => {
        event.stopPropagation();
        props.deleteDeliverable(props.selectedDeliverable.id);
      }}
    />
  );

  return (
    <section>
      <div id="project_details">
        <span id="project_name">{props.selectedProject.name}</span>
        <span id="project_description">{props.selectedProject.description}</span>
        <span id="project_stats">3 of 5 (60%) Deliverables Completed</span>
        <AddCircleIcon id="new_deliverable" className="mui_icons"
          onClick={() => {
            props.showDelivForm()
          }}
        />
      </div>

      {props.showFormBoolean &&
        <NewDeliverable
          project={props.project}
          transition={transition}
          showDelivForm={props.showDelivForm}
          saveDeliverable={props.saveDeliverable}
          id={props.id}
          name={props.name}
          description={props.description}
          priority={props.priority}
          status={props.status}
          editDeliverable={props.editDeliverable}
        />
      }
      { listItem}
    </section>
  );
}
