using API.Models;
using AutoMapper;
using Data.Interfaces;
using Data.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ProductCatalog.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class TodoItemsController : ControllerBase
    {
        private readonly ITodoItemsRepository _todoItemsRepository;
        private readonly IMapper _mapper;

        public TodoItemsController(ITodoItemsRepository todoItemsRepository, IMapper mapper)
        {
            _todoItemsRepository = todoItemsRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItemDto>>> Get()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var todos = await _todoItemsRepository.GetTodosAsync(userId);
            return Ok(todos);
        }

        [HttpPost]
        public async Task<ActionResult> Create(TodoItemModel todoItemModel)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var todoItem = _mapper.Map<TodoItemModel, TodoItem>(todoItemModel);
            todoItem.UserId = userId;
            await _todoItemsRepository.AddTodoAsync(todoItem);
            return Created();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var todoItem = await _todoItemsRepository.GetTodoAsync(id, userId);

            if (todoItem == null)
            {
                return NotFound();
            }
            await _todoItemsRepository.DeleteTodoAsync(todoItem);
            return NoContent();
        }

        [HttpPut("{id}/complete")]
        public async Task<IActionResult> MarkAsCompleted(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var todoItem = await _todoItemsRepository.GetTodoAsync(id, userId);

            if (todoItem == null)
            {
                return NotFound();
            }
            todoItem.Completed = true;
            todoItem.CompletedDate = DateTime.UtcNow;
            await _todoItemsRepository.UpdateTodoAsync(todoItem);
            return NoContent();
        }

        [HttpGet("completed")]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetCompletedItems()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var fromDate = DateTime.UtcNow.AddDays(-7);
            var completedItems = await _todoItemsRepository.GetCompletedItemsAsync(userId, fromDate);
            return Ok(completedItems);
        }
    }
}