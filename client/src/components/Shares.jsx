import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SharesDashboard = () => {
  const [userShares, setUserShares] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();
console.log(params)
  useEffect(() => {
    const fetchUserShares = async () => {
      try {
        // Replace '/api/calculateShares' with your actual API endpoint
        const response = await axios.get(`/api/transaction/calculateShares/${params.userId}`);

        setUserShares(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user shares:', error);
        setLoading(false);
      }
    };

    fetchUserShares();
  }, []);

  return (
    <div>
      <h2 className='font-semibold'>Your Shares Dashboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {userShares.map((userShare) => (
            <li key={userShare.userId}>
              <strong>User ID:</strong> {userShare.userId} |
              <strong>Shares Bought:</strong> {userShare.sharesBought} |
              {/* <strong>Total Shares:</strong> {userShare.totalSharesForUser} |
              <strong>Remaining Shares:</strong> {userShare.remainingSharesInOrganization} */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SharesDashboard;
