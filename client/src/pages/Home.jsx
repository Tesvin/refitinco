import { Link } from 'react-router-dom'
import Ref1 from '../assets/Ref1.jpg'
import ScrollingIcons from '../components/ScrollingIcons'
import FAQ from '../components/Faq'
import SignIn from './SignIn'


export default function Home() {
  return (
    <div className="">
        <h1 className="p-4 font-sans text-center text-2xl font-bold">
            <span>Crowdfund To Co-own A Tech Start-Up Today!!!</span>
        </h1>
        <nav className="bg-green-900 p-2 m-6">
            <h1 className="p-4 text-center text-white text-2xl font-bold font-sans">ARE YOU READY TO HARNESS</h1>
        </nav>
        <div className='flex m-4 flex-col-reverse'>
          
          <div className='flex w-full flex-col'>
            <div className='flex flex-col md:flex-row items-center justify-between'>
               <div className='mx-auto w-3/6 md:w-2/5'>
                  <img src={Ref1} alt='crowd' className=''/>
              </div>
              <SignIn />
            </div>
           
            <div className='md:container mx-auto'>
              <FAQ />
            </div>
          </div>
          <div className='p-6 font-bold text-center'>
            <div className='md:flex flex-col items-center font-sans'>
              <h2>THE POWER</h2>
              <h3>OF THE INTERNET?!!!</h3>
              <Link to='/sign-in'>
                <h1 className='bg-green-700 cursor-pointer border p-2 text-white rounded-lg'>Purchase Units Now</h1>
              </Link>
            </div>
          </div>
        </div>
    </div>
  )
}

