import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveSession = async (data) => {
    // console.log("saveSessionData",data)
    const ExecutiveId = data["UserID"] ? data["UserID"].toString() : "";
    const iCompanyID = data["iCompanyID"] ? data["iCompanyID"].toString() : "";
    const UserName = data["Username"] ? data["Username"].toString() : "";
    const ExecutiveName = data["ExecutiveName"] ? data["ExecutiveName"].toString() : "";
    const GroupName = data["ExecutiveDesignation"] ? data["ExecutiveDesignation"].toString() : "";
//    console.log('-------------->',data,'====', ExecutiveId,iCompanyID,UserName,ExecutiveName,GroupName )
    try {
        await AsyncStorage.setItem('ExecutiveID',ExecutiveId);
        await AsyncStorage.setItem('UserID',ExecutiveId);
        await AsyncStorage.setItem('UserName', UserName);
        await AsyncStorage.setItem('ExecutiveName',ExecutiveName);
        await AsyncStorage.setItem('GroupName',GroupName);
        await AsyncStorage.setItem('iCompanyID',iCompanyID);
    } catch (error) {
        console.error('Failed to save session data', error);
    }
};

export const getSession = async () => {
    try {
        const session = {
            SessionID: await AsyncStorage.getItem('SessionID'),
            UserID: await AsyncStorage.getItem('UserID'),
            ExecutiveID: await AsyncStorage.getItem('ExecutiveID'),
            UserName: await AsyncStorage.getItem('UserName'),
            ExecutiveName: await AsyncStorage.getItem('ExecutiveName'),
            GroupName: await AsyncStorage.getItem('GroupName'),
            iCompanyID: await AsyncStorage.getItem('iCompanyID'),
        };
        return session;
    } catch (error) {
        console.error('Failed to retrieve session data', error);
        return null;
    }
};

export const clearSession = async () => {
    try {
        await AsyncStorage.multiRemove([
            'SessionID',
            'UserID',
            'ExecutiveID',
            'UserName',
            'ExecutiveName',
            'GroupName',
            'iCompanyID',
        ]);
    } catch (error) {
        console.error('Failed to clear session data', error);
    }
};
