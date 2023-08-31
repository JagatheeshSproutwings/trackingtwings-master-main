import axios from 'axios';
export const LoginApi = async values => {
    
    const {response} = await axios.post('http://127.0.0.1:8000/api/login',values).then(data=>data).catch(data=>data);
   return response;
    // showLoading()
    // signIn(values);
};