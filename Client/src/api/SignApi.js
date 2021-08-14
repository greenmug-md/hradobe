/**
 * SignApi class
 */

import qs from "qs";
import config from "../utils/config";
import AxiosInstance from "./AxiosInstance";
import AxiosInstanceSign from "./AxiosInstanceSign";
import Contract from "./Contract";

let axios = AxiosInstanceSign.getInstanceSign();
let axiosLocal = AxiosInstance.getInstance();
async function refreshToken() {
  let data = qs.stringify({
    client_id: config.CLIENT_ID,
    client_secret: config.CLIENT_SECRET,
    refresh_token: config.REFRESH_TOKEN,
    grant_type: "refresh_token",
  });

  let value = await axios.post(config.REFRESH_URL, data, {
    headers: {
      "Content-Type": config.CONTENT_TYPE_ENCODED
    },
  });

  return value;
}

async function getAgreement(filename, email, role, id,contractname) {
  var access = await refreshToken();
  var token = access.data["access_token"];
  await axiosLocal.post("/contract/filedata", {
    filename,
    token,
    email,
    role,
    id,
    contractname
  });
}

let generate = async (id, role, status) => {
  await Contract.updateContractStatus({
    id: id,
    status: status,
    role: role,
  });
};

async function getSigningUrl(agreement, id, role) {
  var access = await refreshToken();
  var token = access.data["access_token"];
  let value = await axios.get(config.AGREEMENT_URL+agreement,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  if (value.data.status === "SIGNED") {
     generate(id, role, "SIGNED");
  } else {
    let value = await axios.get(
        config.AGREEMENT_URL+agreement+"/signingUrls",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if( value.data && value.data.signingUrlSetInfos[0] &&  value.data.signingUrlSetInfos[0].signingUrls[0]) {
    window.location.assign(
      value.data.signingUrlSetInfos[0].signingUrls[0].esignUrl
    );
    }
  }
}

 

export default {
  refreshToken,
  getAgreement,
  getSigningUrl,
  generate,
};
