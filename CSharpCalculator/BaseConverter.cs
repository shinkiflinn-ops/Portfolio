using System;
using System.Text;

namespace CSharpCalculator
{
    public static class BaseConverter
    {
        public static string ConvertBase(string value, int fromBase, int toBase)
        {
            try
            {
                long decimalValue = Convert.ToInt64(value, fromBase);
                return Convert.ToString(decimalValue, toBase).ToUpper();
            }
            catch (Exception ex)
            {
                throw new ArgumentException($"Invalid input for base {fromBase}: {ex.Message}");
            }
        }

        public static bool IsValidDigit(char c, int fromBase)
        {
            string validDigits = "0123456789ABCDEF";
            int index = validDigits.IndexOf(char.ToUpper(c));
            return index >= 0 && index < fromBase;
        }
    }
}
