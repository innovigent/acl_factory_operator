import React, {useState} from 'react';
import "../assets/css/Usercreate.css";
import "../assets/css/chooseButton.css";
import "../assets/css/operatorfrm.css";
import "../assets/css/Login.css";
import { useHistory } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';
import axios from 'axios';


const Login = () => {

    const [Epf, setEpf] = useState("");
    const [Employeeno, setEmployeeno] = useState("");
    const [err, setErr] = useState("");
    const history = useHistory();

    function validateForm() {
        return Epf.length > 0 && Employeeno.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    const submit = async (e) => {
        //e.preventDefault();
        setErr("");

        try{

            localStorage.setItem("epfno", Epf);
            localStorage.setItem("empid", Employeeno);
            history.push("/Changeover")

        } catch(err) {
            err && setErr(err)
        }
    };

    return (
        <>

            <div className="layout__content-main">

                <div id="loginform">
                    <h2 id="headerTitle">Login</h2>
                    <div>
                        {err ? (
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                {err}
                            </Alert>
                        ) : null}
                        <div className="rowlogin">
                            <label>EPF no</label>
                            <input type="number" min="0"  autoFocus placeholder="Enter your epf no" value={Epf}  onChange={(e) => setEpf(e.target.value)} />
                        </div>
                        <div className="rowlogin">
                            <label>Employye Id</label>
                            <input type="number" min="0" placeholder="Enter your employee number" value={Employeeno}  onChange={(e) => setEmployeeno(e.target.value)} />
                        </div>


                        <div id="button" className="rowlogin">
                            <button disabled={!validateForm()} onClick={submit}>Log in</button>
                        </div>
                    </div>
                    <div id="alternativeLogin">


                    </div>
                </div>
            </div>

        </>
    )
}

export default Login