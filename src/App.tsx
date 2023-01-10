import { useState } from "react";
import QRCode from "react-qr-code";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <QRCode size={128} value={"Pasha"} />
    </div>
  );
}

export default App;
