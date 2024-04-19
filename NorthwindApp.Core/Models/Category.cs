using System.ComponentModel.DataAnnotations;

namespace NorthwindApp.Core.Models;

public partial class Category
{
    public int CategoryId { get; set; }

    [Required]
    [StringLength(15)]
    public string CategoryName { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    public byte[]? Picture { get; set; }
}
