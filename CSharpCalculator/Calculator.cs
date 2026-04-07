using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;

namespace CSharpCalculator
{
    public class Calculator
    {
        private static readonly Dictionary<string, int> Precedence = new Dictionary<string, int>
        {
            { "+", 1 },
            { "-", 1 },
            { "*", 2 },
            { "/", 2 }
        };

        public double Evaluate(string expression)
        {
            var tokens = Tokenize(expression);
            var postfix = ShuntingYard(tokens);
            return EvaluatePostfix(postfix);
        }

        private List<string> Tokenize(string expression)
        {
            // Regex to match numbers (including decimals) or operators/parentheses
            string pattern = @"(\d+\.?\d*)|([\+\-\*\/\(\)])";
            var matches = Regex.Matches(expression, pattern);
            var tokens = new List<string>();

            foreach (Match match in matches)
            {
                if (!string.IsNullOrWhiteSpace(match.Value))
                {
                    tokens.Add(match.Value);
                }
            }
            return tokens;
        }

        private Queue<string> ShuntingYard(List<string> tokens)
        {
            var output = new Queue<string>();
            var operators = new Stack<string>();

            foreach (var token in tokens)
            {
                if (double.TryParse(token, NumberStyles.Any, CultureInfo.InvariantCulture, out _))
                {
                    output.Enqueue(token);
                }
                else if (token == "(")
                {
                    operators.Push(token);
                }
                else if (token == ")")
                {
                    while (operators.Count > 0 && operators.Peek() != "(")
                    {
                        output.Enqueue(operators.Pop());
                    }
                    if (operators.Count == 0) throw new ArgumentException("Mismatched parentheses.");
                    operators.Pop(); // Remove "("
                }
                else if (Precedence.ContainsKey(token))
                {
                    while (operators.Count > 0 && operators.Peek() != "(" &&
                           Precedence[operators.Peek()] >= Precedence[token])
                    {
                        output.Enqueue(operators.Pop());
                    }
                    operators.Push(token);
                }
            }

            while (operators.Count > 0)
            {
                if (operators.Peek() == "(") throw new ArgumentException("Mismatched parentheses.");
                output.Enqueue(operators.Pop());
            }

            return output;
        }

        private double EvaluatePostfix(Queue<string> postfix)
        {
            var stack = new Stack<double>();

            while (postfix.Count > 0)
            {
                var token = postfix.Dequeue();

                if (double.TryParse(token, NumberStyles.Any, CultureInfo.InvariantCulture, out double number))
                {
                    stack.Push(number);
                }
                else
                {
                    if (stack.Count < 2) throw new ArgumentException("Invalid expression.");

                    double b = stack.Pop();
                    double a = stack.Pop();

                    switch (token)
                    {
                        case "+": stack.Push(a + b); break;
                        case "-": stack.Push(a - b); break;
                        case "*": stack.Push(a * b); break;
                        case "/":
                            if (b == 0) throw new DivideByZeroException("Cannot divide by zero.");
                            stack.Push(a / b);
                            break;
                        default: throw new ArgumentException($"Unknown operator: {token}");
                    }
                }
            }

            if (stack.Count != 1) throw new ArgumentException("Invalid expression result.");
            return stack.Pop();
        }
    }
}
