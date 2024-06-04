import { useState } from "react";
import { DATA } from "./Data";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const App = () => {
  let [stores, setStores] = useState(DATA);

  return (
    <div className="layout__wrapper">
      <div className="card">
        <DragDropContext
          onDragEnd={() => {
            console.log("drag drop event occured");
          }}
        >
          <div className="header">
            <h1>Shopping List</h1>
          </div>

          <Droppable droppableId="ROOT" type="group">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {stores.map((store, idx) => {
                  return (
                    <div key={idx}>
                      <div className="store-container">
                        <h3> {store.name} </h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default App;
