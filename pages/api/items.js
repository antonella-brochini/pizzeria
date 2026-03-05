export default function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ message: "Método no permitido" });
const items = [
  {
    id: "pizza",
    type: "pizza",
    items: [
      {
        id: "pizza_muzz",
        item_name: "Mozzarella Pizza",
        item_image: "/images/food/pizza.png",
        category: "pizza",
        description: "Classic pizza with mozzarella cheese and tomato sauce.",
        ingredients: "Mozzarella, tomato sauce, oregano",
        price: 350,
      },
      {
        id: "pizza_napolitana",
        item_name: "Napolitan Pizza",
        item_image: "/images/food/pizza.png",
        category: "pizza",
        description: "Pizza with fresh tomato, garlic and mozzarella.",
        ingredients: "Mozzarella, tomato, garlic, oregano",
        price: 420,
      },
      {
        id: "pizza_calabresa",
        item_name: "Calabrese Pizza",
        item_image: "/images/food/pizza.png",
        category: "pizza",
        description: "Spicy calabrese sausage pizza.",
        ingredients: "Mozzarella, calabrese sausage, tomato sauce",
        price: 450,
      },
    ],
  },

  {
    id: "burger",
    type: "burger",
    items: [
      {
        id: "burger_classic",
        item_name: "Classic Burger",
        item_image: "/images/food/burger.png",
        category: "burger",
        description: "Classic beef burger with lettuce and tomato.",
        ingredients: "Beef, lettuce, tomato, mayo",
        price: 290,
      },
      {
        id: "burger_cheddar",
        item_name: "Cheddar Burger",
        item_image: "/images/food/burger.png",
        category: "burger",
        description: "Beef burger with melted cheddar cheese.",
        ingredients: "Beef, cheddar, onion, ketchup",
        price: 320,
      },
      {
        id: "burger_bacon",
        item_name: "Bacon Burger",
        item_image: "/images/food/burger.png",
        category: "burger",
        description: "Beef burger with crispy bacon.",
        ingredients: "Beef, bacon, cheese, lettuce",
        price: 350,
      },
    ],
  },

  {
    id: "dessert",
    type: "donut",
    items: [
      {
        id: "dessert_brownie",
        item_name: "Brownie",
        item_image: "/images/food/donut.png",
        category: "dessert",
        description: "Soft brownie with rich chocolate flavor.",
        ingredients: "Chocolate, flour, sugar",
        price: 160,
      },
    ],
  },

  {
    id: "drink",
    type: "drink",
    items: [
      {
        id: "drink_cola",
        item_name: "Cola 600ml",
        item_image: "/images/food/drink.png",
        category: "drink",
        description: "Refreshing cola drink (600ml).",
        ingredients: "Carbonated water, cola syrup",
        price: 120,
      },
    ],
  },
];

  return res.status(200).json(items);
}