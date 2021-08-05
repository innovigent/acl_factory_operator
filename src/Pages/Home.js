import React, {useEffect,useState,useRef} from 'react';
import "../assets/css/Usercreate.css";
import { makeStyles } from '@material-ui/core/styles';
import { css } from '@emotion/css' ;
import CreatableSelect from 'react-select/creatable';
import TopNav from "../components/topnav/TopNav";



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


const FaultDetection = () => {
    const classes = useStyles();
    const [Product, setProduct] = useState("");
    const [timerDays, setTimerDays] = useState("00");
    const [timerHours, setTimerHours] = useState("00");
    const [timerMinutes, setTimerMinutes] = useState("00");
    const [timerSeconds, setTimerSeconds] = useState("00");

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





    // create a preview as a side effect, whenever selected file is changed


    // function validateForm() {
    //     return email.length > 0 && password.length > 0;
    // }
    // const handleChange = (event) => {
    //     setType(event.target.value);
    // };
    // const imagehandleChange = (event) => {
    //     setImage(event.target.files[0]);
    // };

    function handleSubmit(event) {
        event.preventDefault();
    }

    // const onSelectFile = e => {
    //     if (!e.target.files || e.target.files.length === 0) {
    //         setSelectedFile(undefined)
    //         return
    //     }

    //     // I've kept this example simple by using the first image instead of multiple
    //     setSelectedFile(e.target.files[0])
    // }

    return (
        <>

            <div id="container">
                <div className="position">
                    <div className="card full-height">
                        <div className="textFieldContainer1">
                            {/* <div className="right-corner">Date:</div> */}
                                <div className="left-corner">Status:</div>
                            </div>
                            <div className="textFieldContainer1"></div>{/* to make space*/ }
                                <div className="textFieldContainer1">
                                    <label htmlFor="productionorder">Production Order</label>
                                    <label htmlFor="productionorder">Production Order</label>
                                    </div>
                                    <div className="textFieldContainer1">
                                    <label htmlFor="productionorder">Product</label>
                                        <label htmlFor="productionorder">Product</label>
                                    </div>
                        <div className="textFieldContainer1">
                            <label htmlFor="productionorder">Machine speed</label>
                            <label htmlFor="productionorder">Machine speed</label>
                        </div>
                        <div className="textFieldContainer1">
                            <label htmlFor="productionorder">Planned total</label>
                            <label htmlFor="productionorder">Planned total</label>
                        </div>
                                    <div className="textFieldContainer1"></div>{/* to make space*/ }
                                    <div className="textFieldContainer1"></div>{/* to make space*/ }
                                <div className="textFieldContainer1"></div>{/* to make space*/ }
                            </div>
                        </div>
                <TopNav/>
            </div>
        </>
    )
}

export default FaultDetection