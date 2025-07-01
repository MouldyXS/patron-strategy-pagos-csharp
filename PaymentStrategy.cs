using System;

namespace PaymentSystem
{
    // Interfaz Strategy
    public interface IPaymentStrategy
    {
        void Pay(decimal amount);
    }

    // Implementación para pago con tarjeta
    public class CardPayment : IPaymentStrategy
    {
        private string NameOnCard { get; }
        private string CardNumber { get; }
        private string Expiry { get; }
        private string Cvv { get; }

        public CardPayment(string nameOnCard, string cardNumber, string expiry, string cvv)
        {
            NameOnCard = nameOnCard;
            CardNumber = cardNumber;
            Expiry = expiry;
            Cvv = cvv;
        }

        public void Pay(decimal amount)
        {
            Console.WriteLine($"Pagando {amount:C} con tarjeta");
            Console.WriteLine($"Nombre: {NameOnCard}");
            Console.WriteLine($"Número: {CardNumber}");
            Console.WriteLine($"Expira: {Expiry}");
        }
    }

    // Implementación para pago con PayPal
    public class PayPalPayment : IPaymentStrategy
    {
        private string Email { get; }

        public PayPalPayment(string email)
        {
            Email = email;
        }

        public void Pay(decimal amount)
        {
            Console.WriteLine($"Pagando {amount:C} con PayPal");
            Console.WriteLine($"Email: {Email}");
        }
    }

    // Implementación para pago por transferencia
    public class TransferPayment : IPaymentStrategy
    {
        private string BankName { get; }
        private string AccountNumber { get; }
        private string AccountHolder { get; }

        public TransferPayment(string bankName, string accountNumber, string accountHolder)
        {
            BankName = bankName;
            AccountNumber = accountNumber;
            AccountHolder = accountHolder;
        }

        public void Pay(decimal amount)
        {
            Console.WriteLine($"Pagando {amount:C} por transferencia bancaria");
            Console.WriteLine($"Banco: {BankName}");
            Console.WriteLine($"Cuenta: {AccountNumber}");
            Console.WriteLine($"Titular: {AccountHolder}");
        }
    }

    // Contexto que utiliza la estrategia
    public class PaymentContext
    {
        private IPaymentStrategy _strategy;

        public void SetStrategy(IPaymentStrategy strategy)
        {
            _strategy = strategy;
        }

        public void ProcessPayment(decimal amount)
        {
            if (_strategy == null)
            {
                throw new InvalidOperationException("Debe seleccionar un método de pago");
            }
            _strategy.Pay(amount);
        }
    }

    // Programa principal de ejemplo
    class Program
    {
        static void Main(string[] args)
        {
            var context = new PaymentContext();
            decimal amount = 99.99m;

            // Ejemplo de pago con tarjeta
            Console.WriteLine("\n=== Pago con Tarjeta ===");
            var cardPayment = new CardPayment(
                "Juan Pérez",
                "1234567890123456",
                "12/25",
                "123"
            );
            context.SetStrategy(cardPayment);
            context.ProcessPayment(amount);

            // Ejemplo de pago con PayPal
            Console.WriteLine("\n=== Pago con PayPal ===");
            var paypalPayment = new PayPalPayment("juan@ejemplo.com");
            context.SetStrategy(paypalPayment);
            context.ProcessPayment(amount);

            // Ejemplo de pago por transferencia
            Console.WriteLine("\n=== Pago por Transferencia ===");
            var transferPayment = new TransferPayment(
                "Banco Nacional",
                "ES12345678901234567890",
                "Juan Pérez"
            );
            context.SetStrategy(transferPayment);
            context.ProcessPayment(amount);
        }
    }
}
