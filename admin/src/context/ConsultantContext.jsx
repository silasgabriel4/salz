import { createContext } from "react";

export const ConsultantContext = createContext()

const ConsultantContextProvider = (props)=>{

    const value = {

    }

    return(
        <ConsultantContext.Provider value={value}>
            {props.children}
        </ConsultantContext.Provider>
    )

}

export default ConsultantContextProvider