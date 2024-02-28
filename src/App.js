import "./index.css";
import { useState } from "react";

export default function App() {
  return (
    <div className="App">
      <h1>Hello</h1>
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {
  const [bill, setBill] = useState("");
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  const calculateTip = () => {
    const billAmount = parseFloat(bill) || 0;
    const tipPercentage =
      (parseFloat(percentage1) + parseFloat(percentage2)) / 2 / 100;
    return billAmount * tipPercentage;
  };

  const tip = calculateTip();
  const total = (parseFloat(bill) || 0) + tip;

  const resetAll = () => {
    setBill("");
    setPercentage1(0);
    setPercentage2(0);
  };

  return (
    <div>
      <BillInput bill={bill} onSetBill={setBill} />
      <SelectPercentage percentage={percentage1} onSelect={setPercentage1}>
        How did you like the service?
      </SelectPercentage>
      <SelectPercentage percentage={percentage2} onSelect={setPercentage2}>
        How did your friend like the service?
      </SelectPercentage>

      <Output bill={parseFloat(bill) || 0} tip={tip} total={total} />
      <Reset onReset={resetAll} />
    </div>
  );
}

function BillInput({ bill, onSetBill }) {
  return (
    <div>
      <label>How much was the bill?</label>
      <input
        type="number"
        placeholder="Bill value"
        value={bill}
        onChange={(e) => onSetBill(e.target.value)}
      />
    </div>
  );
}

function SelectPercentage({ children, percentage, onSelect }) {
  return (
    <div>
      <label>{children}</label>
      <select value={percentage} onChange={(e) => onSelect(e.target.value)}>
        <option value="0">Dissatisfied (0%)</option>
        <option value="10">Satisfied (10%)</option>
        <option value="20">Amazing (20%)</option>
      </select>
    </div>
  );
}

function Output({ bill, tip, total }) {
  return (
    <h3>
      You pay: ${total.toFixed(2)} (${bill.toFixed(2)} + ${tip.toFixed(2)} tip)
    </h3>
  );
}

function Reset({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}
