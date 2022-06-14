import { Routes, Route } from 'react-router-dom';
import { MainPage } from './components/MainPage/MainPage';
import { SignUp } from './components/SignUp/SignUp';
import { ROUTES } from './routes/routes';
import { TaskPage } from './components/TaskPage/TaskPage';
import { AddTaskPage } from './components/AddTaskPage/AddTaskPage';
import './App.css';
import { Description } from './components/Description/Description';


function App() {
  return (
    <div className="App">
      <Routes>
          <Route path={ROUTES.MAIN_PAGE} element={<MainPage />}/>
          <Route path={ROUTES.SIGN_UP} element={<SignUp />}/>
          <Route path={ROUTES.TASK_PAGE} element={<TaskPage />}/>
          <Route path={ROUTES.ADD_TASK} element={<AddTaskPage />}/>
          <Route path={ROUTES.DESCRIPTION} element={<Description />}/>
      </Routes>
    </div>
  );
}

export default App;
