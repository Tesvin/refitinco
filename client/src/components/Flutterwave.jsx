import { useState } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

export default function Flutterwave() {
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  //const [loading, setLoading] = useState(false);

  const config = {
    public_key: "FLWPUBK_TEST-2375f44c6053efa90d0cbd84d3c5827f-X",
    tx_ref: Date.now(),
    amount: amount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",

    // specified redirect URL
    redirect_url: "/api/transaction/response",
    //redirect_url: "https://refitinco.onrender.com/api/transaction/response",

    customer: {
      email: email,
      phone_number: phone,
      name: name,
    },
    customizations: {
      title: "my Payment Title",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);



  return ( 
    <div className=" p-3 max-w-lg mx-auto">
      <div className="flex flex-col gap-4">

        <h1>1 Unit = 25dollar</h1>
      
        <input
          className="border p-3 rounded-lg"
          type="number"
          placeholder="Unit"
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          className="border p-3 rounded-lg"
          type="number"
          placeholder="Amount in naira"
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          className="border p-3 rounded-lg"
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-3 rounded-lg"
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-3 rounded-lg"
          type="number"
          placeholder="Phone"
          onChange={(e) => setPhone(e.target.value)}
        />

        <button 
        className="bg-[#0a192f] font-bold text-white p-3 rounded-lg uppercase hover:opacity-80"
          onClick={() =>
            handleFlutterPayment({
              callback: (response) => {
                console.log(response);
                closePaymentModal();
              },
              onClose: () => {},
            })
          }
        >
          Proceed to Payment
           {/* {loading ? "loading..." : "Proceed to Payment"} */}
        </button>
      
      </div>
    </div>
  );
}



// import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

// export default function App() {
//   const config = {
//     public_key: 'FLWPUBK_TEST-2375f44c6053efa90d0cbd84d3c5827f-X',
//     tx_ref: Date.now(),
//     amount: 100,
//     currency: 'NGN',
//     payment_options: 'card,mobilemoney,ussd',
//     customer: {
//       email: 'user@gmail.com',
//        phone_number: '070********',
//       name: 'john doe',
//     },
//     customizations: {
//       title: 'my Payment Title',
//       description: 'Payment for items in cart',
//       logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
//     },
//   };

//   const handleFlutterPayment = useFlutterwave(config);

//   return (
//     <div className="App">
//      <h1>Hello Test user</h1>

//       <button
//         onClick={() => {
//           handleFlutterPayment({
//             callback: (response) => {
//                console.log(response);
//                 closePaymentModal() // this will close the modal programmatically
//             },
//             onClose: () => {},
//           });
//         }}
//       >
//         Payment with React hooks
//       </button>
//     </div>
//   );
// }