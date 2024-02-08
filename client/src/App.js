import {useState, useEffect} from "react"
import './App.css';
import axios from "axios"
function App() {
  const [data, setData] = useState([]);
  const [dataP, setDataP] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/api/users").then(
      res =>{
        setData(res.data)
      }
    ).catch(
      err => {
        alert("Error", err  )
      }
    )
    axios.get("http://localhost:3000/api/product").then(
      res =>{
        console.log(res.data)
        setDataP(res.data)
      }
    ).catch(
      err => {
        alert("Error", err  )
      }
    )
  }, []);
  return (
    <div className="App">
      <table>
        <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>lastName</th>
          <th>created at</th>
          <th>updated at</th>
        </tr>
        </thead>
        <tbody>
        {data.map((user, index) => (
          <tr key={index} style={{
            backgroundColor: user.id % 2 === 0 ? "red" : "blue"

          }}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.last_name}</td>
            <td>{user.createdAt}</td>
            <td>{user.updatedAt}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <div></div>

      <table>
        <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>price</th>
          <th>stock</th>
          <th>created at</th>
          <th>updated at</th>
        </tr>
        </thead>
        <tbody>
        {dataP.map((user, index) => (
          <tr key={index}
              style={{
                backgroundColor: user.id % 2 === 0 ? "red" : "blue"
              }}
          >
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.price}</td>
            <td>{user.stock}</td>
            <td>{user.createdAt}</td>
            <td>{user.updatedAt}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
