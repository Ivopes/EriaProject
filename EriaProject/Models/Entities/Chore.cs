using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EriaProject.Models
{
    [Table("Chore")]
    public class Chore
    {
        public int ChoreID { get; set; }
        public string Name { get; set; }
        public string Kind { get; set; }
        public DateTime TimeStart { get; set; }
        public DateTime TimeEnd { get; set; }
    }
}
