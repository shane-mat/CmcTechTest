using API.Models;
using AutoMapper;
using Data.Models;

namespace API.Mappings
{
    public class TodoProfile : Profile
    {
        public TodoProfile()
        {
            CreateMap<TodoItem, TodoItemDto>().ReverseMap();
            CreateMap<TodoItem, TodoItemModel>().ReverseMap();
        }
    }
}