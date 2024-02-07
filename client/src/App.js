import {useState, useEffect} from "react"
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const data = fetch('http://localhost:3000/api/users/')
    data.then(value => setData(value))
  }, []);
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
