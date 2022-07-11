import AppToDo from './component/AppToDo'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//======================================
function App() {
  return (
    <div className="App">
      <AppToDo></AppToDo>
      <ToastContainer />
    </div >
  );
}

export default App;
