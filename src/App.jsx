import { useState } from "react";
import { DATA } from "./Data";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const App = () => {
  let [stores, setStores] = useState(DATA);

  let handleDragDrop = (results) => {
    let { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      let reorderedStores = [...stores];
      let sourceIndex = source.index;
      let destinationIndex = destination.index;

      let [removedStore] = reorderedStores.splice(sourceIndex, 1);
      reorderedStores.splice(destinationIndex, 0, removedStore);
      return setStores(reorderedStores);
    }
  };

  return (
    <div className="layout__wrapper">
      <div className="card">
        <DragDropContext onDragEnd={handleDragDrop}>
          <div className="header">
            <h1>Shopping List</h1>
          </div>

          <Droppable droppableId="ROOT" type="group">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {stores.map((store, idx) => {
                  return (
                    <Draggable
                      key={store.id}
                      draggableId={store.id}
                      index={idx}
                    >
                      {(provided) => (
                        <div
                          className="store-container"
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <h3> {store.name} </h3>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default App;
