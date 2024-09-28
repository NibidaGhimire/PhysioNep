
import axios from "axios";
import { useState } from "react";

const useCurl = () => {
    const [loadingg, setLoadingg] = useState(false)
    const [startedd, setStartedd] = useState(false)
  

    const handlebirun = async () => {
        setLoadingg(true);
        try {
            await axios.get('/api/curl-start');
            setStartedd(true);
            console.log('Python script started bicep curls');
           
        } catch (error) {
            console.error('Error starting Python script:', error);
        } finally{
            setTimeout(() => {
                setLoadingg(false);
            }, 4000); 
        }  
    };

    const handlebistop = async () => {
        try {
            await axios.get('/api/curl-end');
            setStartedd(false);
            console.log('Python script stopped');
        } catch (error) {
            console.error('Error stopping Python script:', error);
        }
    };
  return {loadingg, setLoadingg, startedd, handlebirun, handlebistop}
}

export default useCurl
