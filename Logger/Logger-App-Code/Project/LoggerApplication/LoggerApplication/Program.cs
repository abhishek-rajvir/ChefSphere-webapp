var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.WebHost.UseUrls("http://localhost:6001");
builder.Services.AddCors((corsbuilder) =>
{
    corsbuilder.AddPolicy("Policy1", (policyOptions) =>
    {
        // allow all origins method and headers
        policyOptions.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();

//// Configure the HTTP request pipeline.
//if (!app.Environment.IsDevelopment())
//{
//    app.UseExceptionHandler("/Home/Error");
//}
app.UseRouting();

app.UseCors("Policy1");

app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Log}/{action=Log}")
    .WithStaticAssets();


app.Run();
