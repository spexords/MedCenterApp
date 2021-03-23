using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Extensions
{
    public static class StringExtensions
    {
        public static string SafeSubstring(this string str, int startIndex, int length)
        {
            var safeLength = startIndex + length > str.Length ? str.Length : length;
            return str.Substring(startIndex, safeLength);
        }
    }
}
