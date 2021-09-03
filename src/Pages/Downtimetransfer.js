import React, {useEffect, useState} from 'react';
import "../assets/css/Usercreate.css";
import "../assets/css/chooseButton.css";
import "../assets/css/operatorfrm.css";
import "../assets/css/Login.css";
import {useHistory, useLocation} from 'react-router-dom';
import {Alert, AlertTitle} from '@material-ui/lab';
import axios from 'axios';
import TopNav from "../components/topnav/TopNav";
import {HashLoader} from "react-spinners";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import txt from "C:/Users/Gayath/OneDrive/Documents/token.txt";

const DowntimeReason = () => {

    const history = useHistory();
    const location = useLocation();
    const [downtimeId, setdowntimeId] = useState('');
    const [Product, setProduct] = useState('');
    const [Department, setDepartment] = useState('');
    const [reportedExecutiveId, setreportedExecutiveId] = useState('');
    const [tospecialCaseId, settospecialCaseId] = useState('');
    const [reasonId, setreasonId] = useState('');
    const [name, setname] = useState('');
    const [permissionId, setpermissionId] = useState('');
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(true);
    const macaddress = localStorage.getItem('macaddress');
    const productionrunId = +localStorage.getItem('productionrunId');
    const [listData, setListData] = useState({lists: []});
    const [listData1, setListData1] = useState({lists: []});


    function validateForm() {
        return tospecialCaseId.length > 0;
    }

    useEffect(() => {
        const data = location.state;
        const executive = location.executive;
        const name = location.name;
        const permissionId = location.permissionId;
        console.log(data)
        setdowntimeId(data.id)
        setreportedExecutiveId(executive)
        setname(name)
        setpermissionId(permissionId)
        setLoading(false);
    }, []);

    useEffect(() => {

        const fetchData = async () => {
            const token = await axios(txt);

            const tokentxt = token.data
            const headers = {

                headers: {

                    "Authorization":`Bearer ${tokentxt}`
                }
            };
            const result1 = await axios(
                `https://acl-automation.herokuapp.com/api/v1/specialcasescontrollerdevice/${macaddress}/getall`,headers,
            );
            setListData1({lists: result1.data.data.specialCase});
            setLoading(false);
        };

        fetchData();
    }, []);

    const submit = async (e) => {
        //e.preventDefault();
        const token = await axios(txt);

        const tokentxt = token.data
        const headers = {

            headers: {

                "Authorization":`Bearer ${tokentxt}`
            }
        };
        setErr("");
        try {
            const body = {
                macaddress,
                downtimeId,
                reportedExecutiveId,
                reasonId,
                productionrunId,
                permissionId,
                tospecialCaseId
            };
            const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/transferreasoning/create", body,headers);
            history.push("/Home")

        } catch (err) {
            err && setErr(err)
        }
    };

    if (loading) {
        return (
            <div style={{
                padding: "10px 20px",
                textAlign: "center",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                width: "100%",
                height: "100vh",
                backgroundColor: "#FFFFFF"
            }}>
                <HashLoader loading={loading} size={150}/>
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
                                        <label>Special Case</label>
                                        <select value={tospecialCaseId}
                                                onChange={(e) => settospecialCaseId(e.target.value)}>
                                            <option value="" selected>please select Reason</option>
                                            {listData1.lists.map((country, key) => (
                                                <option key={key} value={country.id}>
                                                    {country.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="textFieldContainer1">
                                        <label>Executive name</label>
                                        <input value={name} disabled></input>
                                    </div>
                                    <div className="textFieldContainer1"></div>
                                    {/* to make space*/}
                                    <div className="textFieldContainer1"></div>
                                    {/* to make space*/}
                                    <button onClick={submit} disabled={!validateForm()} className="submita">submit
                                    </button>
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