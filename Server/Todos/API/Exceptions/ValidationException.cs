using FluentValidation.Results;

namespace API.Exceptions
{
    public class ValidationException : Exception
    {
        public ValidationException()
            : base("Validation errors occurred.")
        {
            Errors = new Dictionary<string, string[]>();
        }

        public ValidationException(IEnumerable<ValidationFailure> errors)
            : this()
        {
            Errors = errors
                .GroupBy(e => e.PropertyName, e => e.ErrorMessage)
                .ToDictionary(failureGroup => failureGroup.Key, failureGroup => failureGroup.ToArray());
        }

        public IDictionary<string, string[]> Errors { get; }
    }
}