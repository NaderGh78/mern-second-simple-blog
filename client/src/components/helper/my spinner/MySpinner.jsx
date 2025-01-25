import "./mySpinners.css";
import { Oval } from "react-loader-spinner";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const MySpinner = () => {
    return (
        <div className="my-spinner">
            <span>
                <Oval
                    height={100}
                    width={100}
                    color="#000"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="grey"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                />
            </span>
        </div>
    )
}

export default MySpinner;