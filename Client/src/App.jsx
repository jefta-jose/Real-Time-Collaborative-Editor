import Editor from "./Components/Editor";
import { BrowserRouter, Route, Routes, Redirect,Switch } from "react-router-dom";
import {v4 as uuidv4} from 'uuid'


function App() {

  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" exact>
      <Redirect to={`/documents/${uuidv4()}`} />
      </Route>
    </Switch>
    </BrowserRouter>
  )
}

export default App
