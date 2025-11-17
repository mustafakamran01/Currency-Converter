import { useState } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";


function App() {

  const [amount, setAmount] = useState(0)
  const [convertedAmount, setConvertedAmount] = useState(0)
  const [from, setFrom] = useState("inr")
  const [to, setTo] = useState("usd")

  const currencyInfo = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo)

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  const swap = () => {
    setFrom(to)
    setTo(from)
  }


  return (

    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >

      <div className="w-full">

        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">

          <form
            onSubmit={(e) => {
            e.preventDefault();
            convert();
            }}
          >

          <div className="w-full mb-1">

            <InputBox
              label="From"
              amount={amount}
              currency={from}
              onAmountChange={ (amount) => setAmount(amount)}
              onCurrencyChange={ (from) => setFrom(from)}
              currencyOptions={options}
            />

          </div>

          <div className="relative w-full h-0.5">

            <button
              type="button"
              onClick={swap}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-blue-600 text-white px-2 py-0.5 hover:bg-blue-400"                      
            >
              Swap
            </button>

          </div>

          <div className="w-full mt-1 mb-4">

            <InputBox
              label="To"
              amount={convertedAmount}
              currency={to}
              onAmountChange={ () => setConvertedAmount(convertedAmount)}
              onCurrencyChange={ (to) => setTo(to)}
              amountDisable
              currencyOptions={options}

            />

          </div>

          <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-400">
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>

          </form>

        </div>

      </div>

    </div>
    );
  }

export default App