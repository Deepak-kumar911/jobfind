import { createContext, useEffect, useReducer } from "react";
import { Navbar } from "./common/navbar";
import { Job } from "./pages/job";
import { JobCard } from "./component/mainCard";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Createjob } from "./component/createjob";
import { EmployeeProfile } from "./pages/employeeProfile";
import { EmployerProfile } from "./pages/employerProfile";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { Home } from "./pages/Home";
import jwtDecode from 'jwt-decode';
import { reducer, initial } from './services/reducer';
import { ProfileCard } from "./component/profileCard";
import { DeleteAccount } from "./pages/DeleteAccount";
import {Logout} from './pages/Logout';
import { AllJobs } from "./pages/AllJobs";
import { PendingRequest } from "./pages/PendingRequest";
import { ViewAllJobs } from "./pages/ViewAllJobs";
import { ApplyJob } from "./pages/ApplyJob";




const authProvider = createContext()
function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [state, dispatch] = useReducer(reducer, initial)
  useEffect(() => {
    function fetch() {
      // if (!token) {
      //   navigate("/login") || navigate("/register")
      // } else 
      if (token) {
        const decode = jwtDecode(localStorage.getItem("token"))
        dispatch({ type: "auth", payload: decode })
        if (!decode.profileStatus && decode.employee) {
          navigate("/employee profile")
    console.log("calling app useeffect employee");
        } else if (!decode.profileStatus) {
          navigate("/employer profile")
        }
      }
    } fetch()
    console.log("calling app useeffect");
  }, [token, navigate])

  console.log("state",state);

  return (
    <authProvider.Provider value={state}>
      <div className="App">
        {state && state.profileStatus ? <Navbar /> : ""}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/job" element={<Job />} />
          <Route path="/view job/:target" element={<JobCard />} />
          <Route path="/view job/:target/:job_id/:employer_id" element={<JobCard />} />
          <Route path="/view profile/:target/:job_id" element={<ProfileCard/>} />
          <Route path="/create job" element={<Createjob />} />
          <Route path="/view posted jobs" element={<AllJobs/>}/> 
          <Route path="/view all jobs" element={<ViewAllJobs/>}/> 
          <Route path="/view apply jobs" element={<ApplyJob/>}/>
          <Route path="/pending request" element={<PendingRequest/>}/>
          <Route path="/employer profile" element={<EmployerProfile />} />
          <Route path="/employee profile" element={<EmployeeProfile />} />
          <Route path="/profile/:path" element={<EmployeeProfile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/delete account/:target" element={<DeleteAccount/>} />
          <Route path="*" element={<h1>Not found! 404</h1>} />
        </Routes>
      </div>
    </authProvider.Provider>
  );
}

export default App;
export { authProvider }
