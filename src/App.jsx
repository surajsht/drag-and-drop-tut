import { useState } from "react";
import { DATA } from "./Data";

const App = () => {
  let [stores, setStores] = useState(DATA);

  return (
    <div className="layout__wrapper">
      <div className="card">
        <div className="header">
          <h1>Shopping List</h1>
        </div>

        <div>
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
      </div>
    </div>
  );
};

export default App;
