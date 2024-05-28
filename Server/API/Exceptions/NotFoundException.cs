namespace API.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException()
            : base()
        {
        }

        public NotFoundException(string message)
            : base(message)
        {
        }

        public NotFoundException(string name, object id)
            : base($"{name}: ({id}) was not found.")
        {
        }
    }
}
