using System;
using System.ComponentModel;
using chancies.Blog.Converters;
using Newtonsoft.Json;

namespace chancies.Blog.DataModels
{
    [TypeConverter(typeof(UnderlyingTypeConverter<DocumentId, string>))]
    [JsonConverter(typeof(IdGuidConverter<DocumentId>))]
    public struct DocumentId
        : IEquatable<DocumentId>
    {
        private readonly Guid _value;

        public DocumentId(string value)
            : this(Guid.Parse(value))
        {
        }

        public DocumentId(Guid value)
        {
            _value = value;
        }

        public static implicit operator Guid(DocumentId id)
        {
            return id._value;
        }

        public static implicit operator DocumentId(Guid value)
        {
            return new DocumentId(value);
        }

        public static bool operator ==(DocumentId left, DocumentId right)
        {
            return left.Equals(right);
        }

        public static bool operator !=(DocumentId left, DocumentId right)
        {
            return !left.Equals(right);
        }

        public bool Equals(DocumentId other)
        {
            return Equals(_value, other._value);
        }

        public override bool Equals(object obj)
        {
            return obj is DocumentId other && Equals(other);
        }

        public override int GetHashCode()
        {
            return _value.GetHashCode();
        }

        public override string ToString()
        {
            return _value.ToString();
        }
    }
}
