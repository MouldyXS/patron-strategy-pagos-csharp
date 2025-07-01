import React, { useState } from "react";

interface PaymentStrategy {
  pay(): void;
}

class CardPayment implements PaymentStrategy {
  private nameOnCard: string;
  private cardNumber: string;
  private expiry: string;
  private cvv: string;

  constructor(nameOnCard: string, cardNumber: string, expiry: string, cvv: string) {
    this.nameOnCard = nameOnCard;
    this.cardNumber = cardNumber;
    this.expiry = expiry;
    this.cvv = cvv;
  }

  pay() {
    alert(
      `Pagando con tarjeta.\nNombre: ${this.nameOnCard}\nNúmero: ${this.cardNumber}\nExpira: ${this.expiry}`
    );
  }
}

class PayPalPayment implements PaymentStrategy {
  private email: string;

  constructor(email: string) {
    this.email = email;
  }

  pay() {
    alert(`Pagando con PayPal.\nEmail: ${this.email}`);
  }
}

class TransferPayment implements PaymentStrategy {
  private bankName: string;
  private accountNumber: string;
  private accountHolder: string;

  constructor(bankName: string, accountNumber: string, accountHolder: string) {
    this.bankName = bankName;
    this.accountNumber = accountNumber;
    this.accountHolder = accountHolder;
  }

  pay() {
    alert(
      `Pagando por transferencia.\nBanco: ${this.bankName}\nCuenta: ${this.accountNumber}\nTitular: ${this.accountHolder}`
    );
  }
}

export default function PaymentPage() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<"card" | "paypal" | "transfer" | null>(null);

  // Card details
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // PayPal email
  const [paypalEmail, setPaypalEmail] = useState("");

  // Transfer details
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");

  const isAmountValid = () => {
    const num = parseFloat(amount);
    return !isNaN(num) && num > 0;
  };

  const isCardValid = () => {
    return (
      nameOnCard.trim().length > 0 &&
      cardNumber.trim().length === 16 &&
      expiry.trim().length === 5 &&
      cvv.trim().length === 3
    );
  };

  const isPaypalValid = () => {
    return paypalEmail.includes("@");
  };

  const isTransferValid = () => {
    return (
      bankName.trim().length > 0 &&
      accountNumber.trim().length > 0 &&
      accountHolder.trim().length > 0
    );
  };

  const canPay = () => {
    if (!isAmountValid() || !method) return false;
    if (method === "card") return isCardValid();
    if (method === "paypal") return isPaypalValid();
    if (method === "transfer") return isTransferValid();
    return false;
  };

  const handlePay = () => {
    if (!canPay()) {
      alert("Por favor, complete todos los campos correctamente.");
      return;
    }
    let strategy: PaymentStrategy;
    if (method === "card") {
      strategy = new CardPayment(nameOnCard, cardNumber, expiry, cvv);
    } else if (method === "paypal") {
      strategy = new PayPalPayment(paypalEmail);
    } else {
      strategy = new TransferPayment(bankName, accountNumber, accountHolder);
    }
    strategy.pay();
  };

  return (
    <main className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6 font-sans max-w-md mx-auto">
      <h1 className="text-4xl font-bold mb-8">Pago Seguro</h1>

      <div className="w-full mb-6">
        <label htmlFor="amount" className="mb-2 block font-semibold">
          Monto a pagar
        </label>
        <input
          id="amount"
          type="number"
          min="0"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div className="w-full mb-6">
        <label className="mb-2 block font-semibold">Método de pago</label>
        <div className="flex gap-4">
          <button
            onClick={() => setMethod("card")}
            className={`flex-1 py-2 rounded border ${
              method === "card"
                ? "bg-black text-white"
                : "bg-white text-black border-black"
            }`}
          >
            Tarjeta
          </button>
          <button
            onClick={() => setMethod("paypal")}
            className={`flex-1 py-2 rounded border ${
              method === "paypal"
                ? "bg-black text-white"
                : "bg-white text-black border-black"
            }`}
          >
            PayPal
          </button>
          <button
            onClick={() => setMethod("transfer")}
            className={`flex-1 py-2 rounded border ${
              method === "transfer"
                ? "bg-black text-white"
                : "bg-white text-black border-black"
            }`}
          >
            Transferencia
          </button>
        </div>
      </div>

      {method === "card" && (
        <>
          <div className="w-full mb-4">
            <label htmlFor="nameOnCard" className="mb-2 block font-semibold">
              Nombre en la tarjeta
            </label>
            <input
              id="nameOnCard"
              type="text"
              placeholder="Nombre como aparece en la tarjeta"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
              className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="w-full mb-4">
            <label htmlFor="cardNumber" className="mb-2 block font-semibold">
              Número de tarjeta
            </label>
            <input
              id="cardNumber"
              type="text"
              maxLength={16}
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
              className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="flex gap-4 w-full mb-4">
            <div className="flex-1">
              <label htmlFor="expiry" className="mb-2 block font-semibold">
                Expiración (MM/AA)
              </label>
              <input
                id="expiry"
                type="text"
                maxLength={5}
                placeholder="MM/AA"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="cvv" className="mb-2 block font-semibold">
                CVV
              </label>
              <input
                id="cvv"
                type="text"
                maxLength={3}
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
        </>
      )}

      {method === "paypal" && (
        <div className="w-full mb-6">
          <label htmlFor="paypalEmail" className="mb-2 block font-semibold">
            Email de PayPal
          </label>
          <input
            id="paypalEmail"
            type="email"
            placeholder="usuario@ejemplo.com"
            value={paypalEmail}
            onChange={(e) => setPaypalEmail(e.target.value)}
            className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      )}

      {method === "transfer" && (
        <>
          <div className="w-full mb-4">
            <label htmlFor="bankName" className="mb-2 block font-semibold">
              Nombre del Banco
            </label>
            <input
              id="bankName"
              type="text"
              placeholder="Nombre del banco"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="w-full mb-4">
            <label htmlFor="accountNumber" className="mb-2 block font-semibold">
              Número de Cuenta
            </label>
            <input
              id="accountNumber"
              type="text"
              placeholder="Número de cuenta bancaria"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="w-full mb-4">
            <label htmlFor="accountHolder" className="mb-2 block font-semibold">
              Titular de la Cuenta
            </label>
            <input
              id="accountHolder"
              type="text"
              placeholder="Nombre del titular de la cuenta"
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value)}
              className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </>
      )}

      <button
        onClick={handlePay}
        disabled={!canPay()}
        className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Pagar
      </button>
    </main>
  );
}
