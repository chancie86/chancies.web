using System.Collections.Generic;
using System.Threading.Tasks;
using chancies.Api.Controllers.Document.Dto;
using Microsoft.AspNetCore.Mvc;

namespace chancies.Api.Controllers.Health
{
    [ApiController]
    [Route("health")]
    public class HealthController
        : ControllerBase
    {
        public HealthController()
        {
        }

        [HttpGet]
        public async Task<ActionResult<IList<DocumentListItemDto>>> List()
        {
            return Ok();
        }
    }
}
