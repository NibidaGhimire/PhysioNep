import { useState } from "react";

const useVitalFetch = () => {
    const [loadinggg, setLoadinggg] = useState(false)
    const [vitals, setVitals] = useState[{}]
  
    const vitalsdata = async () => {
        setLoadinggg(true);
        try {
           
            const res = await fetch("/api/proxy-fetch");
      const data = await res.json();
      setVitals(data);
           
        } catch (error) {
            console.error('Error fetching vitals', error);
        } finally{
            setTimeout(() => {
                setLoadinggg(false);
            }, 4000); 
        }  
    };

    
  return {loadinggg, setLoadinggg, vitals, setVitals, vitalsdata}
}

export default useVitalFetch

