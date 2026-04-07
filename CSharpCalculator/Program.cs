using System;

namespace CSharpCalculator
{
    class Program
    {
        static void Main(string[] args)
        {
            var calculator = new Calculator();
            Console.WriteLine("======================================");
            Console.WriteLine("   Advanced C# Console Calculator     ");
            Console.WriteLine("======================================");
            Console.WriteLine("Commands:");
            Console.WriteLine(" - [expression] : e.g., (10 + 5) * 2");
            Console.WriteLine(" - base [val] [from] [to] : e.g., base FF 16 10");
            Console.WriteLine(" - clear : Clear the screen");
            Console.WriteLine(" - exit  : Close the application");
            Console.WriteLine("======================================");

            while (true)
            {
                Console.Write("\n> ");
                string input = Console.ReadLine()?.Trim();

                if (string.IsNullOrWhiteSpace(input)) continue;

                if (input.Equals("exit", StringComparison.OrdinalIgnoreCase)) break;
                if (input.Equals("clear", StringComparison.OrdinalIgnoreCase))
                {
                    Console.Clear();
                    continue;
                }

                try
                {
                    if (input.StartsWith("base", StringComparison.OrdinalIgnoreCase))
                    {
                        ProcessBaseConversion(input);
                    }
                    else
                    {
                        double result = calculator.Evaluate(input);
                        Console.WriteLine($"Result: {result}");
                    }
                }
                catch (DivideByZeroException ex)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine($"Error: {ex.Message}");
                    Console.ResetColor();
                }
                catch (Exception ex)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine($"Error: {ex.Message}");
                    Console.ResetColor();
                }
            }
        }

        static void ProcessBaseConversion(string input)
        {
            var parts = input.Split(' ', StringSplitOptions.RemoveEmptyEntries);
            if (parts.Length != 4)
            {
                Console.WriteLine("Usage: base [value] [fromBase] [toBase]");
                return;
            }

            string value = parts[1];
            if (!int.TryParse(parts[2], out int fromBase) || !int.TryParse(parts[3], out int toBase))
            {
                Console.WriteLine("Error: Bases must be integers (e.g., 2, 10, 16).");
                return;
            }

            try
            {
                string result = BaseConverter.ConvertBase(value, fromBase, toBase);
                Console.WriteLine($"{value} (Base {fromBase}) = {result} (Base {toBase})");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
        }
    }
}
