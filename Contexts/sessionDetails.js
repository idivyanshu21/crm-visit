import { useEffect, useState } from "react";
import { getSession } from "./Session";

const useSessionDetails = () => {
    const [sessionDetails, setSessionDetails] = useState({
        ExecutiveID: "",
        UserID: "",
        UserName: "",
        ExecutiveName: "",
        GroupName: "",
        iCompanyID: ""
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getSession().then(session => {
            if (session && session.ExecutiveName) {
                setSessionDetails({
                    ExecutiveID: session.ExecutiveID,
                    UserID: session.UserID,
                    UserName: session.UserName,
                    ExecutiveName: session.ExecutiveName,
                    GroupName: session.GroupName,
                    iCompanyID: session.iCompanyID
                });
            } else {
              //  console.log("No session data available");
            }
            setIsLoading(false);
        }).catch(error => {
            console.error("Error fetching session details:", error);
            setIsLoading(false);
        });
    }, []);

    return sessionDetails;
};

export default useSessionDetails;
