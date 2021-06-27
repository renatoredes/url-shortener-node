var express = require('express');
var router = express.Router();
const Link = require('../models/link');
const app = express()


router.get('/:code', async(req, res, next) =>{
  const code = req.params.code;
  const resultado = await Link.findOne({ where: { code }});
  if(!resultado) return res.sendStatus(404);

  await resultado.save();
  res.redirect(resultado.url)
 
});
/* GET home page.*/
router.get('/', async (req, res, next) => {  
  const shortUrls = await Link.findAll()
  res.render('index', { title: 'Encurtador de URL', shortUrls})
  
});

/*
Função responsável por gerar as urls encurtadas
*/
function generateCode() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

router.post('/new', async (req, res, next) => {
  const url = req.body.url;
  const code = generateCode();

  const resultado = await Link.create({
    url,
    code
  })
  res.redirect('/')
// res.render('/', resultado.dataValues);
})

module.exports = router;
