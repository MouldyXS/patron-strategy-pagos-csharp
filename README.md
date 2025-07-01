# Patrón Strategy - Sistema de Pagos

Este proyecto demuestra el patrón de diseño Strategy implementado en C# para un sistema de pagos.

## Descargar el proyecto

1. Descarga los archivos:
   - `PaymentStrategy.cs`
   - `README.md`

2. Crea un nuevo proyecto en Visual Studio:
   - Abre Visual Studio
   - Selecciona "Crear un nuevo proyecto"
   - Elige "Aplicación de consola" (.NET Core)
   - Dale un nombre al proyecto (por ejemplo, "PaymentSystem")

3. O usa la línea de comandos:
```bash
mkdir PaymentSystem
cd PaymentSystem
dotnet new console
```

## Configurar el proyecto

1. Copia el contenido de `PaymentStrategy.cs` en el archivo `Program.cs` de tu proyecto
   O reemplaza el archivo Program.cs con PaymentStrategy.cs

2. Asegúrate de tener instalado .NET SDK:
   - Puedes descargarlo de: https://dotnet.microsoft.com/download

## Ejecutar el proyecto

### Usando Visual Studio:
1. Abre el proyecto
2. Presiona F5 o el botón "Iniciar"

### Usando la línea de comandos:
```bash
dotnet build
dotnet run
```

## Estructura del código

- `IPaymentStrategy`: Interfaz que define el método de pago
- Implementaciones:
  * `CardPayment`: Pago con tarjeta
  * `PayPalPayment`: Pago con PayPal
  * `TransferPayment`: Pago por transferencia
- `PaymentContext`: Clase que utiliza las estrategias

## Ejemplo de uso

El programa incluye ejemplos de los tres tipos de pago:
1. Pago con tarjeta
2. Pago con PayPal
3. Pago por transferencia

Cada ejemplo muestra los detalles del pago realizado.
