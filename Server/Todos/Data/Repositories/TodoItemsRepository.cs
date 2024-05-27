using Data.Interfaces;
using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories
{
    public class TodoItemsRepository : ITodoItemsRepository
    {
        private readonly ApplicationDbContext _context;

        public TodoItemsRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TodoItem>> GetTodosAsync(string userId)
        {
            return await _context.TodoItems.Where(t => t.UserId == userId).ToListAsync();
        }

        public async Task<TodoItem> GetTodoAsync(int id, string userId)
        {
            return await _context.TodoItems.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
        }

        public async Task AddTodoAsync(TodoItem todoItem)
        {
            await _context.TodoItems.AddAsync(todoItem);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateTodoAsync(TodoItem todoItem)
        {
            _context.Entry(todoItem).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTodoAsync(TodoItem todoItem)
        {
            _context.TodoItems.Remove(todoItem);
            await _context.SaveChangesAsync();
        }

        public async Task MarkAsCompletedAsync(int id, string userId)
        {
            var todoItem = await _context.TodoItems.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
            if (todoItem != null)
            {
                todoItem.Completed = true;
                _context.Entry(todoItem).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<TodoItem>> GetCompletedItemsAsync(string userId, DateTime fromDate)
        {
            return await _context.TodoItems
                .Where(t => t.UserId == userId && t.Completed && t.CompletedDate >= fromDate)
                .ToListAsync();
        }
    }
}