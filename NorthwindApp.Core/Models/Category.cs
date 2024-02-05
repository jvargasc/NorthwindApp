using System.Drawing;

namespace NorthwindApp.Core.Models;

public partial class Category
{
    public int CategoryId { get; set; }

    public string CategoryName { get; set; } = null!;

    public string? Description { get; set; }

    public byte[]? Picture { get; set; }
    // public string? FormattedPicture { get { return formattedPicture1(); } }
    // private string formattedPicture()
    // {
    //     string input = this.Picture.ToString();
    //     return System.Convert.ToBase64String(HexStringToHex(input));
    // }

    // private byte[] HexStringToHex(string inputHex)
    // {
    //     var resultantArray = new byte[inputHex.Length / 2];
    //     for (var i = 0; i < resultantArray.Length; i++)
    //     {
    //         resultantArray[i] = System.Convert.ToByte(inputHex.Substring(i * 2, 2), 16);
    //     }
    //     return resultantArray;
    // }
    // private string formattedPicture1()
    // {
    //     var base64Str = string.Empty;
    //     byte[] picture = this.Picture;
    //     using (var ms = new MemoryStream())
    //     {
    //         int offset = 1;
    //         ms.Write(picture, offset, picture.Length - offset);
    //         var bmp = new System.Drawing.Bitmap(ms);
    //         using (var jpegms = new MemoryStream())
    //         {
    //             bmp.Save(jpegms, System.Drawing.Imaging.ImageFormat.Jpeg);
    //             base64Str = Convert.ToBase64String(jpegms.ToArray());
    //         }
    //     }
    //     return base64Str;
    // }


    // private string Base64Encode(string plainText)
    // {
    //     var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
    //     return System.Convert.ToBase64String(plainTextBytes);
    // }

    // private string Base64Decode(string base64EncodedData)
    // {
    //     var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
    //     return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
    // }
}
