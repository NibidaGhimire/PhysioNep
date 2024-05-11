import axios from "axios";
import { useState } from "react";

const useCam = () => {
    const [loading, setLoading] = useState(false)
    const [started, setStarted] = useState(false)


    const handlerun = async () => {
        setLoading(true);
        try {
            await axios.get('/api/run-python-script');
            setStarted(true);
            console.log('Python script started');
           
        } catch (error) {
            console.error('Error starting Python script:', error);
        } finally{
            setTimeout(() => {
                setLoading(false);
            }, 4000); 
        }  
    };


    const handlestop = async () => {
        try {
            await axios.get('/api/stop-python-script');
            setStarted(false);
            console.log('Python script stopped');
        } catch (error) {
            console.error('Error stopping Python script:', error);
        }
    };
  return {loading, setLoading, started, handlerun, handlestop}
}


export default useCam
