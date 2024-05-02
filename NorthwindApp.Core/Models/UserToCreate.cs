using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NorthwindApp.Core.Models;

public class UserToCreate
{
    [Required]
    public string UserName { get; set; }
    [Required]
    public string Password { get; set; }

}
