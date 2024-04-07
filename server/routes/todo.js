const express = require('express'); 
// const { getTodo, saveToDo, updateToDo, deleteToDo } = require('../controllers/todoController');


const { 
    getTodo,
    saveToDo,
    updateToDo,
    deleteToDo,
 }  = require('../controllers/todoController');

 
const router = express.Router();

// router.get('/',(req, res)=>{
//     res.json({message:"Hi there..."})
// })
router.get('/', getTodo);
router.post('/save',saveToDo);
router.post('/update',updateToDo);
router.post('/delete',deleteToDo);
module.exports = router; //exporting router