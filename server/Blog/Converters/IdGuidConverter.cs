using System;
using System.Linq;
using Autofac;
using Newtonsoft.Json;

namespace chancies.Blog.Converters
{
    public class IdGuidConverter<T>
        : JsonConverter
    {
        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            writer.WriteValue(value.ToString());
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            var value = reader.Value.ToString();
            var guid = Guid.Parse(value);
            var constructorInfo = typeof(T).GetDeclaredPublicConstructors().SingleOrDefault(ci =>
            {
                var parameters = ci.GetParameters();
                return parameters.Length == 1 && parameters.Single().ParameterType == typeof(Guid);
            });

            if (constructorInfo == null)
            {
                throw new JsonSerializationException(
                    $"{typeof(T).Name} must have a constructor with a single parameter of type {nameof(Guid)}.");
            }

            return constructorInfo.Invoke(new object[] { guid });
        }

        public override bool CanConvert(Type objectType)
        {
            return objectType is T;
        }
    }
}
