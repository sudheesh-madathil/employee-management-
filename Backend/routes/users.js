var express = require("express");
var router = express.Router();
const Employee = require("../Schema/model");
/* post users data. */
router.post("/", (req, res) => {
  const userData = new Employee({
    name: req.body.name,
    place: req.body.place,
    salary: req.body.salary,
  });
  userData.save().then((user) => {
    res.send(user);
    console.log(user);
  });
});

/**get user data */

router.get("/", (req, res) => {
  Employee.find().then((user) => {
    if (user.length === 0) {
      res.send("user not found");
    }
    res.send(user);
  });
});
/**delete user data */

router.delete("/:_id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params._id).then((user) => {
    res.send("deleted");
  });
});


/**user data edit */

// router.put("/:id",async(req,res)=>{  
//   const userid = req.params.id
//   console.log(userid,"jjjjjjjjjjjjjjjjjj");

//   const changeid = req.body

//  await Employee.findByIdAndUpdate(userid,changeid).then((user)=>{
//     res.send(user)
//   })
// })



//________________update hotel___________________________
router.put("/:id",async (req, res) => {
  console.log(req.body);



  const hot = await Employee.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
 
      place: req.body.place,
      salary: req.body.salary,
   
    },
    { new: true }
  );
  try {
    if (!hot) res.status(500).send(" not updated!!!!");
    console.log(hot+"kkkkkkkkkk");
    return res.send(hot); 
  } catch (erorr) {
    console.log(erorr);
  }
}); 
router.get("/:id", async (req, res) => {
  const editList = await Employee.findById(req.params.id);
  
  try { console.log("object");
    if (!editList) {
      res.json({ succces: false });
    } else {
      console.log(editList);
      res.send(editList);
    }
  } catch (erorr) {
    console.log(erorr);
  }
});
module.exports = router;
