//載入express
const express = require('express')
const app = express()
const port = 3000

//載入Jason檔
const restaurantList = require('./restaurant.json')

//載入hbs
const exphbs = require('express-handlebars')

//express template engine
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//setting static file
app.use(express.static('public'))

//顯示內容
app.get('/', (req, res) => {
  res.render('index', {restaurants: restaurantList.results})
})

//show內頁
app.get('/restaurants/:restaurant_id', (req, res) =>{

  const restaurant = restaurantList.results.filter(restaurant => restaurant.id ==   req.params.restaurant_id)
  res.render('show', {restaurant: restaurant[0]})
})

//search
app.get('/search', (req, res) => {

  const restaurants = restaurantList.results.filter(restaurant => {

    return restaurant.name.toLocaleLowerCase().includes(req.query.keyword.toLocaleLowerCase())
  })
  res.render('index', {restaurants: restaurants, keyword: req.query.keyword})
})

//listen Express server 創造頁面
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})  