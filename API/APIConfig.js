import axios from "axios";

const baseUrl = "https://visit.cloudpub.in";
const apiKey = "LTExOkRDNkY3Q0NCMkRBRDQwQkI5QUYwOUJCRkYwN0MyNzNC";
const iBranchID = 1;
const FinancialPeriod = "2025-2026";

export const CRM_Login = async(username, password) => {
  try {
    const url = `${baseUrl}/api/CRM_Login?UserName=${encodeURIComponent(username)}&Password=${encodeURIComponent(password)}`;
    const response = await axios.post(url, null, {
      headers: {
        Authorization: `Basic ${apiKey}`,
      },
    });
    // console.log("Login response:", response.data); 
    return response.data[0]; 
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

export const GetStateData = async()=>{
    try {
    const url = `${baseUrl}/api/CRM_GetState`;
    const response = await axios.post(url, null, {
      headers: {
        Authorization: `Basic ${apiKey}`,
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

export const GetTradeNameList = async(actionType,Col1,Col2,Col3,Col4,Col5,Col6)=>{
    try {
    const url = `${baseUrl}/Master/GetCommonComboLoader?ActionType=${actionType}&Col1=${Col1}&Col2=${Col2}&Col3=${Col3}&Col4=${Col4}&Col5=${Col5}&Col6=${Col6}`;
    const response = await axios.post(url, null, {
      headers: {
        Authorization: `Basic ${apiKey}`,
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

export const GetBillingDetailsOfOrderEntry = async(actionType,companyId,Col1,Col2,Col3,Col4,Col5,Col6,Col7,Col8,Col9,Col10) =>{
  try {
    const url = `${baseUrl}/Master/GetCommonDataFromDB?iCompanyID=${companyId}&iBranchID=${iBranchID}&FinancialPeriod=${FinancialPeriod}&ActionType=${actionType}&Col1=${Col1}&Col2=${Col2}&Col3=${Col3}&Col4=${Col4}&Col5=${Col5}&Col6=${Col6}&Col7=${Col7}&Col8=${Col8}&Col9=${Col9}&Col10=${Col10}`;
    const response = await axios.post(url, null, {
      headers: {
        Authorization: `Basic ${apiKey}`,
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}


// Sales Over Screen
export const SalesOrder = async(actionType,companyId,col1,col2,col3,col4,col5,col6,userId) => {
    try {
        const url = `${baseUrl}/api/CRM_GetCommonComboLoader?ActionType=${actionType}&iCompanyID=${companyId}&Col1=${col1}&Col2=${col2}&Col3=${col3}&Col4=${col4}&Col5=${col5}&Col6=${col6}&UserID=${userId}`;
        const response = await axios.post(url,null,{
            headers:{
                Authorization:`Basic ${apiKey}`,
            }
        })
        return response.data;
    } catch (error) {
        console.error("Error during Sales Order:", error);
        throw error;
    }
}

export const GetCommonDataFromDatabase = async(actionType,companyId,col1,col2,col3,col4,col5,col6,col7,col8,col9,col10,userId)=>{
 try {
    const url = `${baseUrl}/api/CRM_GetCommonDataFromDB?ActionType=${actionType}&iBranchID=${iBranchID}&FinancialPeriod=${FinancialPeriod}&iCompanyID=${companyId}&Col1=${col1}&Col2=${col2}&Col3=${col3}&Col4=${col4}&Col5=${col5}&Col6=${col6}&Col7=${col7}&Col8=${col8}&Col9=${col9}&Col10=${col10}&UserID=${userId}`;
    const response = await axios.post(url,null,{
        headers:{
            Authorization:`Basic ${apiKey}`,
        }
    })
    console.log("GetCommonDataFromDatabase response:", response.data);
    return response.data;
 } catch (error) {
    console.error("Error during GetCommonDataFromDatabase:", error);
    throw error;
  }
}

export const FindCommonDataForEdit = async(actionType,companyId,loadId,userId)=>{
  try {
    const url = `${baseUrl}/api/CRM_FindCommonDataForEdit?ActionType=${actionType}&iCompanyID=${companyId}&LoadId=${loadId}&UserID=${userId}`;
    const response = await axios.post(url,null,{
        headers:{
            Authorization:`Basic ${apiKey}`,
        }
    })
    return response.data[0];
  } catch (error) {
      console.error("Error during FindCommonDataForEdit:", error);
      throw error;
    }
}

export const GetCommonDataForGrid = async(actionType,companyId,col1,col2,col3,col4,col5,col6,userId)=>{
  try {
    const url = `${baseUrl}/api/CRM_GetCommonDataForGrid?ActionType=${actionType}&iCompanyID=${companyId}&Col1=${col1}&Col2=${col2}&Col3=${col3}&Col4=${col4}&Col5=${col5}&Col6=${col6}&UserID=${userId}`;
    const response = await axios.post(url,null,{
        headers:{
            Authorization:`Basic ${apiKey}`,
        }
    })
    return response.data;
  } catch (error) {
      console.error("Error during GetCommonDataForGrid:", error);
      throw error;
    }
}

export const InsertOrderEntry = async(body)=>{
  try {
    const url = `${baseUrl}/api/CRM_InsertOrderEntry`;
    const response = await axios.post(url,body,{
        headers:{
            Authorization:`Basic ${apiKey}`,
        }
    })
    return response.data;
  } catch (error) {
      console.error("Error during InsertOrderEntry:", error);
      throw error;
    }
}

// School Visit Screen
export const InsertVisitEntryMaster = async(body)=>{
  try {
    const url = `${baseUrl}/api/CRM_InsertVisitEntryMaster`;
    const response = await axios.post(url, body,{
      headers:{
        Authorization: `Basic ${apiKey}`,
      }
    })
    return response.data;
  } catch (error) {
    console.error("Error during InsertVisitEntryMaster:", error);
    throw error;
  }
}

export const UpdateEnrollment = async(params)=>{
  try {
    const url = `${baseUrl}/api/CRM_UpdateEnrollment`;
    const response = await axios.post(url, null, {
      params: params,
      headers: {
        Authorization: `Basic ${apiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error during UpdateEnrollment:", error);
    throw error;
  }
}

// Sponsorship Screen
export const GetSponsorshipPhotoValidationData = async(actionType,execId)=>{
  try {
    const url = `${baseUrl}/Master/GetSponsorshipRequestApproval?ActionType=${actionType}&ExecutiveID=${execId}`;
    const response = await axios.post(url,null,{
        headers:{
            Authorization:`Basic ${apiKey}`,
        }
    })
    return response.data;
  } catch (error) {
      console.error("Error during GetSponsorshipData:", error);
      throw error;
    }
}

export const GetSchoolSponsorshipBusinessDetails = async(ActionType,LoadID) =>{
  try {
    const url = `${baseUrl}/Master/FindCommonDataForEdit?ActionType=${ActionType}&LoadId=${LoadID}`;
    const response = await axios.post(url, null, {
      headers: {
        Authorization: `Basic ${apiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error during GetSchoolDetails:", error);
    throw error;
  }
}

export const GetSalesStagesData = async(actionType,col1,col2,col3,col4,col5,col6)=>{
  try {
    const url = `${baseUrl}/Master/GetCommonComboLoader?ActionType=${actionType}&Col1=${col1}&Col2=${col2}&Col3=${col3}&Col4=${col4}&Col5=${col5}&Col6=${col6}`;
    const response = await axios.post(url, null, {
      headers: {
        Authorization: `Basic ${apiKey}`,
      },
    });       
    return response.data;
  } catch (error) {
    console.error("Error during GetSalesStagesData:", error);
    throw error;
  }
}

export const PreviousRecentCurrentSalesValue = async(actionType,schoolcode,col1)=>{
  try {
    const url = `${baseUrl}/Master/GetAllBusinessDetails?ActionType=${actionType}&SchoolCodes=${schoolcode}&Col1=${col1}`;
    const response = await axios.post(url, null, {
      headers: {
        Authorization: `Basic ${apiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error during PreviousRecentCurrentSalesValue:", error);
    throw error;
  }
}