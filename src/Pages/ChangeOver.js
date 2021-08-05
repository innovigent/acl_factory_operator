import React, {useEffect,useState,useRef} from 'react';
import "../assets/css/Usercreate.css";
import "../assets/css/chooseButton.css";
import "../assets/css/operatorfrm.css";
import { makeStyles } from '@material-ui/core/styles';
import { css } from '@emotion/css' ;
import TopNav from "../components/topnav/TopNav";
import axios from "axios";
import {Alert, AlertTitle} from "@material-ui/lab";



function createData(name,empty) {
    return { name,empty};
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

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

    const classes = useStyles();
    const macaddress = localStorage.getItem('macaddress')
    const [epfNo, setepfNo] = useState("");
    const [timerDays, setTimerDays] = useState("00");
    const [timerHours, setTimerHours] = useState("00");
    const [timerMinutes, setTimerMinutes] = useState("00");
    const [timerSeconds, setTimerSeconds] = useState("00");
    const [err, setErr] = useState("");

    let interval = useRef();

    const startTimer = (countdownDate) => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
            clearInterval(interval.current);
        } else {
            setTimerDays(days);
            setTimerHours(hours);
            setTimerMinutes(minutes);
            setTimerSeconds(seconds);
        }
    };

    function saveInLocalStorage(time) {
        localStorage.setItem("timer", time);
    }

    function getTimeFromLocalStorage() {
        return localStorage.getItem("timer");
    }

    useEffect(() => {
        const localTimer = getTimeFromLocalStorage();

        if (localTimer) {
            interval.current = setInterval(() => {
                startTimer(+localTimer);
            }, 1000);
        } else {
            const countdownDate = new Date().getTime() + 14 * 24 * 60 * 1000;
            saveInLocalStorage(countdownDate);
            interval.current = setInterval(() => {
                startTimer(+countdownDate);
            }, 1000);
        }

        return () => clearInterval(interval.current);
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        try{
            const body = {epfNo,macaddress};
            const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/createproductionrunIPC/1/create",body);

        } catch(err) {
            err.response.data.message && setErr(err.response.data.message)
        }

    };

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
                            <div className="textFieldContainer1"></div>{/* to make space*/ }
                            <div className="textFieldContainer1">
                                <label htmlFor="orderNo">Product Order No.</label>
                                <input
                                    className="a"
                                    placeholder=""
                                    type="text"
                                    name=""
                                />
                            </div>
                            <div className="textFieldContainer1">
                                <label htmlFor="epf">Operator Epf No.</label>
                                <input
                                    className="a"
                                    placeholder=""
                                    type="text"
                                    name=""
                                    value={epfNo}
                                    onChange={(e) => setepfNo(e.target.value)}
                                />
                            </div>
                                <div className="textFieldContainer1"></div>{/* to make space*/ }
                                    <div className="textFieldContiner1"></div>{/* to make space*/ }
                                        <button  onClick={submit}  className="submita">submit</button>
                                    <div className="textFieldContiner1"></div>{/* to make space*/ }
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