import React, { useState } from "react";

function Test() {
  const [count, setCount] = useState(0);

  function inc(){
    setCount(count+1)
  }
  
  return <div>
    <button onClick={inc}>Increment</button>
    {count}
  </div>;
}

export default Test;
