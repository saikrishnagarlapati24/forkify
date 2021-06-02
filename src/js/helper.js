import {TIMEOUT_SEC} from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long brooo! Timeout after ${s} second`));
    }, s * 1000);
  });
}; 


//combining both the send and get methods
export const AJAX = async function(url, uploaddata = undefined){
  try{
    const res = await Promise.race([uploaddata ? fetch(url, {//sending the data to the api
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(uploaddata),
    }) : fetch(url), timeout(TIMEOUT_SEC)]);
    if(!res.ok){
      throw new Error();
    }
    const data = await res.json();
    return data;
  }
  catch(err){
    throw err;
  }
};

// export const getJSON = async function(url){
//   try{
//     const res = await Promise.race([fetch(url),timeout(TIMEOUT_SEC)]);
//     if(!res.ok){
//       throw new Error();
//     }
//     const data = await res.json();
//     return data;
//   }
//   catch(err){
//     throw err;
//   }
// };

// export const sendJSON = async function(url, uploaddata){
//   try{
//     const res = await Promise.race([fetch(url, {//sending the data to the api
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(uploaddata),
//     }),timeout(TIMEOUT_SEC)]);

//     if(!res.ok){
//       throw new Error();
//     }
//     const data = await res.json();//the api returns the data that we just sent
//     return data;
//   }
//   catch(err){
//     throw err;
//   }
// };

