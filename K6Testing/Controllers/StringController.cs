using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace K6Testing.Controllers;

[ApiController]
[Route("[controller]")]
public class StringController : ControllerBase
{
    [HttpGet("reverse")]
    public string Reverse([FromQuery] string input)
    {
        var reverse = new StringBuilder(input.Length);
        for (int i = input.Length - 1; i >= 0; i--)
        {
            reverse.Append(input[i]);
        }
        Thread.Sleep(500);

        if (Request.Headers.Cookie.Count > 0)
        {

        }

        for (int i = 0; i < Request.Headers.Cookie.Count; i++)
        {
            var cookies = Request.Headers.Cookie[i].Split(';');

            for (int j = 0; j < cookies.Length; j++)
            {
                var cookie = cookies[j].Trim().Split('=');
                var cookieKey = cookie[0];
                var cookieValue = cookie[1].Replace("\"", "");
                Response.Cookies.Append(cookieKey, cookieValue);
            }
        }        

        return reverse.ToString();
    }
}
