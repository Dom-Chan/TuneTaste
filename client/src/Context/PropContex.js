import { createContext, useReducer, useContext } from "react";
import propReducer, {initialState} from "./propReducer";

const PropContext = createContext(initialState)

export const PropProvider = ({children}) => {
    const [state, dispatch] = useReducer(propReducer, initialState)

    const setAccessToken = (access_token) => {
              
        dispatch({
            type: "SET_ACCESS_TOKEN",
            payload: access_token
        })
        
    }

    const setUser = (user) => {
              
        dispatch({
            type: "SET_USER",
            payload: user
        })
        
    }

    const setUserID = (userID) => {
              
        dispatch({
            type: "SET_USER_ID",
            payload: userID
        })
        
    }

    const setSidePanelValue = (sidepanel_value) => {
                
        dispatch({
            type: "SET_ACTIVE_BUTTON_VALUE",
            payload: sidepanel_value
        })
        
    }

    const setSideButtonActivelValue = (sidebutton_value) => {
        
 
        dispatch({
            type: "SET_SIDEPANEL_VALUE",
            payload: sidebutton_value
        })
        
    }

    const setNavlinkActivelValue = (navlink_value) => {
        

        dispatch({
            type: "SET_ACTIVE_NAVLINK_VALUE",
            payload: navlink_value
        })
        
    }

    const setDevice = (device) => {
        

        dispatch({
            type: "SET_DEVICE",
            payload: device
        })
        
    }

    const setCountry = (country) => {
        

        dispatch({
            type: "SET_COUNTRY",
            payload: country
        })
        
    }

    const setSubscription = (subscription) => {
        
        
        dispatch({
            type: "SET_SUBSCRIPTION",
            payload: subscription
        })
        
    }

    const setPlaying = (playing) => {
        
        
        dispatch({
            type: "SET_PLAYING",
            payload: playing
        })
        
    }

    

    const value = {
        setAccessToken,
        access_token: state.access_token,
        setUser,
        user: state.user,
        setUserID,
        userID: state.userID,
        setSidePanelValue,
        sidepanel_value: state.sidepanel_value,
        setSideButtonActivelValue,
        isButtonActive_value: state.isButtonActive_value,
        setNavlinkActivelValue,
        isNavlinkActive_value: state.isNavlinkActive_value,
        setDevice,
        device: state.device,
        setCountry,
        country: state.country,
        setSubscription,
        subscription: state.subscription,
        setPlaying,
        playing: state.playing

    }

    return <PropContext.Provider value={value}>{children}</PropContext.Provider>
}

const useProps = () => {
    const context = useContext(PropContext)
    return context
}

export default useProps