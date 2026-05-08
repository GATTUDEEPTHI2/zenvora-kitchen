const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let orders = [];

const menuItems = [
  {
    id: 1,
    name: "Chicken Dum Biryani",
    category: "Biryani",
    prices: { Single: 180, Full: 300 },
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600"
  },
  {
    id: 2,
    name: "Mutton Biryani",
    category: "Biryani",
    prices: { Single: 250, Full: 420 },
    image: "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=600"
  },
  {
    id: 3,
    name: "Prawns Biryani",
    category: "Biryani",
    prices: { Single: 240, Full: 400 },
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600"
  },
  {
    id: 4,
    name: "Veg Biryani",
    category: "Biryani",
    prices: { Single: 140, Full: 240 },
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600"
  },
  {
    id: 5,
    name: "Paneer Biryani",
    category: "Biryani",
    prices: { Single: 170, Full: 290 },
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600"
  },
  {
    id: 6,
    name: "Egg Biryani",
    category: "Biryani",
    prices: { Single: 130, Full: 220 },
    image: "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=600"
  },
  {
    id: 7,
    name: "Margherita Pizza",
    category: "Pizza",
    prices: { Regular: 220 },
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600"
  },
  {
    id: 8,
    name: "Veg Burger",
    category: "Burgers",
    prices: { Regular: 120 },
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600"
  },
  {
    id: 9,
    name: "Hakka Noodles",
    category: "Starters",
    prices: { Regular: 150 },
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=600"
  },
  {
    id: 10,
    name: "South Indian Meals",
    category: "Meals",
    prices: { Regular: 140 },
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600"
  },
  {
    id: 11,
    name: "Chocolate Dessert",
    category: "Desserts",
    prices: { Regular: 99 },
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600"
  },
  {
    id: 12,
    name: "Fresh Lime Drink",
    category: "Drinks",
    prices: { Regular: 60 },
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600"
  },
  {
  id: 13,
  name: "Chicken Pizza",
  category: "Pizza",
  prices: { Regular: 260, Large: 420 },
  image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600"
},
{
  id: 14,
  name: "Paneer Pizza",
  category: "Pizza",
  prices: { Regular: 240, Large: 390 },
  image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600"
},
{
  id: 15,
  name: "Chicken Burger",
  category: "Burgers",
  prices: { Regular: 160 },
  image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600"
},
{
  id: 16,
  name: "Cheese Burger",
  category: "Burgers",
  prices: { Regular: 150 },
  image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600"
},
{
  id: 17,
  name: "Veg Meals",
  category: "Meals",
  prices: { Regular: 140, Full: 220 },
  image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600"
},
{
  id: 18,
  name: "Chicken Meals",
  category: "Meals",
  prices: { Regular: 180, Full: 280 },
  image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=600"
}
];

app.get("/api/menu", (req, res) => {
  res.json(menuItems);
});

app.post("/api/order", (req, res) => {
  const order = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date()
  };

  orders.push(order);
  res.json({ message: "Order placed successfully", order });
});

const server = app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

setInterval(() => {}, 1000);
