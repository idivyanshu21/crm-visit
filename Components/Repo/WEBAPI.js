 
//let BASEURL = "https://visit.cloudpub.in/api";
let BASEURL = "https://cruel-ants-create.loca.lt/api";


export function getStringListSelectedFilter(action, selectedFilterList) {
  let index = -1;
  console.log(selectedFilterList);
  try {
    index = selectedFilterList.findIndex((x) => x.actionType === action);
  } catch (e) {
    console.log(e);
  }

  if (index != -1) {
    let str = "";
    selectedFilterList[index].filterDataList.map((data) => {
      str == "" ? (str = data.Code) : (str = str + "," + data.Code);
    });
    console.log(str);
    return str;
  } else {
    return "";
  }
}
export function GetUnApprovedOrders(ActionType, RequestNo, ExecutiveID, iCompanyID, UserID, TransactionID) {
  var base64 = require("base-64");
  let headers = new Headers();
  headers.append(
    "Authorization",
    "Basic " + base64.encode("-11" + ":" + "DC6F7CCB2DAD40BB9AF09BBFF07C273B")
  );
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  // ✅ Ensure BASEURL ends with `/`
  const url = `${BASEURL}/CRM_GetSelfStockRequestApproval`;

  console.log("API URL:", url); // ✅ Debug URL before making request
  console.log("Request Body:", JSON.stringify({ ActionType, RequestNo, ExecutiveID, iCompanyID, UserID, TransactionID }));

  return fetch(url, {
    headers: headers,
    method: "POST",
    body: JSON.stringify({ 
      ActionType, 
      RequestNo, 
      ExecutiveID, 
      iCompanyID, 
      UserID, 
      TransactionID 
    }),
  })
    .then(async (response) => {
      console.log("HTTP Status:", response.status);
      console.log("Response Headers:", response.headers);
      
      const responseText = await response.text(); // Read response body as text
      console.log("Response Body:", responseText);
      
      if (response.ok) {
        return JSON.parse(responseText);
      } else {
        throw new Error(`API Error: ${response.status} - ${responseText}`);
      }
    })
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error("API Request Error:", error);
      return { Result: "ERROR" };
    });
}
// headers: {
//   'Accept': 'application/json',
//   'Content-Type': 'application/json'
// } 

