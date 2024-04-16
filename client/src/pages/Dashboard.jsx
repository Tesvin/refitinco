import SharesDashboard from '../components/Shares';
import Wallet from '../components/Wallet'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Ref2 from '../assets/Ref2.jpg'
import './style.css'
import Doc from '../assets/document.jpg'


export default function Dashboard() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  return (
      <div className="flex md:flex-row flex-col justify-between h-full">
        <div className='md:w-2/5'>
          <img src={Ref2} alt='Campaign' />
        </div>
        <div className='md:w-3/5 p-4 flex flex-col bor'>
          <h1 className='font-sans font-semibold text-2xl'>Dashboard</h1>
          <div className='grid grid-cols-2 gap-2 items-center'>
            <div className='flex items-center justify-center flex-col'>
              <Wallet />
              <Link to='/' className='bg-blue-600 px-4 text-center w-full font-semibold text-white rounded-md py-2'>
                Buy
              </Link>
            </div>
            <div>
              <div className='flex items-center justify-center flex-col'>
                <img src={Doc} className='rounded-full h-16 w-16' alt="document" />
                <button className='rounded-md flex space-x-4 items-center text-lg font-semibold justify-center disabled:bg-blue-400 bg-blue-600 px-4 py-3 text-white' disabled>
                  <span className='uil--padlock'></span>
                  <span className='text-xs'>Download whitepaper</span>
                </button> 
              </div>
            </div>
          </div>
          
          {/*<SharesDashboard />*/}
          
          <div className='md:absolute bottom-40'>
            <p className='text-lg font-semibold text-gray-800'>
              Referral code
            </p>
            <ul className='text-sm'>
              <li className='text-gray-600'>Share your referral code with friends and family to earn more</li>
              <li className='text-gray-600'>Your referral code is: <strong>{currentUser.refer_code}</strong></li>
              <li className='text-gray-600'>
                Click here to copy your referral link
                <span className="prime--copy"
                  onClick={() =>{navigator.clipboard.writeText(`http://reftinco.com?referral=${currentUser.refer_code}`)
                  .then(() => alert('Referral link copied to clipboard'))}
                  }> 
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
}
