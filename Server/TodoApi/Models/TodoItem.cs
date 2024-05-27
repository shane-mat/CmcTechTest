using Microsoft.AspNetCore.Identity;

namespace TodoApi.Models
{
    // Models/TodoItem.cs
    public class TodoItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public bool Completed { get; set; }
        public string UserId { get; set; }
    }
}