using Data.Models;
namespace Data.Interfaces
{
    public interface ITodoItemsRepository
    {
        Task<IEnumerable<TodoItem>> GetTodosAsync(string userId);
        Task<TodoItem> GetTodoAsync(int id, string userId);
        Task AddTodoAsync(TodoItem todoItem);
        Task UpdateTodoAsync(TodoItem todoItem);
        Task DeleteTodoAsync(TodoItem todoItem);
        Task MarkAsCompletedAsync(int id, string userId);
        Task<IEnumerable<TodoItem>> GetCompletedItemsAsync(string userId, DateTime fromDate);
    }
}