using System;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Reflection;

namespace chancies.Blog.Converters
{
    public sealed class UnderlyingTypeConverter<TTarget, TSource> : TypeConverter
    {
        public override bool CanConvertFrom(ITypeDescriptorContext context, Type sourceType)
        {
            if (sourceType == typeof(TSource))
            {
                return true;
            }
            return base.CanConvertFrom(context, sourceType);
        }

        public override object ConvertFrom(ITypeDescriptorContext context,
            CultureInfo culture, object value)
        {
            if (value is TSource underlyingValue)
            {
                var conversionOperator =
                    typeof(TTarget)
                        .GetMethods(BindingFlags.Static | BindingFlags.Public)
                        .Where(m => (m.Name == "op_Explicit" || m.Name == "op_Implicit") && m.ReturnType == typeof(TTarget))
                        .FirstOrDefault(m => m.GetParameters().Length == 1 && m.GetParameters()[0].ParameterType == typeof(TSource));

                if (conversionOperator != null)
                {
                    var result = (TTarget)conversionOperator.Invoke(null, new object[] { underlyingValue });
                    return result;
                }
            }
            return base.ConvertFrom(context, culture, value);
        }
    }
}
