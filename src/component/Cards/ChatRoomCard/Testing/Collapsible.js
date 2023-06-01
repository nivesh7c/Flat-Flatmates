import { Button } from "@material-ui/core";
import React, { useState } from "react";

function Collapsible() {
  const [isOpen, setisOpen] = useState(false);
  return (
    <div className="coll">
      <Button className="toggle" onClick={() => setisOpen(!isOpen)}>
        toggle
      </Button>
      {isOpen && <div className="content">some item</div>}
    </div>
  );
}

export default Collapsible;
