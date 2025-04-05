import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const currencySymbol = '₦'
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [consultants, setConsultants] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    const [userData, setUserData] = useState(false)

    // Chatbot states
    const [chatbotOpen, setChatbotOpen] = useState(false)
    const [chatMessages, setChatMessages] = useState(() => {
        // Load from localStorage if available
        const saved = localStorage.getItem('chatMessages');
        return saved ? JSON.parse(saved) : [
            { text: "Hi! How can I assist you with your mental health today?", sender: "bot" }
        ]
    })
    const [isBotTyping, setIsBotTyping] = useState(false)

    // Fetch consultants with duplicate prevention
    const getConsultantsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/consultant/list')
            if (data.success) {
                // Filter out duplicates by consultant ID
                const uniqueConsultants = data.consultants.filter(
                    (consultant, index, self) =>
                        index === self.findIndex((c) => c._id === consultant._id)
                )
                setConsultants(uniqueConsultants)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error("Consultant fetch error:", error)
            toast.error("Failed to load consultants. Please try again later.")
        }
    }

    // Load user data with error handling
    const loadUserProfileData = async () => {
        try {
            if (!token) {
                setUserData(false)
                return
            }

            const { data } = await axios.get(backendUrl + '/api/user/get-profile', {
                headers: { token }
            })

            if (data.success) {
                setUserData(data.userData)
                // Save to localStorage if needed
                localStorage.setItem('userData', JSON.stringify(data.userData))
            } else {
                toast.error(data.message)
                setToken(false)
                localStorage.removeItem('token')
            }
        } catch (error) {
            console.error("Profile load error:", error)
            toast.error("Failed to load user profile")
            setToken(false)
            localStorage.removeItem('token')
        }
    }

    const sendChatMessage = async (message) => {
        try {
            setIsBotTyping(true);
            console.log("Sending message:", message); // Add this log

            const { data } = await axios.post(
                `${backendUrl}/api/user/chatbot`,
                {
                    message,
                    userId: userData?._id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    timeout: 5000 // 5 second timeout
                }
            );

            console.log("Received response:", data); // Add this log

            if (!data.success) {
                throw new Error(data.message || "Unknown error from server");
            }

            return data;
        } catch (error) {
            console.error("Chat API Error:", error.response?.data || error.message);

            // More specific error messages
            let errorMessage = "Sorry, I'm having trouble responding. Please try again later.";

            if (error.response) {
                if (error.response.status === 401) {
                    errorMessage = "Please login to continue chatting";
                } else if (error.response.status === 500) {
                    errorMessage = "Server error. Please try again later.";
                }
            } else if (error.message.includes("timeout")) {
                errorMessage = "Request timed out. Please check your connection.";
            }

            toast.error(errorMessage);
            return {
                response: errorMessage,
                needsConsultant: false
            };
        } finally {
            setIsBotTyping(false);
        }
    };
    // Persist chat messages to localStorage
    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(chatMessages))
    }, [chatMessages])

    // Initialize data
    useEffect(() => {
        getConsultantsData()
        if (token) loadUserProfileData()
    }, [])

    // Watch token changes
    useEffect(() => {
        if (token) {
            loadUserProfileData()
        } else {
            setUserData(false)
        }
    }, [token])

    const value = {
        consultants,
        getConsultantsData,
        currencySymbol,
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData,
        chatbotOpen,
        setChatbotOpen,
        chatMessages,
        setChatMessages,
        isBotTyping,
        sendChatMessage
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider