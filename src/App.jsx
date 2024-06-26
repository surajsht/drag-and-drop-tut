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
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <StoreList {...store} />
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

function StoreList({ name, items, id }) {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <div className="store-container">
            <h3> {name} </h3>
          </div>

          <div className="items-container">
            {items.map((item, index) => {
              {
                return (
                  <Draggable draggableId={item.id} index={index} key={item.id}>
                    {(provided) => (
                      <div
                        className="item-container"
                        key={index}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <h4> {item.name} </h4>
                      </div>
                    )}
                  </Draggable>
                );
              }
            })}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default App;
