import React, {useEffect, useState} from 'react';
import "../assets/css/Usercreate.css";
import "../assets/css/chooseButton.css";
import "../assets/css/operatorfrm.css";
import "../assets/css/Login.css";
import {useHistory, useLocation} from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';
import axios from 'axios';
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import TopNav from "../components/topnav/TopNav";
import {HashLoader} from "react-spinners";


const DowntimeReason = () => {

    const history = useHistory();
    const location = useLocation();
    const [downtimeId, setdowntimeId] = useState('');
    const [Product, setProduct] = useState('');
    const [Department, setDepartment] = useState('');
    const [reportedExecutiveId ,setreportedExecutiveId] = useState('');
    const [reasonId, setreasonId] = useState('');
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(true);
    const macaddress = localStorage.getItem('macaddress');
    const productionrunId = +localStorage.getItem('productionrunId');
    const [listData, setListData] = useState({ lists: [] });


    function validateForm() {
        return reportedExecutiveId.length > 0;
    }

    useEffect(() => {
        const data = location.state;
        const executive = location.executive;
        console.log(data)
        setdowntimeId(data.id)
        setreportedExecutiveId(executive)
        setLoading(false);
    }, []);

    useEffect(() => {

        const fetchData = async () => {
            const result = await axios(
                `https://acl-automation.herokuapp.com/api/v1/faultreason/device/${macaddress}/getall`,
            );
            setListData({ lists: result.data.data.FaultReasonsDetails});
            setLoading(false);
        };

        fetchData();
    }, []);

    const submit = async (e) => {
        //e.preventDefault();
        setErr("");
        try{
            const body = {macaddress,downtimeId,reportedExecutiveId,reasonId,productionrunId};
            const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/SubmitFaultReason/create",body);
            history.push("/Home")

        } catch(err) {
            err && setErr(err)
        }
    };

    if (loading) {
        return (
            <div style={{ padding: "10px 20px", textAlign: "center", justifyContent:"center", display:"flex", alignItems:"center", width:"100%", height:"100vh", backgroundColor:"#FFFFFF"}}>
                <HashLoader  loading={loading}  size={150} />
            </div>
        )
    }
    return (
        <>
            <div className="layout__content-main">
                <div className="row">
                    <div className='col-12'>
                        <div className="position">
                            <div className="card full-height">
                                <div>
                                    {err ? (
                                        <Alert severity="error">
                                            <AlertTitle>Error</AlertTitle>
                                            {err}
                                        </Alert>
                                    ) : null}
                                    <div className="textFieldContainer1">
                                        <div className="right-corner">Date:</div>
                                        <div className="middle">Line No:</div>

                                        <div className="left-corner">Status:</div>
                                    </div>
                                    <div className="textFieldContainer1"></div>
                                    {/* to make space*/}
                                    <div className="textFieldContainer1">
                                        <label>Production order</label>
                                        <input value={productionrunId} disabled></input>
                                    </div>
                                    <div className="textFieldContainer1">
                                        <label>Reason</label>
                                        <select  value={reasonId} onChange={(e) => setreasonId(e.target.value)} >
                                            <option value=""  selected>please select Reason</option>
                                            {listData.lists.map((country, key) => (
                                                <option key={key} value={country.id}>
                                                    {country.faultreason}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="textFieldContainer1">
                                        <label>Executive ID</label>
                                        <input value={reportedExecutiveId} disabled></input>
                                    </div>
                                    <div className="textFieldContainer1"></div>
                                    {/* to make space*/}
                                    <div className="textFieldContainer1"></div>
                                    {/* to make space*/}
                                    <button onClick={submit} className="submita">submit</button>
                                    <div className="textFieldContainer1"></div>
                                    {/* to make space*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <TopNav/>
            </div>
        </>
    )
}

export default DowntimeReason