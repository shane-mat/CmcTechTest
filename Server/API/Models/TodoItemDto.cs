namespace API.Models
{
    public class TodoItemDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public bool Completed { get; set; }
    }
}