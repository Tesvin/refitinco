import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";


export default function Dashboard() {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  //console.log('params:', params);


  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setLoading(true);
  
        if (!params.userId) {
          console.log('params.userId:', params.userId);

          // Handle the case where userId is undefined
          setError(true);
          setLoading(false);
          return;
        }
  
        const res = await fetch(`/api/transaction/wallet/${params.userId}`);
        
        const data = await res.json();
  
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
  
        setBalance(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        console.error('Error fetching balance:', error);
        setError(true);
        setLoading(false);
      }
    };
  
    fetchBalance();
  }, [params.userId]);
  

  return (
      <div className="">
        {loading && <p>Loading...</p>}
        {error && <p>Error loading balance.</p>}
        {balance && <p>Balance: {balance}</p>}
      </div>
    );
}
