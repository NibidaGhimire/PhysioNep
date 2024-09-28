
import axios from "axios";
import { useState } from "react";

const useBackcurl = () => {
    const [loadinggg, setLoadinggg] = useState(false)
    const [starteddd, setStarteddd] = useState(false)
  
    const handlebcurlrun = async () => {
        setLoadinggg(true);
        try {
            await axios.get('/api/bcurl-start');
            setStarteddd(true);
            console.log('Python script started bicep curls');
           
        } catch (error) {
            console.error('Error starting Python script:', error);
        } finally{
            setTimeout(() => {
                setLoadinggg(false);
            }, 4000); 
        }  
    };

    const handlebcurlstop = async () => {
        try {
            await axios.get('/api/bcurl-end');
            setStarteddd(false);
            console.log('Python script stopped');
        } catch (error) {
            console.error('Error stopping Python script:', error);
        }
    };
  return {loadinggg, setLoadinggg, starteddd, handlebcurlrun, handlebcurlstop}
}

export default useBackcurl

