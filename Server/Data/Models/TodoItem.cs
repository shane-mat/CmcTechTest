namespace Data.Models
{
    public class TodoItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public bool Completed { get; set; }
        public DateTime? CompletedDate { get; set; }
        public string UserId { get; set; }
    }
}