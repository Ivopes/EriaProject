using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EriaProject.Models.Entities
{
    [Table("Kind")]
    public class Kind
    {
        public int KindID { get; set; }
        public string Name { get; set; }
    }
}
