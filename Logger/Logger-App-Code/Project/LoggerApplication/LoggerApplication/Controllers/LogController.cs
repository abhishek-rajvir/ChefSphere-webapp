using LoggerLib;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace LoggerApplication.Controllers
{
    [Route("[controller]")]
    [ApiController]
    //It instructs ASP.NET Core to apply the CORS rules defined in the policy named "Policy1" to incoming HTTP requests handled by that controller or action.
    //CORS is required when a browser-based client (for example, a JavaScript SPA) makes requests to an API hosted on a different origin(different scheme, host, or port).
    [EnableCors(PolicyName = "Policy1")]

    //is an attribute in ASP.NET Core that is applied to a controller class to enable API-specific behaviors 
    //and conventions.It is primarily used when building RESTful web APIs, not MVC views.

    //ControllerBase is lighter and intended for APIs
    public class LogController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Log(LogModelDto logModel)
        {
            if (logModel == null || string.IsNullOrWhiteSpace(logModel.logMessage))
            {
                return BadRequest();
            }
            FileLogger.CurrentLogger.Log(logModel.logMessage);
            return Ok(new { success = true });

        }
    }

    // Dto for string message
    public class LogModelDto
    {
        public string logMessage { get; set; }
    }
}
