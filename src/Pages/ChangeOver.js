import React, {useEffect,useState,useRef} from 'react';
import "../assets/css/Usercreate.css";
import "../assets/css/chooseButton.css";
import "../assets/css/operatorfrm.css";
import { makeStyles } from '@material-ui/core/styles';
import { css } from '@emotion/css' ;
import TopNav from "../components/topnav/TopNav";
import axios from "axios";
import {Alert, AlertTitle} from "@material-ui/lab";
import CreatableSelect from "react-select/creatable/dist/react-select.esm";
import { useHistory } from 'react-router-dom';
import txt from "C:/Users/Gayath/OneDrive/Documents/token.txt";
import {HashLoader} from "react-spinners";

const SingleValue = ({
                         cx,
                         getStyles,
                         selectProps,
                         data,
                         isDisabled,
                         className,
                         ...props
                     }) => {
    console.log(props);
    return (
        <div
            className={cx(
                css(getStyles("singleValue", props)),
                {
                    "single-value": true,
                    "single-value--is-disabled": isDisabled,

                },
                className
            )}
        >
            <div>{selectProps.getOptionLabel(data)}</div>
        </div>
    );
};


const Changeover = () => {

    const history = useHistory();
    const [listData, setListData] = useState({ lists: [] });
    const [text,setText] = useState("");
    const epfNo = localStorage.getItem('epfno');
    const [productionId, setproductionId] = useState("");
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(true);
    const [podata,setpodata] = useState([])


    //
    // useEffect(()=>{
    //     setLoading(true)
    //     axios(txt).then(res => setText(res.data)); // This will have your text inside data attribute
    // },[])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const token = await axios(txt);

            const tokentxt = token.data
            setText(token.data)
            setLoading(false);
        };
        const fetchData1 = async () => {
            setLoading(true);

            const token = await axios(txt);

            const tokentxt = token.data
            const headers = {

                headers: {

                    "Authorization":`Bearer ${tokentxt}`
                }
            };
            const result = await axios(
                `https://acl-automation.herokuapp.com/api/v1/ProductionOrderscontroller/listproductorderIPC/${tokentxt}/getall`,headers,
            );
            setListData({ lists: result.data.data.productionOrders});
            setLoading(false);
        };


        fetchData();
        fetchData1();

    }, []);

    let options = listData.lists.map(function (city) {
        return {value: city.id, label: city.productionorderCode};
    })

    const submit = async (e) => {
        e.preventDefault();
        const token = await axios(txt);

        const tokentxt = token.data
        const headers = {

            headers: {

                "Authorization":`Bearer ${tokentxt}`
            }
        };
        setErr("");
        try{
            const body = {epfNo,productionId};
            const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/createproductionrunIPC/1/create",body,headers);
            localStorage.setItem("productionrunId", loginResponse.data.data.id);
            history.push("/Home")
        } catch(err) {
            err.response.data.message && setErr(err.response.data.message)
        }

    };

    function removeDuplicates(arr) {
        arr.forEach(value => podata.push({value: value.id, label: value.productionorderCode}))
        console.log(podata)
    };

    const handleChange = (newValue: any, actionMeta: any) => {

        let value = newValue.value;

        setproductionId(value);

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
                                <label htmlFor="orderNo">Product Order No.</label>
                                <CreatableSelect
                                    options={options}
                                    className="orderNo"
                                    components={{SingleValue}}
                                    onChange={handleChange}
                                    isValidNewOption={() => false}
                                    // styles={customStyles}
                                    styles={{
                                        menu: (provided, state) => ({
                                            ...provided,
                                            width: "90%",
                                            padding: 30,
                                        }),
                                        singleValue: (provided, state) => ({
                                            ...provided,
                                            display: "flex",
                                            alignItems: "center",
                                            opacity: 0.5
                                        })
                                    }}
                                />
                                {/*<input*/}
                                {/*    className="a"*/}
                                {/*    placeholder=""*/}
                                {/*    type="text"*/}
                                {/*    name=""*/}
                                {/*    value={productionId}*/}
                                {/*    onChange={(e) => setproductionId(e.target.value)}*/}
                                {/*/>*/}
                            </div>
                            <div className="textFieldContainer1">
                                <label htmlFor="epf">Operator Epf No.</label>
                                <input
                                    className="a"
                                    placeholder=""
                                    type="text"
                                    name=""
                                    value={epfNo}
                                    disabled
                                />
                            </div>
                            <div className="textFieldContainer1"></div>
                            {/* to make space*/}
                            <div className="textFieldContiner1"></div>
                            {/* to make space*/}
                            <button onClick={submit} className="submita">submit</button>
                            <div className="textFieldContiner1"></div>
                            {/* to make space*/}
                            <br/>
                        </div>
                    </div>
                </div>
                <TopNav/>
            </div>
        </>
    )
}

export default Changeover