using DrivingSchool.Core.Models;
using DrivingSchool.Core.Services;
using DrivingSchool.Data;
using Microsoft.EntityFrameworkCore;
using School.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<SchoolDbContext>(options => 
    options.UseMySql(builder.Configuration.GetConnectionString("StudentsData"), new MySqlServerVersion(new Version(6, 0, 0))));

builder.Services.AddScoped<ISchoolDbContext, SchoolDbContext>();
builder.Services.AddScoped<IEntityService<Student>, EntityService<Student>>();
builder.Services.AddScoped<ISchoolService, SchoolService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors(options => options
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
