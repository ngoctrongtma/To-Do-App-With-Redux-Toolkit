import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/esm/Container';
import InputGroup from 'react-bootstrap/esm/InputGroup';
import FormControl from 'react-bootstrap/esm/FormControl';
import { ListOutline, CloseOutline, CheckmarkOutline, TrashOutline, EllipsisHorizontalOutline } from 'react-ionicons'
import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useSeletor, useDispatch } from 'react-redux';
import { handleAddToDo, handleToggleToDo, handleDeleteToDo } from '../redux/todoSlice';
import { useSelector } from 'react-redux/es/hooks/useSelector';
//======================================
function AppToDo() {
  const listToDo = useSelector(state => state.todos.list);
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState("All") // isShow have 3 state: All, Finish, Unfinish. default is All. use to show list to do
  const [jobName, setJobName] = useState(""); // save temporary name to add to list to do
  const inputRef = useRef();
  function handleAddJob() {
    if (jobName !== "") {
      dispatch(handleAddToDo(jobName))
      setJobName("");
      inputRef.current.focus();
    }
    else {
      alert("không được bỏ trống tên công việc")
    }
  }
  function handleToggleJob(jobID) { // set isDone property for job in listToDo.
    // handle toggle in here
    dispatch(handleToggleToDo(jobID))
  }
  function handleDeleteJob(jobID) {
    // handle delete in here
    dispatch(handleDeleteToDo(jobID))
    toast.success("Đã xóa thành công!")
  }
  return (
    <div className="App">
      <Container className="to-do-app-container">
        <div className="to-do-app-wrap">
          <div className="to-do-app__header">
            <h2>Todos</h2>
          </div>
          <div className="to-do-app__content">
            <div className="show-list-to-do">
              <ul>
                {isShow === "All" ?
                  listToDo.map((item, index) => {
                    return (
                      <li key={index} >
                        {item.isDone ?
                          <span className="job-name job-is-done">
                            {item.name}
                          </span>
                          : <span className="job-name">
                            {item.name}
                          </span>
                        }
                        <div >
                          {
                            item.isDone ?
                              <Button variant="success btn" onClick={() => { handleToggleJob(item.jobID) }}>
                                <CheckmarkOutline
                                  color={'#fff'}
                                  title={'Completed'}
                                  height="20px"
                                  width="20px"
                                />
                              </Button>
                              :
                              <Button variant="warning" onClick={() => { handleToggleJob(item.jobID) }}>
                                <EllipsisHorizontalOutline
                                  color={'#ffffff'}
                                  title={'Is Doing'}
                                  height="20px"
                                  width="20px"
                                />

                              </Button>
                          }
                          <Button variant="danger btn" >
                            <TrashOutline
                              color={'#fff'}
                              title={"Click to delete"}
                              height="20px"
                              width="20px"
                              onClick={() => { handleDeleteJob(item.jobID) }}
                            />
                          </Button>
                        </div>

                      </li>
                    );
                  })
                  : null}
                {isShow === "Finish" ?
                  listToDo.map((item, index) => {
                    if (item.isDone)
                      return (
                        <li key={index}>
                          <span className="job-name job-is-done">
                            {item.name}
                          </span>
                          <div >
                            <Button variant="success btn" onClick={() => { handleToggleJob(item.jobID) }}>
                              <CheckmarkOutline
                                color={'#fff'}
                                title={'Completed'}
                                height="20px"
                                width="20px"
                              />
                            </Button>
                            <Button variant="danger btn" >
                              <TrashOutline
                                color={'#fff'}
                                title={"Click to delete"}
                                height="20px"
                                width="20px"
                                onClick={() => { handleDeleteJob(item.jobID) }}
                              />
                            </Button>
                          </div>
                        </li>
                      );
                    else
                      return null
                  }) : null}
                {isShow === "Unfinish" ?
                  listToDo.map((item, index) => {
                    if (!item.isDone)
                      return (
                        <li key={index}>
                          <span className="job-name">
                            {item.name}
                          </span>
                          <div >
                            <Button variant="warning btn" onClick={() => { handleToggleJob(item.jobID) }}>
                              <EllipsisHorizontalOutline
                                color={'#fff'}
                                title={'Is Doing'}
                                height="20px"
                                width="20px"
                              />
                            </Button>
                            <Button variant="danger btn" >
                              <TrashOutline
                                color={'#fff'}
                                title={"Click to delete"}
                                height="20px"
                                width="20px"
                                onClick={() => { handleDeleteJob(item.jobID) }}
                              />
                            </Button>
                          </div>
                        </li>
                      );
                    else
                      return null
                  }) : null}
              </ul>
            </div>
          </div>
          <div className="to-do-app__footer">
            <InputGroup className="input--add_work">
              <FormControl
                ref={inputRef}
                placeholder="Add work in here"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={jobName}
                onChange={(e) => {
                  setJobName(e.target.value);
                }}
              />
              <Button variant="success" className="btn--add_work" onClick={() => {
                handleAddJob()
              }}>
                <span>+</span>
              </Button>
            </InputGroup>
            <div className="button-show-to-do-list-wrap">
              <ListOutline
                color={'#0f48cc'}
                height="35px"
                width="35px"
                title="Show to do list"
                className="btn-show"
                onClick={() => {
                  setIsShow("All")
                }}
              />
              <CloseOutline
                color={'#cc0f0f'}
                height="35px"
                width="35px"
                title="Job's not finished."
                className="btn-show"
                onClick={() => {
                  setIsShow("Unfinish")
                }}
              />
              <CheckmarkOutline
                color={'#0fcc12'}
                height="35px"
                width="35px"
                title="Job's finished."
                className="btn-show"
                onClick={() => {
                  setIsShow("Finish")
                }}
              />
            </div>
          </div>
        </div>
      </Container>
    </div >
  );
}

export default AppToDo;
