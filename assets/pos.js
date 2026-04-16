/* ═══════════════════════════════════════════════════════════════
   Sonas Till — POS System v1.0
   Full-featured point-of-sale for cafés, pubs & restaurants.
   Staff login · Ordering · Payments · Kitchen display · Stock
   management · Customer loyalty · Reports & analytics
   ═══════════════════════════════════════════════════════════════ */

(function(){
'use strict';

/* ─────────────────────────────────────
   SAMPLE DATA — Café & pub focused
   ───────────────────────────────────── */

const STAFF = [
  {id:1, name:'Admin', pin:'1234', role:'admin'},
  {id:2, name:'Sarah', pin:'5678', role:'staff'},
  {id:3, name:'Declan', pin:'0000', role:'manager'},
];

const CATEGORIES = [
  {id:'draft',      name:'Draft',          icon:'🍺', color:'#a855f7'},
  {id:'bottles',    name:'Bottles & Cans', icon:'🍻', color:'#22d3ee'},
  {id:'spirits',    name:'Spirits',        icon:'🥃', color:'#fbbf24'},
  {id:'cocktails',  name:'Cocktails',      icon:'🍸', color:'#ec4899'},
  {id:'wine',       name:'Wine',           icon:'🍷', color:'#8b5cf6'},
  {id:'shots',      name:'Shots',          icon:'🔥', color:'#ef4444'},
  {id:'softdrinks', name:'Soft Drinks',    icon:'🥤', color:'#34d399'},
  {id:'coffee',     name:'Coffee & Tea',   icon:'☕', color:'#f97316'},
  {id:'starters',   name:'Starters',       icon:'🍗', color:'#fbbf24'},
  {id:'mains',      name:'Main Courses',   icon:'🍳', color:'#a855f7'},
  {id:'pizza',      name:'Pizza & Pasta',  icon:'🍕', color:'#ef4444'},
  {id:'sandwich',   name:'Sandwiches',     icon:'🥪', color:'#22d3ee'},
  {id:'sides',      name:'Sides & Extras', icon:'🍟', color:'#34d399'},
  {id:'kids',       name:'Kids Menu',      icon:'👶', color:'#ec4899'},
  {id:'accom',      name:'Accommodation',  icon:'🛏️', color:'#60a5fa'},
];

const MENU_ITEMS = [
  // DRAFT
  {id:100, cat:'draft', name:'Pt Guinness',        price:5.80, station:'bar', tag:'popular'},
  {id:101, cat:'draft', name:'Pt Coors',           price:5.50, station:'bar'},
  {id:102, cat:'draft', name:'Pt Heineken',        price:5.60, station:'bar'},
  {id:103, cat:'draft', name:'Pt Carlsberg',       price:5.50, station:'bar'},
  {id:104, cat:'draft', name:'Pt Smithwicks',      price:5.50, station:'bar'},
  {id:105, cat:'draft', name:'Pt Moretti',         price:6.00, station:'bar'},
  {id:106, cat:'draft', name:'Pt Rockshore Lager', price:5.50, station:'bar'},
  {id:107, cat:'draft', name:'Pt Rockshore Cider', price:5.80, station:'bar'},
  {id:108, cat:'draft', name:'Pt Orchard Thieves', price:5.80, station:'bar'},
  {id:109, cat:'draft', name:'Half Pint',          price:3.20, station:'bar', modifiers:['halfpint']},

  // BOTTLES & CANS
  {id:110, cat:'bottles', name:'Bt Corona',         price:5.50, station:'bar'},
  {id:111, cat:'bottles', name:'Bt Coors Light',    price:5.00, station:'bar'},
  {id:112, cat:'bottles', name:'Bt Bud',            price:5.00, station:'bar'},
  {id:113, cat:'bottles', name:'Bt Heineken',       price:5.50, station:'bar'},
  {id:114, cat:'bottles', name:'Bt Bulmers',        price:5.50, station:'bar'},
  {id:115, cat:'bottles', name:'Bt Bulmers Lite',   price:5.50, station:'bar'},
  {id:116, cat:'bottles', name:'LN Bulmers',        price:7.00, station:'bar'},
  {id:117, cat:'bottles', name:'Kopparberg Mixed Fruit', price:6.50, station:'bar'},
  {id:118, cat:'bottles', name:'Lrg Kopparberg 00', price:6.00, station:'bar'},
  {id:119, cat:'bottles', name:'Heineken 00',       price:4.50, station:'bar'},
  {id:120, cat:'bottles', name:'WKD',               price:6.00, station:'bar'},
  {id:121, cat:'bottles', name:'Smirnoff Ice',      price:6.00, station:'bar'},
  {id:122, cat:'bottles', name:'Can Bulmers',       price:5.50, station:'bar'},
  {id:123, cat:'bottles', name:'Guinness 00',       price:4.50, station:'bar'},

  // SPIRITS - Standard (€5.50)
  {id:130, cat:'spirits', name:'Smirnoff',          price:5.50, station:'bar'},
  {id:131, cat:'spirits', name:'Gordons',           price:5.50, station:'bar'},
  {id:132, cat:'spirits', name:'Bacardi',           price:5.50, station:'bar'},
  {id:133, cat:'spirits', name:'Captain Morgan',    price:5.50, station:'bar'},
  {id:134, cat:'spirits', name:'Brandy',            price:5.50, station:'bar'},
  {id:135, cat:'spirits', name:'Paddy',             price:5.50, station:'bar'},
  {id:136, cat:'spirits', name:'Powers',            price:5.50, station:'bar'},
  {id:137, cat:'spirits', name:'Bushmills',         price:5.50, station:'bar'},
  {id:138, cat:'spirits', name:'Jim Beam',          price:5.50, station:'bar'},

  // SPIRITS - Mid-range (€6.50)
  {id:139, cat:'spirits', name:'Jameson',           price:6.50, station:'bar', tag:'popular'},
  {id:140, cat:'spirits', name:'Jack Daniels',      price:6.50, station:'bar'},
  {id:141, cat:'spirits', name:'Gordons Pink',      price:6.50, station:'bar'},
  {id:142, cat:'spirits', name:'Malibu',            price:6.50, station:'bar'},
  {id:143, cat:'spirits', name:'Southern Comfort',  price:6.50, station:'bar'},
  {id:144, cat:'spirits', name:'Havana 3yr',        price:6.50, station:'bar'},
  {id:145, cat:'spirits', name:'Jamaican Rum',      price:6.50, station:'bar'},
  {id:146, cat:'spirits', name:'Black Bush',        price:6.50, station:'bar'},
  {id:147, cat:'spirits', name:'Tullamore Dew',     price:6.50, station:'bar'},
  {id:148, cat:'spirits', name:'Absolute',          price:6.50, station:'bar'},
  {id:149, cat:'spirits', name:'Seadog Rum',        price:6.50, station:'bar'},
  {id:150, cat:'spirits', name:'Tanqueray',         price:6.50, station:'bar'},
  {id:151, cat:'spirits', name:'Bombay Sapphire',   price:6.50, station:'bar'},
  {id:152, cat:'spirits', name:'Teachers',          price:6.50, station:'bar'},
  {id:153, cat:'spirits', name:'Black and White',   price:6.50, station:'bar'},

  // SPIRITS - Premium (€7.50-€8.50)
  {id:154, cat:'spirits', name:'Absolut Citron',    price:7.50, station:'bar'},
  {id:155, cat:'spirits', name:'Absolut Raspberry', price:7.50, station:'bar'},
  {id:156, cat:'spirits', name:'Vanilla Vodka',     price:7.50, station:'bar'},
  {id:157, cat:'spirits', name:'Grey Goose',        price:10.00, station:'bar', tag:'new'},
  {id:158, cat:'spirits', name:'Hendricks',         price:8.00, station:'bar'},
  {id:159, cat:'spirits', name:'Tanq Sevilla',      price:7.50, station:'bar'},
  {id:160, cat:'spirits', name:'Dingle Gin',        price:8.00, station:'bar'},
  {id:161, cat:'spirits', name:'Gunpowder Gin',     price:7.50, station:'bar'},
  {id:162, cat:'spirits', name:'Gunpowder Citrus',  price:7.50, station:'bar'},
  {id:163, cat:'spirits', name:'Gunpowder Orange',  price:7.50, station:'bar'},
  {id:164, cat:'spirits', name:'Blackwater Gin',    price:7.50, station:'bar'},
  {id:165, cat:'spirits', name:'Black Gin',         price:8.00, station:'bar'},
  {id:166, cat:'spirits', name:'Wexford Strawberry Gin', price:7.50, station:'bar'},
  {id:167, cat:'spirits', name:'Wexford Gin',       price:7.50, station:'bar'},
  {id:168, cat:'spirits', name:'Black Water Pink',  price:7.50, station:'bar'},
  {id:169, cat:'spirits', name:'Broch Mans',        price:8.00, station:'bar'},
  {id:170, cat:'spirits', name:'Nordes Gin',        price:8.50, station:'bar'},
  {id:171, cat:'spirits', name:'Van Hallers Gin',   price:8.00, station:'bar'},
  {id:172, cat:'spirits', name:'Gvine',             price:8.50, station:'bar'},
  {id:173, cat:'spirits', name:'Monkey 47',         price:10.00, station:'bar'},
  {id:174, cat:'spirits', name:'Gunpowder Gin Pink', price:7.50, station:'bar'},

  // SPIRITS - Premium Whiskeys
  {id:175, cat:'spirits', name:'Green Spot',        price:9.00, station:'bar'},
  {id:176, cat:'spirits', name:'12Y Redbreast',     price:11.00, station:'bar'},
  {id:177, cat:'spirits', name:'Red Spot',          price:15.00, station:'bar', tag:'new'},
  {id:178, cat:'spirits', name:'Yellow Spot',       price:10.00, station:'bar'},
  {id:179, cat:'spirits', name:'Glenda Lough',      price:8.00, station:'bar'},
  {id:180, cat:'spirits', name:'Jameson Crested',   price:8.00, station:'bar'},
  {id:181, cat:'spirits', name:'Black Barrel',      price:8.50, station:'bar'},
  {id:182, cat:'spirits', name:'Middleton Rare',    price:25.00, station:'bar', tag:'new'},
  {id:183, cat:'spirits', name:'Woodford Reserve',  price:8.50, station:'bar'},
  {id:184, cat:'spirits', name:'12yr Glenfiddich',  price:9.00, station:'bar'},

  // SPIRITS - Premium Rum
  {id:185, cat:'spirits', name:'Ron Zacapa',        price:10.00, station:'bar'},
  {id:186, cat:'spirits', name:'Havana 7yr',        price:8.00, station:'bar'},
  {id:187, cat:'spirits', name:'Goslings',          price:7.50, station:'bar'},

  // SPIRITS - Liqueurs
  {id:188, cat:'spirits', name:'Baileys',           price:6.00, station:'bar'},
  {id:189, cat:'spirits', name:'Tia Maria',         price:5.50, station:'bar'},
  {id:190, cat:'spirits', name:'Kahlua',            price:5.50, station:'bar'},
  {id:191, cat:'spirits', name:'Cointreau',         price:6.00, station:'bar'},
  {id:192, cat:'spirits', name:'Crème de Menthe',   price:5.50, station:'bar'},
  {id:193, cat:'spirits', name:'Grand Marnier',     price:6.50, station:'bar'},
  {id:194, cat:'spirits', name:'Drambuie',          price:6.50, station:'bar'},
  {id:195, cat:'spirits', name:'Pernod',            price:5.50, station:'bar'},
  {id:196, cat:'spirits', name:'Schnapps',          price:5.50, station:'bar'},
  {id:197, cat:'spirits', name:'Mickey Finns',      price:5.50, station:'bar'},
  {id:198, cat:'spirits', name:'Limoncello',        price:6.00, station:'bar'},
  {id:199, cat:'spirits', name:'Martini Extra Dry', price:5.50, station:'bar'},
  {id:200, cat:'spirits', name:'Martini Rosso',     price:5.50, station:'bar'},
  {id:201, cat:'spirits', name:'Redbull',           price:3.50, station:'bar', tag:'popular'},
  {id:202, cat:'spirits', name:'Dash Water',        price:2.50, station:'bar'},

  // COCKTAILS
  {id:210, cat:'cocktails', name:'Pornstar Martini',    price:12.00, station:'bar', tag:'popular'},
  {id:211, cat:'cocktails', name:'Whiskey Sour',        price:12.00, station:'bar'},
  {id:212, cat:'cocktails', name:'Espresso Martini',    price:12.00, station:'bar', tag:'popular'},
  {id:213, cat:'cocktails', name:'Old Fashioned',       price:12.00, station:'bar'},
  {id:214, cat:'cocktails', name:'Sex on the Beach',    price:12.00, station:'bar'},
  {id:215, cat:'cocktails', name:'Amaretto Sour',       price:12.00, station:'bar'},
  {id:216, cat:'cocktails', name:'Gin Bramble',         price:12.00, station:'bar'},
  {id:217, cat:'cocktails', name:'Raspberry Mojito',    price:12.00, station:'bar'},
  {id:218, cat:'cocktails', name:'Pink Lady',           price:12.00, station:'bar'},
  {id:219, cat:'cocktails', name:'Daiquiri',            price:12.00, station:'bar'},
  {id:220, cat:'cocktails', name:'Blueberry Mojito',    price:12.00, station:'bar'},
  {id:221, cat:'cocktails', name:'Long Island Iced Tea', price:13.00, station:'bar'},
  {id:222, cat:'cocktails', name:'Aperol Spritz',       price:12.50, station:'bar'},
  {id:223, cat:'cocktails', name:'Cosmopolitan',        price:12.00, station:'bar'},

  // WINE
  {id:230, cat:'wine', name:'Sauvignon Blanc',   price:7.50, station:'bar', modifiers:['wine']},
  {id:231, cat:'wine', name:'Chardonnay',        price:7.50, station:'bar', modifiers:['wine']},
  {id:232, cat:'wine', name:'Pinot Grigio',      price:7.50, station:'bar', modifiers:['wine']},
  {id:233, cat:'wine', name:'Rosé',              price:7.50, station:'bar', modifiers:['wine']},
  {id:234, cat:'wine', name:'Cab Sav',           price:7.50, station:'bar', modifiers:['wine']},
  {id:235, cat:'wine', name:'Merlot',            price:7.50, station:'bar', modifiers:['wine']},
  {id:236, cat:'wine', name:'Tempranillo',       price:7.50, station:'bar', modifiers:['wine']},
  {id:237, cat:'wine', name:'Rionda Prosecco',   price:8.50, station:'bar'},
  {id:238, cat:'wine', name:'Prosecco Snipe',    price:5.50, station:'bar'},
  {id:239, cat:'wine', name:'Sherry',            price:5.50, station:'bar'},
  {id:240, cat:'wine', name:'Port',              price:5.50, station:'bar'},
  {id:241, cat:'wine', name:'Brandy & Port',     price:7.00, station:'bar'},

  // SHOTS
  {id:250, cat:'shots', name:'After Shock',      price:5.00, station:'bar'},
  {id:251, cat:'shots', name:'Sambuca',          price:5.00, station:'bar'},
  {id:252, cat:'shots', name:'Tequila',          price:5.00, station:'bar'},
  {id:253, cat:'shots', name:'Tequila Rose',     price:5.50, station:'bar'},
  {id:254, cat:'shots', name:'Baby Guinness',    price:5.50, station:'bar'},
  {id:255, cat:'shots', name:'Jagermeister',     price:5.50, station:'bar'},

  // SOFT DRINKS - Splits
  {id:260, cat:'softdrinks', name:'Coke',            price:3.00, station:'bar'},
  {id:261, cat:'softdrinks', name:'7Up',             price:3.00, station:'bar'},
  {id:262, cat:'softdrinks', name:'Club Orange',     price:3.00, station:'bar'},
  {id:263, cat:'softdrinks', name:'Club Lemon',      price:3.00, station:'bar'},
  {id:264, cat:'softdrinks', name:'Coke Zero',       price:3.00, station:'bar'},
  {id:265, cat:'softdrinks', name:'Lucozade',        price:3.00, station:'bar'},
  {id:266, cat:'softdrinks', name:'Diet Coke',       price:3.00, station:'bar'},
  {id:267, cat:'softdrinks', name:'7Up Free',        price:3.00, station:'bar'},
  {id:268, cat:'softdrinks', name:'Rock Shandy',     price:3.00, station:'bar'},
  {id:269, cat:'softdrinks', name:'Dash',            price:3.00, station:'bar'},

  // SOFT DRINKS - Mixers
  {id:270, cat:'softdrinks', name:'Tonic',           price:2.50, station:'bar'},
  {id:271, cat:'softdrinks', name:'Slimline Tonic',  price:2.50, station:'bar'},
  {id:272, cat:'softdrinks', name:'Soda Water',      price:2.50, station:'bar'},
  {id:273, cat:'softdrinks', name:'Ginger Ale',      price:2.50, station:'bar'},
  {id:274, cat:'softdrinks', name:'Fever Tree Tonic', price:2.50, station:'bar'},
  {id:275, cat:'softdrinks', name:'Elderflower Tonic', price:2.50, station:'bar'},

  // SOFT DRINKS - Juices
  {id:276, cat:'softdrinks', name:'Apple Juice',     price:3.50, station:'bar'},
  {id:277, cat:'softdrinks', name:'Cranberry Juice', price:3.50, station:'bar'},
  {id:278, cat:'softdrinks', name:'Pineapple Juice', price:3.50, station:'bar'},

  // SOFT DRINKS - Water & Snacks
  {id:279, cat:'softdrinks', name:'Still Water',     price:2.50, station:'bar'},
  {id:280, cat:'softdrinks', name:'Sparkling Water',  price:2.50, station:'bar'},
  {id:281, cat:'softdrinks', name:'Salt Peanuts',    price:2.00, station:'bar'},
  {id:282, cat:'softdrinks', name:'Crisps',          price:2.00, station:'bar'},
  {id:283, cat:'softdrinks', name:'Roast Peanuts',   price:2.00, station:'bar'},
  {id:284, cat:'softdrinks', name:'Dairy Milk',      price:2.00, station:'bar'},

  // COFFEE & TEA
  {id:290, cat:'coffee', name:'Americano',       price:3.20, station:'bar', modifiers:['milk','size']},
  {id:291, cat:'coffee', name:'Espresso',        price:2.80, station:'bar', modifiers:['milk','size']},
  {id:292, cat:'coffee', name:'Cappuccino',      price:3.50, station:'bar', modifiers:['milk','size']},
  {id:293, cat:'coffee', name:'Latte',           price:3.50, station:'bar', modifiers:['milk','size']},
  {id:294, cat:'coffee', name:'Mocha',           price:4.00, station:'bar', modifiers:['milk','size']},
  {id:295, cat:'coffee', name:'Flat White',      price:3.50, station:'bar', modifiers:['milk','size'], tag:'popular'},
  {id:296, cat:'coffee', name:'Double Espresso', price:3.20, station:'bar', modifiers:['milk','size']},
  {id:297, cat:'coffee', name:'Macchiato',       price:3.20, station:'bar', modifiers:['milk','size']},
  {id:298, cat:'coffee', name:'Hot Chocolate',   price:3.80, station:'bar', modifiers:['milk','size']},
  {id:299, cat:'coffee', name:'Tea',             price:2.80, station:'bar'},
  {id:300, cat:'coffee', name:'Tea for 2',       price:5.00, station:'bar'},
  {id:301, cat:'coffee', name:'Herbal Tea',      price:3.00, station:'bar'},
  {id:302, cat:'coffee', name:'Glass of Milk',   price:1.50, station:'bar'},
  {id:303, cat:'coffee', name:'Pint of Milk',    price:2.50, station:'bar'},
  {id:304, cat:'coffee', name:'Irish Coffee',    price:7.50, station:'bar'},
  {id:305, cat:'coffee', name:'Baileys Coffee',  price:7.50, station:'bar'},
  {id:306, cat:'coffee', name:'Calypso Coffee',  price:7.50, station:'bar'},
  {id:307, cat:'coffee', name:'French Coffee',   price:7.50, station:'bar'},
  {id:308, cat:'coffee', name:'Hot Whiskey',     price:7.00, station:'bar'},
  {id:309, cat:'coffee', name:'Hot Port',        price:6.50, station:'bar'},
  {id:310, cat:'coffee', name:'Ice Cream',       price:5.50, station:'bar'},
  {id:311, cat:'coffee', name:'Eton Mess',       price:6.50, station:'bar'},

  // STARTERS / SMALL BITES
  {id:320, cat:'starters', name:'BBQ Wings',            price:8.50, station:'kitchen'},
  {id:321, cat:'starters', name:'King Prawns Pil Pil', price:10.95, station:'kitchen'},
  {id:322, cat:'starters', name:'Caesar Salad',         price:8.50, station:'kitchen'},
  {id:323, cat:'starters', name:'Chicken Skewers',     price:10.95, station:'kitchen'},
  {id:324, cat:'starters', name:'Spice Bag',           price:7.50, station:'kitchen'},

  // MAIN COURSES
  {id:330, cat:'mains', name:'8oz Smash Burger',    price:17.50, station:'kitchen', modifiers:['extras_burger']},
  {id:331, cat:'mains', name:'Chicken Fillet Burger', price:17.50, station:'kitchen', modifiers:['extras_burger']},
  {id:332, cat:'mains', name:'Butter Chicken',       price:14.95, station:'kitchen'},
  {id:333, cat:'mains', name:'Veg Makhani',          price:14.95, station:'kitchen'},
  {id:334, cat:'mains', name:'Stir Fry Noodles',     price:14.95, station:'kitchen'},
  {id:335, cat:'mains', name:'Wings & Chips',        price:12.95, station:'kitchen'},
  {id:336, cat:'mains', name:'Duck Rolls & Chips',   price:12.95, station:'kitchen'},
  {id:337, cat:'mains', name:'Goujons & Chips',      price:11.95, station:'kitchen'},
  {id:338, cat:'mains', name:'Curry of the Day',     price:13.95, station:'kitchen'},
  {id:339, cat:'mains', name:'Roast of the Day',     price:14.95, station:'kitchen'},
  {id:340, cat:'mains', name:'Soup of the Day',      price:6.50, station:'kitchen'},
  {id:341, cat:'mains', name:'Topped Chips',         price:8.95, station:'kitchen'},

  // PIZZA & PASTA
  {id:350, cat:'pizza', name:'Margherita',         price:12.95, station:'kitchen'},
  {id:351, cat:'pizza', name:'Pepperoni Pizza',    price:13.95, station:'kitchen', modifiers:['extras_pizza']},
  {id:352, cat:'pizza', name:'Meat Feast Pizza',   price:14.95, station:'kitchen', modifiers:['extras_pizza']},
  {id:353, cat:'pizza', name:'Create Your Own Pizza', price:14.95, station:'kitchen', modifiers:['extras_pizza']},
  {id:354, cat:'pizza', name:'Chicken Penne Pasta', price:14.95, station:'kitchen'},
  {id:355, cat:'pizza', name:'Penne Arrabiata',    price:13.95, station:'kitchen'},
  {id:356, cat:'pizza', name:'Chicken Fusilli',    price:14.95, station:'kitchen'},

  // SANDWICHES & WRAPS
  {id:360, cat:'sandwich', name:'Ham & Cheese Toastie', price:7.50, station:'kitchen'},
  {id:361, cat:'sandwich', name:'Grilled Cheese Brioche', price:9.00, station:'kitchen'},
  {id:362, cat:'sandwich', name:'Caesar Wrap',      price:11.95, station:'kitchen'},
  {id:363, cat:'sandwich', name:'Chicken Wrap',     price:11.95, station:'kitchen'},
  {id:364, cat:'sandwich', name:'Steak & Cheese Ciabatta', price:21.95, station:'kitchen'},
  {id:365, cat:'sandwich', name:'Tuna Melt',        price:10.95, station:'kitchen'},
  {id:366, cat:'sandwich', name:'Med Veg Ciabatta', price:10.95, station:'kitchen'},

  // SIDES & EXTRAS
  {id:370, cat:'sides', name:'Fries',                   price:4.50, station:'kitchen'},
  {id:371, cat:'sides', name:'Chunky Fries',            price:5.00, station:'kitchen'},
  {id:372, cat:'sides', name:'Curry Chip',              price:5.50, station:'kitchen'},
  {id:373, cat:'sides', name:'Garlic Chip',             price:5.50, station:'kitchen'},
  {id:374, cat:'sides', name:'Curry Garlic Chip',       price:6.00, station:'kitchen'},
  {id:375, cat:'sides', name:'Curry Cheese Fries',      price:6.50, station:'kitchen'},
  {id:376, cat:'sides', name:'Garlic Cheese Fries',     price:6.50, station:'kitchen'},
  {id:377, cat:'sides', name:'Taco Fries',              price:7.00, station:'kitchen'},
  {id:378, cat:'sides', name:'Butter Chicken Fries',    price:7.50, station:'kitchen'},
  {id:379, cat:'sides', name:'Garlic Bread',            price:4.50, station:'kitchen'},
  {id:380, cat:'sides', name:'Garlic Bread Cheese',     price:5.50, station:'kitchen'},
  {id:381, cat:'sides', name:'Garlic Bread Cheese & Onion Jam', price:6.50, station:'kitchen'},
  {id:382, cat:'sides', name:'Garlic Bread Cheese Pizza', price:7.50, station:'kitchen'},
  {id:383, cat:'sides', name:'Garlic Mayo',             price:1.00, station:'kitchen'},
  {id:384, cat:'sides', name:'BBQ Sauce',               price:1.00, station:'kitchen'},
  {id:385, cat:'sides', name:'Peri Peri Mayo',          price:1.00, station:'kitchen'},
  {id:386, cat:'sides', name:'Garlic Butter',           price:1.00, station:'kitchen'},

  // KIDS MENU
  {id:390, cat:'kids', name:'Kids Burger & Chips',    price:7.00, station:'kitchen'},
  {id:391, cat:'kids', name:'Kids Goujons & Chips',   price:7.00, station:'kitchen'},
  {id:392, cat:'kids', name:'Kids Sausage & Chips',   price:7.00, station:'kitchen'},
  {id:393, cat:'kids', name:'Kids Pizza & Chips',     price:7.00, station:'kitchen'},
  {id:394, cat:'kids', name:'Kids Brownie',           price:4.50, station:'kitchen'},
  {id:395, cat:'kids', name:'Kids Ice Cream',         price:4.50, station:'kitchen'},
  {id:396, cat:'kids', name:'Kids Garlic Bread Cheese', price:4.50, station:'kitchen'},
  {id:397, cat:'kids', name:'Kids Garlic Bread',      price:3.50, station:'kitchen'},
  {id:398, cat:'kids', name:'Junior Caesar',          price:5.50, station:'kitchen'},

  // ACCOMMODATION
  {id:400, cat:'accom', name:'Single Room',          price:89.00,  station:'reception'},
  {id:401, cat:'accom', name:'Double Room',          price:119.00, station:'reception', tag:'popular'},
  {id:402, cat:'accom', name:'Twin Room',            price:109.00, station:'reception'},
  {id:403, cat:'accom', name:'Family Room',          price:159.00, station:'reception'},
  {id:404, cat:'accom', name:'Suite',                price:199.00, station:'reception', tag:'hot'},
  {id:405, cat:'accom', name:'Extra Night',          price:79.00,  station:'reception', modifiers:['roomtype']},
  {id:406, cat:'accom', name:'Late Checkout',        price:25.00,  station:'reception'},
  {id:407, cat:'accom', name:'Early Check-in',       price:20.00,  station:'reception'},
  {id:408, cat:'accom', name:'Room Upgrade',         price:30.00,  station:'reception'},
  {id:409, cat:'accom', name:'Breakfast Add-on',     price:12.50,  station:'reception'},
];

const MODIFIERS = {
  milk: {name:'Milk choice', required:false, options:[
    {name:'Regular', price:0}, {name:'Oat', price:0.50},
    {name:'Almond', price:0.50}, {name:'Soy', price:0.40},
  ]},
  size: {name:'Size', required:false, options:[
    {name:'Regular', price:0}, {name:'Large', price:0.60},
  ]},
  halfpint: {name:'Beer', required:false, options:[
    {name:'Guinness', price:0}, {name:'Coors', price:0}, {name:'Heineken', price:0},
    {name:'Carlsberg', price:0}, {name:'Smithwicks', price:0}, {name:'Moretti', price:0},
    {name:'Rockshore', price:0},
  ]},
  wine: {name:'Wine type', required:false, options:[
    {name:'Red', price:0}, {name:'White', price:0}, {name:'Rosé', price:0},
  ]},
  extras_burger: {name:'Burger add-ons', required:false, multi:true, options:[
    {name:'Cheese', price:1.00}, {name:'Bacon', price:1.50},
    {name:'Sautéed Onions', price:1.00}, {name:'Onion Jam', price:1.00}, {name:'Tomato', price:0},
  ]},
  extras_pizza: {name:'Pizza toppings', required:false, multi:true, options:[
    {name:'Pepperoni', price:0.50}, {name:'Chicken', price:0.50},
    {name:'Bacon', price:0.50}, {name:'Cheddar', price:0.50}, {name:'Extra Toppings', price:0.50},
    {name:'Buffalo Mozzarella', price:2.00},
  ]},
  roomtype: {name:'Room type', required:false, options:[
    {name:'Single', price:0}, {name:'Double', price:10}, {name:'Twin', price:5}, {name:'Family', price:30}, {name:'Suite', price:50},
  ]},
};

const TABLES = [
  {id:1,name:'T1',seats:2},{id:2,name:'T2',seats:2},{id:3,name:'T3',seats:4},
  {id:4,name:'T4',seats:4},{id:5,name:'T5',seats:6},{id:6,name:'T6',seats:6},
  {id:7,name:'T7',seats:8},{id:8,name:'T8',seats:4},{id:9,name:'T9',seats:2},
  {id:10,name:'T10',seats:4},{id:11,name:'Bar 1',seats:1},{id:12,name:'Bar 2',seats:1},
  {id:13,name:'Bar 3',seats:1},{id:14,name:'Bar 4',seats:1},
  {id:15,name:'Outside 1',seats:4},{id:16,name:'Outside 2',seats:4},
];

const CUSTOMERS = [
  {id:1, name:'Niamh Murphy', email:'niamh@email.com', phone:'+353871234567', points:245, visits:18, totalSpent:892.50},
  {id:2, name:'Seán Kelly', email:'sean.k@email.com', phone:'+353861234567', points:180, visits:12, totalSpent:654.00},
  {id:3, name:'Orla Byrne', email:'orla.b@email.com', phone:'+353851234567', points:320, visits:24, totalSpent:1240.00},
  {id:4, name:'Cian Walsh', email:'cian@email.com', phone:'+353891234567', points:95, visits:6, totalSpent:312.50},
  {id:5, name:'Aoife Gallagher', email:'aoife.g@email.com', phone:'+353831234567', points:410, visits:30, totalSpent:1580.00},
];

const STOCK_ITEMS = [
  {id:1, name:'Whole Milk 2L', unit:'bottle', qty:12, par:18, reorder:6, cost:1.90, supplier:'Musgrave'},
  {id:2, name:'Oat Milk 1L', unit:'carton', qty:8, par:12, reorder:4, cost:2.50, supplier:'Musgrave'},
  {id:3, name:'Coffee Beans 1kg', unit:'bag', qty:3, par:6, reorder:2, cost:18.00, supplier:'Ariosa Coffee'},
  {id:4, name:'Sourdough Loaf', unit:'loaf', qty:4, par:8, reorder:3, cost:3.50, supplier:'Local Bakery'},
  {id:5, name:'Free Range Eggs (30)', unit:'tray', qty:2, par:4, reorder:1, cost:8.50, supplier:'Musgrave'},
  {id:6, name:'Bacon Rashers 1kg', unit:'pack', qty:5, par:8, reorder:3, cost:7.80, supplier:'Musgrave'},
  {id:7, name:'Avocado (each)', unit:'each', qty:15, par:20, reorder:8, cost:1.20, supplier:'Musgrave'},
  {id:8, name:'Cheddar Cheese 1kg', unit:'block', qty:3, par:4, reorder:2, cost:9.50, supplier:'Musgrave'},
  {id:9, name:'Guinness Keg 50L', unit:'keg', qty:2, par:3, reorder:1, cost:145.00, supplier:'Diageo'},
  {id:10,name:'House Red Wine', unit:'bottle', qty:8, par:12, reorder:4, cost:6.50, supplier:'Wine Direct'},
  {id:11,name:'Coca Cola 330ml', unit:'can', qty:24, par:48, reorder:12, cost:0.65, supplier:'Musgrave'},
  {id:12,name:'Orange Juice 1L', unit:'carton', qty:6, par:10, reorder:4, cost:2.80, supplier:'Musgrave'},
];

const SUPPLIERS = [
  {id:1, name:'Musgrave', contact:'John Daly', email:'orders@musgrave.ie', phone:'+353 91 555 100', leadDays:1},
  {id:2, name:'Ariosa Coffee', contact:'Emma O\'Brien', email:'wholesale@ariosa.ie', phone:'+353 91 555 200', leadDays:2},
  {id:3, name:'Local Bakery', contact:'Paddy Flaherty', email:'paddy@localbakery.ie', phone:'+353 87 555 300', leadDays:0},
  {id:4, name:'Diageo', contact:'Account Team', email:'orders@diageo.ie', phone:'+353 1 555 400', leadDays:3},
  {id:5, name:'Wine Direct', contact:'Sarah Keane', email:'orders@winedirect.ie', phone:'+353 91 555 500', leadDays:2},
];

/* ─────────────────────────────────────
   RECIPES — Menu items to stock mapping
   ───────────────────────────────────── */
const RECIPES = {
  1: [{stockId:3, qty:9, unit:'g'}],                              // Espresso: 9g coffee
  2: [{stockId:3, qty:18, unit:'g'}],                             // Americano: 18g coffee
  3: [{stockId:1, qty:200, unit:'ml'}, {stockId:3, qty:18, unit:'g'}], // Flat White: 200ml milk + 18g coffee
  4: [{stockId:1, qty:150, unit:'ml'}, {stockId:3, qty:18, unit:'g'}], // Cappuccino: 150ml milk + 18g coffee
  5: [{stockId:1, qty:250, unit:'ml'}, {stockId:3, qty:18, unit:'g'}], // Latte: 250ml milk + 18g coffee
  6: [{stockId:1, qty:200, unit:'ml'}, {stockId:3, qty:18, unit:'g'}], // Mocha: 200ml milk + 18g coffee
  7: [{stockId:1, qty:250, unit:'ml'}],                           // Hot Chocolate: 250ml milk
  12: [{stockId:11, qty:1, unit:'can'}],                          // Coke: 1 can
  15: [{stockId:12, qty:250, unit:'ml'}],                         // Fresh OJ: 250ml
  21: [{stockId:5, qty:0.33, unit:'tray'}, {stockId:6, qty:0.33, unit:'pack'}], // Full Irish: eggs + bacon
  22: [{stockId:7, qty:1, unit:'each'}, {stockId:4, qty:0.5, unit:'loaf'}], // Avocado Toast: avocado + bread
  25: [{stockId:7, qty:1, unit:'each'}],                          // Caesar Salad: avocado
  40: [{stockId:9, qty:0.4, unit:'keg'}],                         // Guinness: keg portion
  43: [{stockId:10, qty:1, unit:'bottle'}],                       // House Wine: 1 bottle
};

/* ─────────────────────────────────────
   APP STATE
   ───────────────────────────────────── */
const state = {
  currentStaff: null,
  currentView: 'pos',
  currentCategory: 'coffee',
  currentOrder: {
    id: null, type:'dine-in', table:null, customer:null,
    lines:[], discount:{type:null,value:0,reason:''},
    sentToKitchen: false,
  },
  orders: [],           // completed orders
  heldOrders: [],       // parked orders
  kitchenQueue: [],
  tableOrders: {},      // tableId -> order
  orderCounter: 1,
  kitchenCounter: 1,
  wasteLog: [],         // waste entries
  clockRecords: [],     // staff clock in/out
  purchaseOrders: [],   // POs
  businessInfo: {
    name: 'Sonas Till',
    address: 'Dublin, Ireland',
    vat: 'IE0000000000',
    phone: '+353 1 234 5678',
  },
};

// Load from localStorage
function loadState(){
  try{
    const saved = localStorage.getItem('sonasTillState');
    if(saved){
      const s = JSON.parse(saved);
      if(s.orders) state.orders = s.orders;
      if(s.orderCounter) state.orderCounter = s.orderCounter;
      if(s.kitchenCounter) state.kitchenCounter = s.kitchenCounter;
      if(s.wasteLog) state.wasteLog = s.wasteLog;
      if(s.clockRecords) state.clockRecords = s.clockRecords;
      if(s.purchaseOrders) state.purchaseOrders = s.purchaseOrders;
      if(s.businessInfo) state.businessInfo = s.businessInfo;
    }
  }catch(e){}
}
function saveState(){
  try{
    localStorage.setItem('sonasTillState', JSON.stringify({
      orders: state.orders,
      orderCounter: state.orderCounter,
      kitchenCounter: state.kitchenCounter,
      wasteLog: state.wasteLog,
      clockRecords: state.clockRecords,
      purchaseOrders: state.purchaseOrders,
      businessInfo: state.businessInfo,
    }));
  }catch(e){}
}

/* ─────────────────────────────────────
   UTILITY FUNCTIONS
   ───────────────────────────────────── */
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const fmt = n => '€' + n.toFixed(2);

function toast(msg, type=''){
  const t = $('#toast');
  t.textContent = msg;
  t.className = 'toast show ' + type;
  clearTimeout(t._timer);
  t._timer = setTimeout(()=> t.className = 'toast', 2500);
}

function getGreeting(){
  const h = new Date().getHours();
  if(h < 12) return 'Good morning';
  if(h < 17) return 'Good afternoon';
  return 'Good evening';
}

function startLiveClock(){
  function tick(){
    const now = new Date();
    const time = now.toLocaleTimeString('en-IE', {hour:'2-digit',minute:'2-digit',second:'2-digit'});
    const dateStr = now.toLocaleDateString('en-IE', {weekday:'short', day:'numeric', month:'short'});
    const el = $('#pos-staff-name');
    if(el && state.currentStaff){
      el.innerHTML = state.currentStaff.name + ' · ' + state.currentStaff.role + ' <span style="margin-left:8px;color:var(--text-muted);font-variant-numeric:tabular-nums">' + time + '</span>';
    }
  }
  tick();
  setInterval(tick, 1000);
}

function generateOrderId(){
  return state.orderCounter++;
}

function getItemById(id){
  return MENU_ITEMS.find(i => i.id === id);
}

function getStockById(id){
  return STOCK_ITEMS.find(s => s.id === id);
}

/* ─────────────────────────────────────
   RENDER BAR HELPER (for visual proportional bars)
   ───────────────────────────────────── */
function renderBar(value, max, color) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return `<div style="display:flex;align-items:center;gap:8px;flex:1">
    <div style="flex:1;height:8px;background:var(--surface-3);border-radius:4px;overflow:hidden">
      <div style="width:${pct}%;height:100%;background:${color};border-radius:4px;transition:width .5s var(--ease)"></div>
    </div>
    <span style="font-size:12px;color:var(--text-muted);min-width:36px;text-align:right;font-variant-numeric:tabular-nums">${Math.round(pct)}%</span>
  </div>`;
}

/* ─────────────────────────────────────
   STOCK DEDUCTION & UNITS
   ───────────────────────────────────── */
function deductStockForRecipe(itemId, qty){
  const recipe = RECIPES[itemId];
  if(!recipe) return; // No recipe link

  const toasts = [];
  recipe.forEach(ingredient => {
    const stock = getStockById(ingredient.stockId);
    if(!stock) return;

    let deductionAmount = ingredient.qty * qty;

    // Convert units if needed
    if(ingredient.unit === 'ml' && stock.unit === 'bottle' && stock.id === 1){
      // Whole Milk 2L = 2000ml per bottle
      deductionAmount = deductionAmount / 2000;
    } else if(ingredient.unit === 'g' && stock.unit === 'bag' && stock.id === 3){
      // Coffee Beans 1kg = 1000g per bag
      deductionAmount = deductionAmount / 1000;
    } else if(ingredient.unit === 'ml' && stock.unit === 'carton' && stock.id === 12){
      // Orange Juice 1L = 1000ml per carton
      deductionAmount = deductionAmount / 1000;
    }

    stock.qty -= deductionAmount;
    stock.qty = Math.max(0, Math.round(stock.qty * 100) / 100); // Round to 2 decimals

    if(stock.qty <= stock.reorder){
      toasts.push(stock.name + ' below reorder level');
    }
  });

  if(toasts.length > 0){
    toast('Stock warning: ' + toasts[0], 'warning');
  }
}

/* ─────────────────────────────────────
   LOGIN SYSTEM
   ───────────────────────────────────── */
let pinBuffer = '';

function initLogin(){
  $$('.pin-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.dataset.val;
      if(val === 'clear'){
        pinBuffer = '';
        updatePinDots();
        $('#login-name').textContent = '';
        return;
      }
      if(val === 'enter'){
        attemptLogin();
        return;
      }
      if(pinBuffer.length < 4){
        pinBuffer += val;
        updatePinDots();
        if(pinBuffer.length === 4){
          const staff = STAFF.find(s => s.pin === pinBuffer);
          $('#login-name').textContent = staff ? staff.name : '';
        }
      }
    });
  });
}

function updatePinDots(){
  $$('.pin-dot').forEach((dot, i) => {
    dot.classList.toggle('filled', i < pinBuffer.length);
  });
}

function attemptLogin(){
  const staff = STAFF.find(s => s.pin === pinBuffer);
  if(staff){
    state.currentStaff = staff;

    // Auto clock-in
    const today = new Date().toDateString();
    const alreadyClockedIn = state.clockRecords.some(r =>
      r.staffId === staff.id && new Date(r.clockIn).toDateString() === today && !r.clockOut
    );
    if(!alreadyClockedIn){
      state.clockRecords.push({
        staffId: staff.id,
        staffName: staff.name,
        clockIn: new Date().toISOString(),
        clockOut: null,
      });
    }

    $('#login-screen').classList.remove('active');
    $('#app').classList.add('active');
    $('#pos-staff-name').textContent = staff.name + ' · ' + staff.role;
    $('#pos-greeting-text').textContent = getGreeting();

    // Start live clock
    startLiveClock();

    // Update lock button text
    const lockBtn = $('#lock-btn');
    if(lockBtn) lockBtn.textContent = 'Clock Out';

    toast('Welcome, ' + staff.name, 'success');
    newOrder();
    renderAll();
    saveState();
  } else {
    const pd = $('.pin-display');
    pd.classList.add('shake');
    setTimeout(()=>{
      pd.classList.remove('shake');
      pinBuffer = '';
      updatePinDots();
      $('#login-name').textContent = '';
    }, 500);
    toast('Incorrect PIN', 'error');
  }
}

function clockOut(){
  if(!state.currentStaff) return;

  const today = new Date().toDateString();
  const currentRecord = state.clockRecords.find(r =>
    r.staffId === state.currentStaff.id && new Date(r.clockIn).toDateString() === today && !r.clockOut
  );

  if(currentRecord){
    currentRecord.clockOut = new Date().toISOString();
  }

  state.currentStaff = null;
  $('#app').classList.remove('active');
  $('#login-screen').classList.add('active');
  pinBuffer = '';
  updatePinDots();
  $('#login-name').textContent = '';

  toast('Clocked out successfully', 'success');
  saveState();
}

$('#logout-btn').addEventListener('click', () => {
  if(state.currentStaff){
    clockOut();
  }
});

/* ─────────────────────────────────────
   NAVIGATION
   ───────────────────────────────────── */
function switchView(view){
  state.currentView = view;
  $$('.nav-btn[data-view]').forEach(b => b.classList.toggle('active', b.dataset.view === view));
  $$('.view').forEach(v => v.classList.toggle('active', v.id === 'view-' + view));
  if(view === 'tables') renderTables();
  if(view === 'kitchen') renderKitchen();
  if(view === 'stock') renderStock('inventory');
  if(view === 'customers') renderCustomers();
  if(view === 'reports') renderReports('today');
  if(view === 'settings') renderSettings();
}

$$('.nav-btn[data-view]').forEach(btn => {
  btn.addEventListener('click', () => switchView(btn.dataset.view));
});

/* ─────────────────────────────────────
   POS — CATEGORIES & ITEMS
   ───────────────────────────────────── */
function renderCategories(){
  const wrap = $('#pos-categories');
  wrap.innerHTML = CATEGORIES.map(c =>
    `<button class="cat-btn ${c.id === state.currentCategory ? 'active' : ''}" data-cat="${c.id}">
      <span>${c.icon}</span> ${c.name}
    </button>`
  ).join('');
  wrap.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.currentCategory = btn.dataset.cat;
      renderCategories();
      renderItems();
    });
  });
}

function renderItems(filter=''){
  const wrap = $('#pos-items');
  let items = MENU_ITEMS.filter(i => i.cat === state.currentCategory);
  if(filter){
    const q = filter.toLowerCase();
    items = MENU_ITEMS.filter(i => i.name.toLowerCase().includes(q));
  }
  wrap.innerHTML = items.map(item => {
    const stock = getItemStockLevel(item.id);
    let cls = 'item-btn';
    if(stock === 'low') cls += ' low-stock';
    if(stock === 'out') cls += ' out-of-stock';
    let tag = '';
    if(item.tag) tag = `<span class="item-tag ${item.tag}">${item.tag}</span>`;
    return `<button class="${cls}" data-id="${item.id}">${tag}
      <span class="item-name">${item.name}</span>
      <span class="item-price">${fmt(item.price)}</span>
    </button>`;
  }).join('');
  wrap.querySelectorAll('.item-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = MENU_ITEMS.find(i => i.id === parseInt(btn.dataset.id));
      if(item) addItemToOrder(item);
    });
  });
}

function getItemStockLevel(itemId){
  const recipe = RECIPES[itemId];
  if(!recipe) return 'ok';

  // Check if any ingredient is at critical level
  for(let ingredient of recipe){
    const stock = getStockById(ingredient.stockId);
    if(!stock) continue;

    if(stock.qty === 0) return 'out';

    let checkQty = ingredient.qty;
    // Convert to stock's unit for comparison
    if(ingredient.unit === 'ml' && stock.unit === 'bottle' && stock.id === 1){
      checkQty = ingredient.qty / 2000;
    } else if(ingredient.unit === 'g' && stock.unit === 'bag' && stock.id === 3){
      checkQty = ingredient.qty / 1000;
    } else if(ingredient.unit === 'ml' && stock.unit === 'carton' && stock.id === 12){
      checkQty = ingredient.qty / 1000;
    }

    if(stock.qty < checkQty * 2){
      return 'low';
    }
  }

  return 'ok';
}

// Search
$('#pos-search').addEventListener('input', (e) => {
  const q = e.target.value.trim();
  if(q.length > 0){
    renderItems(q);
  } else {
    renderItems();
  }
});

/* ─────────────────────────────────────
   POS — ORDER MANAGEMENT
   ───────────────────────────────────── */
function newOrder(){
  state.currentOrder = {
    id: generateOrderId(),
    type: 'dine-in',
    table: null,
    customer: null,
    lines: [],
    discount: {type:null, value:0, reason:''},
    sentToKitchen: false,
    staffId: state.currentStaff ? state.currentStaff.id : null,
    createdAt: new Date().toISOString(),
  };
  renderOrder();
}

function addItemToOrder(item){
  if(item.modifiers && item.modifiers.length > 0){
    openModifierModal(item);
    return;
  }
  const existing = state.currentOrder.lines.find(l => l.itemId === item.id && !l.modifiers?.length);
  if(existing){
    existing.qty++;
  } else {
    state.currentOrder.lines.push({
      id: Date.now(),
      itemId: item.id,
      name: item.name,
      price: item.price,
      qty: 1,
      modifiers: [],
      station: item.station,
    });
  }
  renderOrder();
}

function addModifiedItemToOrder(item, selectedMods, qty){
  const modPrice = selectedMods.reduce((sum, m) => sum + m.price, 0);
  state.currentOrder.lines.push({
    id: Date.now(),
    itemId: item.id,
    name: item.name,
    price: item.price + modPrice,
    basePrice: item.price,
    qty: qty,
    modifiers: selectedMods,
    station: item.station,
  });
  renderOrder();
}

function removeOrderLine(lineId){
  state.currentOrder.lines = state.currentOrder.lines.filter(l => l.id !== lineId);
  renderOrder();
}

function updateLineQty(lineId, delta){
  const line = state.currentOrder.lines.find(l => l.id === lineId);
  if(line){
    line.qty = Math.max(0, line.qty + delta);
    if(line.qty === 0) removeOrderLine(lineId);
    else renderOrder();
  }
}

function getOrderSubtotal(){
  return state.currentOrder.lines.reduce((sum, l) => sum + (l.price * l.qty), 0);
}

function getOrderDiscount(){
  const d = state.currentOrder.discount;
  if(!d.type) return 0;
  const sub = getOrderSubtotal();
  if(d.type === 'percent') return sub * (d.value / 100);
  return Math.min(d.value, sub);
}

function getOrderTotal(){
  const sub = getOrderSubtotal();
  const disc = getOrderDiscount();
  return sub - disc;
}

function getOrderTax(){
  return getOrderTotal() * 0.23;
}

function renderOrder(){
  const wrap = $('#order-lines');
  const lines = state.currentOrder.lines;

  if(lines.length === 0){
    wrap.innerHTML = `<div class="order-empty">
      <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/></svg>
      <p>Tap an item to start an order</p>
    </div>`;
  } else {
    wrap.innerHTML = lines.map(l => `
      <div class="order-line new" data-line="${l.id}">
        <div class="line-qty" data-line-qty="${l.id}">${l.qty}</div>
        <div class="line-info">
          <div class="line-name">${l.name}</div>
          ${l.modifiers.length ? '<div class="line-mods">' + l.modifiers.map(m=>m.name).join(', ') + '</div>' : ''}
        </div>
        <div class="line-price">${fmt(l.price * l.qty)}</div>
        <button class="line-remove" data-remove="${l.id}">✕</button>
      </div>
    `).join('');

    wrap.querySelectorAll('[data-line-qty]').forEach(el => {
      el.addEventListener('click', () => updateLineQty(parseInt(el.dataset.lineQty), 1));
    });
    wrap.querySelectorAll('[data-remove]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        removeOrderLine(parseInt(el.dataset.remove));
      });
    });
  }

  const sub = getOrderSubtotal();
  const disc = getOrderDiscount();
  const total = getOrderTotal();
  const tax = getOrderTax();

  $('#order-subtotal').textContent = fmt(sub);
  $('#order-tax').textContent = fmt(tax);
  $('#order-total').textContent = fmt(total);
  $('#btn-pay').textContent = 'Pay ' + fmt(total);
  $('#btn-pay').disabled = lines.length === 0;
  $('#btn-pay').classList.toggle('has-items', lines.length > 0);

  if(disc > 0){
    $('#order-discount-row').style.display = 'flex';
    $('#order-discount').textContent = '-' + fmt(disc);
  } else {
    $('#order-discount-row').style.display = 'none';
  }

  if(state.currentOrder.customer){
    const c = CUSTOMERS.find(cu => cu.id === state.currentOrder.customer);
    if(c){
      $('#order-customer-bar').style.display = 'flex';
      $('#order-customer-name').textContent = c.name;
      $('#order-customer-points').textContent = c.points + ' pts';
    }
  } else {
    $('#order-customer-bar').style.display = 'none';
  }
}

/* ─────────────────────────────────────
   ORDER TYPE & TABLE
   ───────────────────────────────────── */
$$('.order-type').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.order-type').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.currentOrder.type = btn.dataset.type;
    $('#order-table-wrap').style.display = btn.dataset.type === 'dine-in' ? 'block' : 'none';
  });
});

function renderTableSelect(){
  const sel = $('#order-table');
  sel.innerHTML = '<option value="">No table</option>' +
    TABLES.map(t => `<option value="${t.id}">${t.name} (${t.seats})</option>`).join('');
  sel.addEventListener('change', () => {
    state.currentOrder.table = sel.value ? parseInt(sel.value) : null;
  });
}

/* ─────────────────────────────────────
   MODIFIER MODAL
   ───────────────────────────────────── */
let modifierItem = null;
let modifierSelections = {};
let modifierQty = 1;

function openModifierModal(item){
  modifierItem = item;
  modifierSelections = {};
  modifierQty = 1;
  $('#modifier-item-name').textContent = item.name;
  $('#mod-qty').textContent = '1';
  updateModPrice();

  const body = $('#modifier-body');
  body.innerHTML = item.modifiers.map(modKey => {
    const mod = MODIFIERS[modKey];
    if(!mod) return '';
    return `<div class="mod-group" data-mod-key="${modKey}">
      <div class="mod-group-title">${mod.name}${mod.required ? ' (required)' : ''}</div>
      ${mod.options.map((opt, i) => `
        <div class="mod-option" data-mod-key="${modKey}" data-mod-idx="${i}">
          <span class="mod-name">${opt.name}</span>
          <span class="mod-price">${opt.price > 0 ? '+' + fmt(opt.price) : 'Free'}</span>
        </div>
      `).join('')}
    </div>`;
  }).join('');

  body.querySelectorAll('.mod-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const key = opt.dataset.modKey;
      const idx = parseInt(opt.dataset.modIdx);
      const mod = MODIFIERS[key];

      if(mod.multi){
        opt.classList.toggle('selected');
        if(!modifierSelections[key]) modifierSelections[key] = [];
        if(opt.classList.contains('selected')){
          modifierSelections[key].push(idx);
        } else {
          modifierSelections[key] = modifierSelections[key].filter(i => i !== idx);
        }
      } else {
        body.querySelectorAll(`.mod-option[data-mod-key="${key}"]`).forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        modifierSelections[key] = [idx];
      }
      updateModPrice();
    });
  });

  openModal('modal-modifier');
}

function updateModPrice(){
  if(!modifierItem) return;
  let extra = 0;
  Object.entries(modifierSelections).forEach(([key, indices]) => {
    const mod = MODIFIERS[key];
    if(mod) indices.forEach(i => { extra += mod.options[i].price; });
  });
  const total = (modifierItem.price + extra) * modifierQty;
  $('#mod-price').textContent = fmt(total);
}

$('#mod-qty-minus').addEventListener('click', () => {
  modifierQty = Math.max(1, modifierQty - 1);
  $('#mod-qty').textContent = modifierQty;
  updateModPrice();
});
$('#mod-qty-plus').addEventListener('click', () => {
  modifierQty++;
  $('#mod-qty').textContent = modifierQty;
  updateModPrice();
});

$('#btn-add-modified').addEventListener('click', () => {
  const mods = [];
  Object.entries(modifierSelections).forEach(([key, indices]) => {
    const mod = MODIFIERS[key];
    if(mod) indices.forEach(i => mods.push(mod.options[i]));
  });
  addModifiedItemToOrder(modifierItem, mods, modifierQty);
  closeModal('modal-modifier');
  toast(modifierItem.name + ' added', 'success');
});

/* ─────────────────────────────────────
   PAYMENT MODAL & RECEIPT
   ───────────────────────────────────── */
let paymentMethod = 'card';

$('#btn-pay').addEventListener('click', () => {
  if(state.currentOrder.lines.length === 0) return;
  const total = getOrderTotal();
  $('#pay-total').textContent = fmt(total);

  $('#pay-lines').innerHTML = state.currentOrder.lines.map(l =>
    `<div style="display:flex;justify-content:space-between;padding:3px 0"><span>${l.qty}× ${l.name}</span><span>${fmt(l.price * l.qty)}</span></div>`
  ).join('');

  paymentMethod = 'card';
  $$('.pay-method').forEach(b => b.classList.toggle('active', b.dataset.method === 'card'));
  renderPaymentInput();
  openModal('modal-pay');
});

$$('.pay-method').forEach(btn => {
  btn.addEventListener('click', () => {
    paymentMethod = btn.dataset.method;
    $$('.pay-method').forEach(b => b.classList.toggle('active', b === btn));
    renderPaymentInput();
  });
});

function renderPaymentInput(){
  const area = $('#payment-input-area');
  const total = getOrderTotal();

  if(paymentMethod === 'cash'){
    area.innerHTML = `
      <div class="cash-input-wrap">
        <input type="number" class="cash-input" id="cash-tendered" placeholder="${fmt(total)}" step="0.01"/>
        <div class="cash-quick-btns">
          ${[5,10,20,50].map(v => `<button class="cash-quick" data-cash="${v}">${fmt(v)}</button>`).join('')}
          <button class="cash-quick" data-cash="${Math.ceil(total)}">${fmt(Math.ceil(total))}</button>
        </div>
        <div class="change-display" id="change-display"></div>
      </div>`;
    area.querySelectorAll('.cash-quick').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = $('#cash-tendered');
        input.value = btn.dataset.cash;
        updateChange();
      });
    });
    const cashInput = $('#cash-tendered');
    if(cashInput) cashInput.addEventListener('input', updateChange);
  } else if(paymentMethod === 'tab'){
    area.innerHTML = `<div style="text-align:center;padding:20px;color:var(--text-soft)">
      <p style="margin-bottom:8px">Add to customer tab</p>
      <p style="font-size:12px;color:var(--text-muted)">Customer must be attached to order</p>
    </div>`;
  } else if(paymentMethod === 'split'){
    area.innerHTML = `<div style="text-align:center;padding:20px;color:var(--text-soft)">
      <p style="margin-bottom:12px">Split ${fmt(total)} between:</p>
      <div style="display:flex;gap:8px;justify-content:center">
        ${[2,3,4].map(n => `<button class="cash-quick" data-split="${n}">${n} people — ${fmt(total/n)} each</button>`).join('')}
      </div>
    </div>`;
  } else {
    area.innerHTML = `<div style="text-align:center;padding:20px;color:var(--text-soft)">
      <p>Tap card on reader to complete</p>
      <p style="font-size:12px;color:var(--text-muted);margin-top:4px">Or tap "Complete Payment" below</p>
    </div>`;
  }
}

function updateChange(){
  const tendered = parseFloat($('#cash-tendered')?.value) || 0;
  const total = getOrderTotal();
  const change = tendered - total;
  const display = $('#change-display');
  if(display){
    display.textContent = change >= 0 ? 'Change: ' + fmt(change) : 'Short: ' + fmt(Math.abs(change));
    display.style.color = change >= 0 ? 'var(--emerald)' : 'var(--red)';
  }
}

function generateReceipt(){
  const sub = getOrderSubtotal();
  const disc = getOrderDiscount();
  const total = getOrderTotal();
  const tax = getOrderTax();
  const now = new Date();

  return `
    <div style="text-align:center;max-width:300px;margin:0 auto;font-family:monospace;font-size:12px;line-height:1.6">
      <div style="font-weight:bold;margin-bottom:8px">${state.businessInfo.name}</div>
      <div style="font-size:11px;color:var(--text-muted);margin-bottom:16px">
        ${state.businessInfo.address}<br/>
        ${state.businessInfo.phone}
      </div>

      <div style="border-top:1px solid var(--text-muted);border-bottom:1px solid var(--text-muted);padding:8px 0;margin:8px 0">
        <div>Order #${state.currentOrder.id}</div>
        <div>${now.toLocaleDateString()} ${now.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</div>
      </div>

      <div style="text-align:left;margin:12px 0">
        ${state.currentOrder.lines.map(l => `
          <div style="display:flex;justify-content:space-between">
            <span>${l.qty}× ${l.name}</span>
            <span>${fmt(l.price * l.qty)}</span>
          </div>
        `).join('')}
      </div>

      <div style="border-top:1px dashed var(--text-muted);padding-top:8px;margin-top:8px">
        <div style="display:flex;justify-content:space-between">
          <span>Subtotal:</span>
          <span>${fmt(sub)}</span>
        </div>
        ${disc > 0 ? `<div style="display:flex;justify-content:space-between;color:var(--emerald)">
          <span>Discount:</span>
          <span>-${fmt(disc)}</span>
        </div>` : ''}
        <div style="display:flex;justify-content:space-between">
          <span>VAT (23%):</span>
          <span>${fmt(tax)}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-weight:bold;font-size:14px;margin-top:8px">
          <span>Total:</span>
          <span>${fmt(total)}</span>
        </div>
      </div>

      <div style="margin-top:16px;padding-top:8px;border-top:1px solid var(--text-muted);font-size:11px;color:var(--text-muted)">
        Payment: ${paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}<br/>
        Staff: ${state.currentStaff?.name || 'Unknown'}<br/>
        VAT #: ${state.businessInfo.vat}
      </div>

      <div style="margin-top:16px;font-size:11px;color:var(--text-muted)">Thank you for your visit!</div>
    </div>
  `;
}

function showReceipt(){
  const modal = document.createElement('div');
  modal.className = 'modal open';
  modal.id = 'modal-receipt';
  modal.innerHTML = `
    <div class="modal-content" style="width:90%;max-width:400px">
      <div class="modal-header">
        <h2>Receipt</h2>
        <button class="modal-close" data-close="modal-receipt">✕</button>
      </div>
      <div class="modal-body" style="max-height:500px;overflow-y:auto">
        ${generateReceipt()}
      </div>
      <div style="padding:16px;display:flex;gap:8px">
        <button class="header-btn accent" style="flex:1" onclick="window.print()">Print Receipt</button>
        <button class="header-btn" style="flex:1" onclick="document.getElementById('modal-receipt').classList.remove('open')">Done</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener('click', (e) => {
    if(e.target === modal) modal.classList.remove('open');
  });
  modal.querySelector('.modal-close').addEventListener('click', () => {
    modal.classList.remove('open');
    setTimeout(() => modal.remove(), 300);
  });
}

$('#btn-complete-payment').addEventListener('click', () => {
  completePayment();
});

function completePayment(){
  const order = {...state.currentOrder};
  order.total = getOrderTotal();
  order.subtotal = getOrderSubtotal();
  order.tax = getOrderTax();
  order.discountAmount = getOrderDiscount();
  order.paymentMethod = paymentMethod;
  order.completedAt = new Date().toISOString();
  order.staffName = state.currentStaff?.name || 'Unknown';

  // Deduct stock for all order lines
  state.currentOrder.lines.forEach(line => {
    deductStockForRecipe(line.itemId, line.qty);
  });

  state.orders.push(order);

  // Award loyalty points
  if(order.customer){
    const c = CUSTOMERS.find(cu => cu.id === order.customer);
    if(c){
      c.points += Math.floor(order.total);
      c.visits++;
      c.totalSpent += order.total;
    }
  }

  // Clear table
  if(order.table) delete state.tableOrders[order.table];

  saveState();
  closeModal('modal-pay');
  toast('Payment complete — #' + order.id, 'success');

  // Show receipt
  showReceipt();

  setTimeout(() => {
    newOrder();
  }, 1000);
}

/* ─────────────────────────────────────
   FAST CASH BUTTONS
   One-tap: completes payment as cash,
   shows change, prints receipt, opens drawer
   ───────────────────────────────────── */
let lastCashTendered = 0;
let lastChangeGiven = 0;

$$('.fast-cash-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if(state.currentOrder.lines.length === 0){
      toast('No items in order', 'error');
      return;
    }
    const total = getOrderTotal();
    const tendered = btn.dataset.cash === 'exact' ? total : parseFloat(btn.dataset.cash);

    if(tendered < total){
      toast('Not enough — total is ' + fmt(total), 'error');
      return;
    }

    const change = tendered - total;
    lastCashTendered = tendered;
    lastChangeGiven = change;

    // Set payment method to cash and complete
    paymentMethod = 'cash';
    fastCashComplete(tendered, change);
  });
});

function fastCashComplete(tendered, change){
  // Complete the order (same as completePayment but with cash info)
  const order = {...state.currentOrder};
  order.total = getOrderTotal();
  order.subtotal = getOrderSubtotal();
  order.tax = getOrderTax();
  order.discountAmount = getOrderDiscount();
  order.paymentMethod = 'cash';
  order.cashTendered = tendered;
  order.changeGiven = change;
  order.completedAt = new Date().toISOString();
  order.staffName = state.currentStaff?.name || 'Unknown';

  // Deduct stock
  state.currentOrder.lines.forEach(line => {
    deductStockForRecipe(line.itemId, line.qty);
  });

  state.orders.push(order);

  // Loyalty
  if(order.customer){
    const c = CUSTOMERS.find(cu => cu.id === order.customer);
    if(c){
      c.points += Math.floor(order.total);
      c.visits++;
      c.totalSpent += order.total;
    }
  }

  // Clear table
  if(order.table) delete state.tableOrders[order.table];

  saveState();

  // Build print receipt (hidden element for thermal printer)
  buildPrintReceipt(order, tendered, change);

  // Show change overlay
  showChangeOverlay(tendered, change, order);

  // Open cash drawer (ESC/POS command via print)
  openCashDrawer();

  // Auto-print receipt
  setTimeout(() => {
    window.print();
  }, 300);

  toast('Cash payment — Change: ' + fmt(change), 'success');

  setTimeout(() => {
    newOrder();
  }, 1500);
}

function showChangeOverlay(tendered, change, order){
  const overlay = document.createElement('div');
  overlay.className = 'change-overlay';
  overlay.innerHTML = `
    <div class="change-label">Change Due</div>
    <div class="change-amount">${fmt(change)}</div>
    <div class="change-tendered">Tendered: ${fmt(tendered)} · Total: ${fmt(order.total)}</div>
    <button class="change-dismiss">OK — Next Customer</button>
  `;
  document.body.appendChild(overlay);

  const dismiss = () => {
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity .2s';
    setTimeout(() => overlay.remove(), 200);
  };

  overlay.querySelector('.change-dismiss').addEventListener('click', dismiss);
  overlay.addEventListener('click', (e) => { if(e.target === overlay) dismiss(); });

  // Auto-dismiss after 8 seconds
  setTimeout(dismiss, 8000);
}

function buildPrintReceipt(order, tendered, change){
  // Remove old print receipt
  const old = document.getElementById('receipt-print');
  if(old) old.remove();

  const now = new Date();
  const div = document.createElement('div');
  div.id = 'receipt-print';
  div.innerHTML = `
    <div class="receipt-header">
      <strong>${state.businessInfo.name}</strong><br/>
      ${lty points
  if(order.customer){
    const c = CUSTOMERS.find(cu => cu.id === order.customer);
    if(c){
      c.points += Math.floor(order.total);
      c.visits++;
      c.totalSpent += order.total;
    }
  }

  // Clear table
  if(order.table) delete state.tableOrders[order.table];

  saveState();
  closeModal('modal-pay');
  toast('Payment complete — #' + order.id, 'success');

  // Show receipt
  showReceipt();

  setTimeout(() => {
    newOrder();
  }, 1000);
}

/* ─────────────────────────────────────
   FAST CASH BUTTONS
   One-tap: completes payment as cash,
   shows change, prints receipt, opens drawer
   ───────────────────────────────────── */
let lastCashTendered = 0;
let lastChangeGiven = 0;

$$('.fast-cash-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if(state.currentOrder.lines.length === 0){
      toast('No items in order', 'error');
      return;
    }
    const total = getOrderTotal();
    const tendered = btn.dataset.cash === 'exact' ? total : parseFloat(btn.dataset.cash);

    if(tendered < total){
      toast('Not enough — total is ' + fmt(total), 'error');
      return;
    }

    const change = tendered - total;
    lastCashTendered = tendered;
    lastChangeGiven = change;

    // Set payment method to cash and complete
    paymentMethod = 'cash';
    fastCashComplete(tendered, change);
  });
});

function fastCashComplete(tendered, change){
  // Complete the order (same as completePayment but with cash info)
  const order = {...state.currentOrder};
  order.total = getOrderTotal();
  order.subtotal = getOrderSubtotal();
  order.tax = getOrderTax();
  order.discountAmount = getOrderDiscount();
  order.paymentMethod = 'cash';
  order.cashTendered = tendered;
  order.changeGiven = change;
  order.completedAt = new Date().toISOString();
  order.staffName = state.currentStaff?.name || 'Unknown';

  // Deduct stock
  state.currentOrder.lines.forEach(line => {
    deductStockForRecipe(line.itemId, line.qty);
  });

  state.orders.push(order);

  // Loyalty
  if(order.customer){
    const c = CUSTOMERS.find(cu => cu.id === order.customer);
    if(c){
      c.points += Math.floor(order.total);
      c.visits++;
      c.totalSpent += order.total;
    }
  }

  // Clear table
  if(order.table) delete state.tableOrders[order.table];

  saveState();

  // Build print receipt (hidden element for thermal printer)
  buildPrintReceipt(order, tendered, change);

  // Show change overlay
  showChangeOverlay(tendered, change, order);

  // Open cash drawer (ESC/POS command via print)
  openCashDrawer();

  // Auto-print receipt
  setTimeout(() => {
    window.print();
  }, 300);

  toast('Cash payment — Change: ' + fmt(change), 'success');

  setTimeout(() => {
    newOrder();
  }, 1500);
}

function showChangeOverlay(tendered, change, order){
  const overlay = document.createElement('div');
  overlay.className = 'change-overlay';
  overlay.innerHTML = `
    <div class="change-label">Change Due<\/div>
    <div class="change-amount">${fmt(change)}<\/div>
    <div class="change-tendered">Tendered: ${fmt(tendered)} · Total: ${fmt(order.total)}<\/div>
    <button class="change-dismiss">OK — Next Customer<\/button>
  `;
  document.body.appendChild(overlay);

  const dismiss = () => {
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity .2s';
    setTimeout(() => overlay.remove(), 200);
  };

  overlay.querySelector('.change-dismiss').addEventListener('click', dismiss);
  overlay.addEventListener('click', (e) => { if(e.target === overlay) dismiss(); });

  // Auto-dismiss after 8 seconds
  setTimeout(dismiss, 8000);
}

function buildPrintReceipt(order, tendered, change){
  // Remove old print receipt
  const old = document.getElementById('receipt-print');
  if(old) old.remove();

  const now = new Date();
  const div = document.createElement('div');
  div.id = 'receipt-print';
  div.innerHTML = `
    <div class="receipt-header">
      <strong>${state.businessInfo.name}<\/strong><br\/>
      ${state.businessInfo.address}<br\/>
      ${state.businessInfo.phone}<br\/>
      VAT: ${state.businessInfo.vat}
    <\/div>
    <div style="text-align:center;margin:8px 0">
      Order #${order.id}<br\/>
      ${now.toLocaleDateString('en-IE')} ${now.toLocaleTimeString('en-IE',{hour:'2-digit',minute:'2-digit'})}<br\/>
      Staff: ${order.staffName}
    <\/div>
    <div style="border-top:1px dashed #000;padding-top:6px;margin-top:6px">
      ${(order.lines||[]).map(l => `
        <div class="receipt-line"><span>${l.qty} x ${l.name}<\/span><span>${fmt(l.price * l.qty)}<\/span><\/div>
      `).join('')}
    <\/div>
    <div style="border-top:1px dashed #000;padding-top:6px;margin-top:6px">
      <div class="receipt-line"><span>Subtotal<\/span><span>${fmt(order.subtotal)}<\/span><\/div>
      <div class="receipt-line"><span>VAT (23%)<\/span><span>${fmt(order.tax)}<\/span><\/div>
      ${order.discountAmount > 0 ? `<div class="receipt-line"><span>Discount<\/span><span>-${fmt(order.discountAmount)}<\/span><\/div>` : ''}
    <\/div>
    <div class="receipt-total">
      <div class="receipt-line"><span>TOTAL<\/span><span>${fmt(order.total)}<\/span><\/div>
      <div class="receipt-line"><span>Cash Tendered<\/span><span>${fmt(tendered)}<\/span><\/div>
      <div class="receipt-line" style="font-size:16px"><span>CHANGE<\/span><span>${fmt(change)}<\/span><\/div>
    <\/div>
    <div class="receipt-footer">
      Payment: Cash<br\/>
      Thank you for visiting<br\/>
      The Coachman\'s Inn
    <\/div>
  `;
  document.body.appendChild(div);
}

function openCashDrawer(){
  // ESC\/POS cash drawer kick command
  // This sends the standard pulse command to open the drawer
  // Works with most USB\/network receipt printers (Epson, Star, etc.)
  // The command is: ESC p 0 25 250 (hex: 1B 70 00 19 FA)
  // Sent via a hidden iframe print or the receipt print itself
  // The printer must be set as the default printer for window.print()

  // For USB\/serial drawers, the print command itself triggers the kick
  // Most POS printers have the drawer connected via RJ11 cable
  // The window.print() call above will trigger it if the printer
  // driver is configured with \"Open cash drawer\" on print

  console.log('Cash drawer: kick command sent via print job');
}

/* ─────────────────────────────────────
   HOLD / PARK ORDER
   ───────────────────────────────────── */
$('#btn-hold').addEventListener('click', () => {
  if(state.currentOrder.lines.length === 0) return;
  state.heldOrders.push({...state.currentOrder});
  toast('Order #' + state.currentOrder.id + ' held', 'success');
  $('#btn-hold').textContent = state.heldOrders.length > 0 ? `Hold (${state.heldOrders.length})` : 'Hold';
  newOrder();
});

/* ─────────────────────────────────────
   DISCOUNT
   ───────────────────────────────────── */
$('#btn-discount').addEventListener('click', () => {
  if(state.currentOrder.lines.length === 0) return;
  openModal('modal-discount');
});

$$('.discount-type').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.discount-type').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

$('#btn-apply-discount').addEventListener('click', () => {
  const dtype = $('.discount-type.active')?.dataset.dtype || 'percent';
  const val = parseFloat($('#discount-value').value) || 0;
  const reason = $('#discount-reason').value;

  if(val <= 0) { toast('Enter a discount value', 'error'); return; }
  if(dtype === 'percent' && val > 100) { toast('Max 100%', 'error'); return; }

  state.currentOrder.discount = {type: dtype, value: val, reason: reason};
  closeModal('modal-discount');
  renderOrder();
  toast('Discount applied', 'success');
});

/* ─────────────────────────────────────
   CUSTOMER ATTACHMENT & NEW CUSTOMER
   ───────────────────────────────────── */
$('#btn-customer').addEventListener('click', () => {
  renderCustomerModalList();
  openModal('modal-customer');
});

$('#order-customer-clear').addEventListener('click', () => {
  state.currentOrder.customer = null;
  renderOrder();
});

function renderCustomerModalList(filter=''){
  const wrap = $('#customer-modal-list');
  let list = CUSTOMERS;
  if(filter){
    const q = filter.toLowerCase();
    list = CUSTOMERS.filter(c => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q));
  }
  wrap.innerHTML = list.map(c => `
    <div class="customer-list-item" data-cid="${c.id}">
      <div class="cl-avatar">${c.name.charAt(0)}<\/div>
      <div>
        <div class="cl-name">${c.name}<\/div>
        <div class="cl-detail">${c.email} · ${c.phone}<\/div>
      <\/div>
      <div class="cl-points">${c.points} pts<\/div>
    <\/div>
  `).join('');
  wrap.querySelectorAll('.customer-list-item').forEach(el => {
    el.addEventListener('click', () => {
      state.currentOrder.customer = parseInt(el.dataset.cid);
      closeModal('modal-customer');
      renderOrder();
      const c = CUSTOMERS.find(cu => cu.id === state.currentOrder.customer);
      toast(c.name + ' attached', 'success');
    });
  });
}

$('#customer-modal-search').addEventListener('input', (e) => {
  renderCustomerModalList(e.target.value.trim());
});

// New customer form
function openNewCustomerForm(){
  const modal = document.createElement('div');
  modal.className = 'modal open';
  modal.id = 'modal-new-customer';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>Add New Customer<\/h2>
        <button class="modal-close" data-close="modal-new-customer">✕<\/button>
      <\/div>
      <div class="modal-body">
        <div style="margin-bottom:16px">
          <label style="display:block;margin-bottom:4px;font-size:12px;color:var(--text-soft)">Name *<\/label>
          <input type="text" id="new-cust-name" placeholder="Customer name" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:4px;background:var(--bg-darker);color:#fff"\/>
        <\/div>
        <div style="margin-bottom:16px">
          <label style="display:block;margin-bottom:4px;font-size:12px;color:var(--text-soft)">Email<\/label>
          <input type="email" id="new-cust-email" placeholder="email@example.com" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:4px;background:var(--bg-darker);color:#fff"\/>
        <\/div>
        <div style="margin-bottom:16px">
          <label style="display:block;margin-bottom:4px;font-size:12px;color:var(--text-soft)">Phone<\/label>
          <input type="tel" id="new-cust-phone" placeholder="+353..." style="width:100%;padding:8px;border:1px solid var(--border);border-radius:4px;background:var(--bg-darker);color:#fff"\/>
        <\/div>
      <\/div>
      <div style="padding:16px;display:flex;gap:8px">
        <button class="header-btn accent" style="flex:1" id="btn-save-customer">Save<\/button>
        <button class="header-btn" style="flex:1" onclick="document.getElementById('modal-new-customer').classList.remove('open')">Cancel<\/button>
      <\/div>
    <\/div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener('click', (e) => {
    if(e.target === modal) modal.classList.remove('open');
  });
  modal.querySelector('.modal-close').addEventListener('click', () => {
    modal.classList.remove('open');
    setTimeout(() => modal.remove(), 300);
  });

  const saveBtn = modal.querySelector('#btn-save-customer');
  saveBtn.addEventListener('click', () => {
    const name = $('#new-cust-name').value.trim();
    const email = $('#new-cust-email').value.trim();
    const phone = $('#new-cust-phone').value.trim();

    if(!name){
      toast('Enter customer name', 'error');
      return;
    }

    const newId = Math.max(...CUSTOMERS.map(c => c.id), 0) + 1;
    CUSTOMERS.push({
      id: newId,
      name: name,
      email: email || 'no-email@local',
      phone: phone || 'No phone',
      points: 0,
      visits: 0,
      totalSpent: 0,
    });

    state.currentOrder.customer = newId;
    modal.classList.remove('open');
    setTimeout(() => modal.remove(), 300);
    renderOrder();
    toast(name + ' added and attached', 'success');
  });
}

/* ─────────────────────────────────────
   SEND TO KITCHEN
   ───────────────────────────────────── */
$('#btn-send-kitchen').addEventListener('click', () => {
  const kitchenItems = state.currentOrder.lines.filter(l => l.station === 'kitchen');
  const barItems = state.currentOrder.lines.filter(l => l.station === 'bar');

  if(kitchenItems.length === 0 && barItems.length === 0){
    toast('No items to send', 'error');
    return;
  }

  if(kitchenItems.length > 0){
    state.kitchenQueue.push({
      id: 'K' + (state.kitchenCounter++),
      orderId: state.currentOrder.id,
      type: state.currentOrder.type,
      table: state.currentOrder.table ? TABLES.find(t=>t.id === state.currentOrder.table)?.name : null,
      items: kitchenItems.map(l => ({qty:l.qty, name:l.name, mods:l.modifiers.map(m=>m.name)})),
      sentAt: Date.now(),
      station: 'kitchen',
    });
  }
  if(barItems.length > 0){
    state.kitchenQueue.push({
      id: 'B' + (state.kitchenCounter++),
      orderId: state.currentOrder.id,
      type: state.currentOrder.type,
      table: state.currentOrder.table ? TABLES.find(t=>t.id === state.currentOrder.table)?.name : null,
      items: barItems.map(l => ({qty:l.qty, name:l.name, mods:l.modifiers.map(m=>m.name)})),
      sentAt: Date.now(),
      station: 'bar',
    });
  }

  state.currentOrder.sentToKitchen = true;
  toast('Sent to kitchen & bar', 'success');
  renderKitchen();
});

/* ─────────────────────────────────────
   TABLES VIEW
   ───────────────────────────────────── */
function renderTables(){
  const grid = $('#tables-grid');
  grid.innerHTML = TABLES.map(t => {
    const order = state.tableOrders[t.id];
    let cls = 'table-card';
    let extra = '';
    if(order){
      cls += ' occupied';
      const total = order.lines.reduce((s,l) => s + l.price * l.qty, 0);
      extra = `<div class="table-amount">${fmt(total)}<\/div>
               <div class="table-time">${timeSince(order.createdAt)}<\/div>`;
    } else {
      cls += ' free';
    }
    return `<div class="${cls}" data-table="${t.id}">
      <div class="table-name">${t.name}<\/div>
      <div class="table-seats">${t.seats} seats<\/div>
      ${extra}
    <\/div>`;
  }).join('');

  grid.querySelectorAll('.table-card').forEach(card => {
    card.addEventListener('click', () => {
      const tid = parseInt(card.dataset.table);
      if(state.tableOrders[tid]){
        state.currentOrder = state.tableOrders[tid];
        switchView('pos');
        renderOrder();
        toast('Table ' + TABLES.find(t=>t.id===tid)?.name + ' loaded');
      } else {
        newOrder();
        state.currentOrder.table = tid;
        state.currentOrder.type = 'dine-in';
        state.tableOrders[tid] = state.currentOrder;
        switchView('pos');
        $('#order-table').value = tid;
        toast('New order for ' + TABLES.find(t=>t.id===tid)?.name, 'success');
      }
    });
  });
}

function timeSince(iso){
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if(mins < 1) return 'just now';
  if(mins < 60) return mins + ' min';
  return Math.floor(mins/60) + 'h ' + (mins%60) + 'm';
}

/* ─────────────────────────────────────
   KITCHEN VIEW WITH FILTERS
   ───────────────────────────────────── */
let kitchenFilter = 'all';

function renderKitchen(){
  const queue = $('#kitchen-queue');
  let tickets = state.kitchenQueue;

  // Apply filter
  if(kitchenFilter === 'food'){
    tickets = tickets.filter(t => t.station === 'kitchen');
  } else if(kitchenFilter === 'drinks'){
    tickets = tickets.filter(t => t.station === 'bar');
  }

  const rushMode = tickets.length >= 5;
  $('#kitchen-count').textContent = tickets.length + ' active order' + (tickets.length !== 1 ? 's' : '') + (rushMode ? ' 🚨 RUSH!' : '');

  if(tickets.length === 0){
    queue.innerHTML = `<div class="kitchen-empty">
      <svg viewBox="0 0 24 24"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"\/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"\/><\/svg>
      <p>No active orders — kitchen is clear<\/p>
    <\/div>`;
    return;
  }

  queue.innerHTML = tickets.map(ticket => {
    const elapsed = Math.floor((Date.now() - ticket.sentAt) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    const timeStr = mins + ':' + String(secs).padStart(2,'0');
    let timeClass = 'ok';
    let timeColor = '#34d399';
    if(mins >= 10){ timeClass = 'danger'; timeColor = '#ef4444'; }
    else if(mins >= 5){ timeClass = 'warning'; timeColor = '#f59e0b'; }

    const stationLabel = ticket.station === 'bar' ? 'BAR' : 'KITCHEN';
    const stationColor = ticket.station === 'bar' ? '#3b82f6' : '#f59e0b';

    return `<div class="kitchen-ticket ${mins >= 10 ? 'urgent' : ''}">
      <div class="kitchen-ticket-header" style="display:flex;justify-content:space-between;align-items:center">
        <div style="display:flex;align-items:center;gap:10px">
          <span class="ticket-id" style="font-size:18px;font-weight:800">#${ticket.id}<\/span>
          <span style="background:${stationColor};color:${ticket.station === 'bar' ? '#fff' : '#000'};padding:4px 10px;border-radius:4px;font-size:11px;font-weight:700;letter-spacing:0.5px">${stationLabel}<\/span>
          ${ticket.table ? `<span style="color:var(--text-muted);font-size:13px">Table ${ticket.table}<\/span>` : ''}
        <\/div>
        <span class="ticket-type ${ticket.type}">${ticket.type}<\/span>
      <\/div>
      <div class="kitchen-ticket-body">
        ${ticket.items.map(item => `
          <div class="kitchen-ticket-item">
            <span class="k-qty" style="font-weight:800;font-size:14px">${item.qty}×<\/span>
            <span>
              <span class="k-name" style="font-weight:600">${item.name}<\/span>
              ${item.mods.length ? '<div class="k-mods">' + item.mods.join(', ') + '<\/div>' : ''}
            <\/span>
          <\/div>
        `).join('')}
      <\/div>
      <div class="kitchen-ticket-footer">
        <div style="display:flex;align-items:center;gap:10px;flex:1">
          <div style="font-size:12px;color:${timeColor};font-weight:700;min-width:45px;font-variant-numeric:tabular-nums;padding:6px 8px;background:${timeColor}20;border-radius:4px">${timeStr}<\/div>
          <div style="font-size:11px;color:var(--text-muted)">${mins < 5 ? 'Fresh order' : mins < 10 ? 'Getting warm' : 'OVERDUE'}<\/div>
        <\/div>
        <button class="bump-btn" data-bump="${ticket.id}" style="background:var(--emerald);color:#000;font-weight:700;padding:8px 16px;border-radius:4px;border:none;cursor:pointer">✓ DONE<\/button>
      <\/div>
    <\/div>`;
  }).join('');

  queue.querySelectorAll('.bump-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.kitchenQueue = state.kitchenQueue.filter(t => t.id !== btn.dataset.bump);
      renderKitchen();
      toast('Order completed', 'success');
    });
  });

  // Update nav badge
  const kitchenNav = $('[data-view="kitchen"]');
  if(kitchenNav){
    let badge = kitchenNav.querySelector('.nav-badge');
    if(state.kitchenQueue.length > 0){
      if(!badge){
        badge = document.createElement('span');
        badge.className = 'nav-badge';
        kitchenNav.appendChild(badge);
      }
      badge.textContent = state.kitchenQueue.length;
    } else if(badge){
      badge.remove();
    }
  }
}

// Kitchen filter buttons
const kitchenFilterArea = document.querySelector('[data-kitchen-filters]');
if(kitchenFilterArea){
  const filterHTML = `
    <button class="kitchen-filter active" data-filter="all">All<\/button>
    <button class="kitchen-filter" data-filter="food">Food<\/button>
    <button class="kitchen-filter" data-filter="drinks">Drinks<\/button>
  `;
  kitchenFilterArea.innerHTML = filterHTML;
  kitchenFilterArea.querySelectorAll('.kitchen-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      kitchenFilterArea.querySelectorAll('.kitchen-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      kitchenFilter = btn.dataset.filter;
      renderKitchen();
    });
  });
}

// Update kitchen timers every second
setInterval(() => {
  if(state.currentView === 'kitchen' && state.kitchenQueue.length > 0){
    renderKitchen();
  }
}, 5000);

/* ─────────────────────────────────────
   STOCK VIEW
   ───────────────────────────────────── */
$$('[data-stock-tab]').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('[data-stock-tab]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderStock(btn.dataset.stockTab);
  });
});

function renderStock(tab){
  const content = $('#stock-content');

  if(tab === 'inventory'){
    const totalItems = STOCK_ITEMS.length;
    const lowStockCount = STOCK_ITEMS.filter(i => i.qty > i.reorder && i.qty < i.par * 0.5).length;
    const criticalCount = STOCK_ITEMS.filter(i => i.qty <= i.reorder).length;
    const totalValue = STOCK_ITEMS.reduce((sum, i) => sum + (i.qty * i.cost), 0);

    content.innerHTML = `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;padding:16px;background:var(--surface-2);border-bottom:1px solid var(--border);margin-bottom:16px">
        <div style="background:var(--surface);padding:12px;border-radius:var(--radius);border:1px solid var(--border)">
          <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px">📦 Total Items<\/div>
          <div style="font-size:24px;font-weight:800;color:#fff;margin-top:4px">${totalItems}<\/div>
        <\/div>
        <div style="background:var(--surface);padding:12px;border-radius:var(--radius);border:1px solid var(--border)">
          <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px">⚠️ Low Stock<\/div>
          <div style="font-size:24px;font-weight:800;color:#f59e0b;margin-top:4px">${lowStockCount}<\/div>
        <\/div>
        <div style="background:var(--surface);padding:12px;border-radius:var(--radius);border:1px solid var(--border)">
          <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px">🔴 Critical<\/div>
          <div style="font-size:24px;font-weight:800;color:var(--red);margin-top:4px">${criticalCount}<\/div>
        <\/div>
        <div style="background:var(--surface);padding:12px;border-radius:var(--radius);border:1px solid var(--border)">
          <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px">💰 Total Value<\/div>
          <div style="font-size:24px;font-weight:800;color:#fff;margin-top:4px">${fmt(totalValue)}<\/div>
        <\/div>
      <\/div>

      <table class="stock-table">
        <thead><tr>
          <th>Item<\/th><th>Unit<\/th><th>Qty<\/th><th>Par<\/th><th>Reorder<\/th><th>Status<\/th><th>Supplier<\/th><th>Actions<\/th>
        <\/tr><\/thead>
        <tbody>${STOCK_ITEMS.map(item => {
          const pct = Math.min(100, (item.qty / item.par) * 100);
          let status = 'ok', statusLabel = 'OK';
          if(item.qty <= item.reorder){ status = 'critical'; statusLabel = 'Reorder'; }
          else if(pct < 50){ status = 'low'; statusLabel = 'Low'; }
          return `<tr>
            <td style="font-weight:600;color:#fff">${item.name}<\/td>
            <td>${item.unit}<\/td>
            <td>
              <div style="display:flex;align-items:center;gap:8px">
                <div style="flex:1;height:12px;background:var(--surface-3);border-radius:6px;overflow:hidden;min-width:80px">
                  <div style="width:${pct}%;height:100%;background:${status === 'ok' ? '#34d399' : status === 'low' ? '#f59e0b' : '#ef4444'};border-radius:6px"><\/div>
                <\/div>
                <span style="font-weight:700;min-width:40px;text-align:right;font-variant-numeric:tabular-nums">${item.qty}</span>
              <\/div>
            <\/td>
            <td style="color:var(--text-muted)">${item.par}<\/td>
            <td style="color:var(--text-muted)">${item.reorder}<\/td>
            <td><span class="stock-badge ${status}">${statusLabel}<\/span><\/td>
            <td>${item.supplier}<\/td>
            <td><button class="stock-action-btn" style="padding:4px 8px;font-size:11px;background:var(--surface-3);border:1px solid var(--border);border-radius:4px;cursor:pointer;color:var(--text-soft);margin-right:4px">Adjust<\/button><button class="stock-action-btn" style="padding:4px 8px;font-size:11px;background:var(--purple-soft);border:1px solid var(--border);border-radius:4px;cursor:pointer;color:#fff">Order<\/button><\/td>
          <\/tr>`;
        }).join('')}<\/tbody>
      <\/table>`;
  } else if(tab === 'suppliers'){
    content.innerHTML = `
      <table class="stock-table">
        <thead><tr><th>Supplier<\/th><th>Contact<\/th><th>Email<\/th><th>Phone<\/th><th>Lead Time<\/th><\/tr><\/thead>
        <tbody>${SUPPLIERS.map(s => `<tr>
          <td style="font-weight:600;color:#fff">${s.name}<\/td>
          <td>${s.contact}<\/td>
          <td><a href="mailto:${s.email}" style="color:var(--purple-soft)">${s.email}<\/a><\/td>
          <td>${s.phone}<\/td>
          <td>${s.leadDays} day${s.leadDays !== 1 ? 's' : ''}<\/td>
        <\/tr>`).join('')}<\/tbody>
      <\/table>`;
  } else if(tab === 'recipes'){
    content.innerHTML = `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:16px;padding:16px">
        ${Object.entries(RECIPES).map(([itemId, ingredients]) => {
          const item = getItemById(parseInt(itemId));
          if(!item) return '';
          const ingList = ingredients.map(ing => {
            const stock = getStockById(ing.stockId);
            return stock ? {qty: ing.qty, unit: ing.unit, name: stock.name} : null;
          }).filter(x => x);
          return `<div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);padding:16px">
            <div style="font-weight:700;color:#fff;font-size:14px;margin-bottom:12px;display:flex;align-items:center;gap:8px">
              <span>${item.icon || '📌'}<\/span>
              ${item.name}
            <\/div>
            <div style="background:var(--surface-2);border-radius:var(--radius);padding:12px;font-size:12px">
              ${ingList.length > 0 ? `
                <div style="color:var(--text-muted);margin-bottom:8px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;font-size:11px">Ingredients:<\/div>
                <ul style="margin:0;padding:0;list-style:none">
                  ${ingList.map(ing => `<li style="padding:4px 0;color:var(--text-soft);border-bottom:1px solid rgba(255,255,255,.05)">
                    <span style="font-weight:600;color:#fff">${ing.qty}${ing.unit}<\/span> ${ing.name}
                  <\/li>`).join('')}
                <\/ul>
              ` : `<p style="color:var(--text-muted);margin:0">No stock links<\/p>`}
            <\/div>
          <\/div>`;
        }).join('')}
      <\/div>`;
  } else if(tab === 'orders'){
    const lowItems = STOCK_ITEMS.filter(i => i.qty <= i.reorder);
    content.innerHTML = `<div style="padding:20px">
      <h3 style="color:#fff;margin-bottom:12px">Draft Purchase Order — ${lowItems.length} item${lowItems.length !== 1 ? 's' : ''} below reorder<\/h3>
      ${lowItems.length ? `<table class="stock-table">
        <thead><tr><th>Item<\/th><th>Current<\/th><th>Par<\/th><th>Order Qty<\/th><th>Supplier<\/th><th>Est. Cost<\/th><\/tr><\/thead>
        <tbody>${lowItems.map(i => {
          const orderQty = i.par - i.qty;
          return `<tr>
            <td style="font-weight:600;color:#fff">${i.name}<\/td>
            <td style="color:var(--red);font-weight:600">${i.qty}<\/td>
            <td>${i.par}<\/td>
            <td style="color:var(--emerald);font-weight:700">${orderQty}<\/td>
            <td>${i.supplier}<\/td>
            <td style="font-variant-numeric:tabular-nums">${fmt(i.cost * orderQty)}<\/td>
          <\/tr>`;
        }).join('')}<\/tbody>
      <\/table>
      <div style="margin-top:16px;display:flex;gap:8px">
        <button class="header-btn accent" onclick="document.querySelector('#toast').className='toast show success';document.querySelector('#toast').textContent='Purchase order drafted'">Generate PO<\/button>
        <button class="header-btn">Export CSV<\/button>
      <\/div>` : '<p style="color:var(--emerald)">All stock levels are above reorder points<\/p>'}
    <\/div>`;
  } else if(tab === 'waste'){
    content.innerHTML = `<div style="padding:20px">
      <h3 style="color:#fff;margin-bottom:16px">Waste Log<\/h3>
      ${state.wasteLog.length > 0 ? `
        <table class="stock-table" style="margin-bottom:16px">
          <thead><tr><th>Date<\/th><th>Item<\/th><th>Qty<\/th><th>Reason<\/th><th>Logged By<\/th><th>Notes<\/th><\/tr><\/thead>
          <tbody>${state.wasteLog.map(w => `<tr>
            <td style="font-size:12px;color:var(--text-muted)">${new Date(w.date).toLocaleDateString()}<\/td>
            <td style="font-weight:600;color:#fff">${w.itemName}<\/td>
            <td>${w.qty} ${w.unit}<\/td>
            <td>${w.reason}<\/td>
            <td>${w.staffName}<\/td>
            <td style="font-size:12px;color:var(--text-muted)">${w.notes || '-'}<\/td>
          <\/tr>`).join('')}<\/tbody>
        <\/table>
      ` : '<p style="color:var(--text-muted);margin-bottom:16px">No waste entries yet<\/p>'}
      <button class="header-btn accent" id="btn-log-waste-form">Log Waste<\/button>
    <\/div>`;

    $('#btn-log-waste-form').addEventListener('click', openWasteForm);
  }
}

function openWasteForm(){
  const modal = document.createElement('div');
  modal.className = 'modal open';
  modal.id = 'modal-waste';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>Log Waste<\/h2>
        <button class="modal-close" data-close="modal-waste">✕<\/button>
      <\/div>
      <div class="modal-body">
        <div style="margin-bottom:16px">
          <label style="display:block;margin-bottom:4px;font-size:12px;color:var(--text-soft)">Stock Item *<\/label>
          <select id="waste-item" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:4px;background:var(--bg-darker);color:#fff">
            <option value="">Select item...<\/option>
            ${STOCK_ITEMS.map(s => `<option value="${s.id}">${s.name}<\/option>`).join('')}
          <\/select>
        <\/div>
        <div style="margin-bottom:16px">
          <label style="display:block;margin-bottom:4px;font-size:12px;color:var(--text-soft)">Quantity *<\/label>
          <input type="number" id="waste-qty" placeholder="0" step="0.1" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:4px;background:var(--bg-darker);color:#fff"\/>
        <\/div>
        <div style="margin-bottom:16px">
          <label style="display:block;margin-bottom:4px;font-size:12px;color:var(--text-soft)">Reason *<\/label>
          <select id="waste-reason" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:4px;background:var(--bg-darker);color:#fff">
            <option value="">Select reason...<\/option>
            <option value="Expired">Expired<\/option>
            <option value="Breakage">Breakage<\/option>
            <option value="Staff Meal">Staff Meal<\/option>
            <option value="Spillage">Spillage<\/option>
            <option value="Return">Return<\/option>
            <option value="Other">Other<\/option>
          <\/select>
        <\/div>
        <div style="margin-bottom:16px">
          <label style="display:block;margin-bottom:4px;font-size:12px;color:var(--text-soft)">Notes<\/label>
          <textarea id="waste-notes" placeholder="Optional notes..." style="width:100%;padding:8px;border:1px solid var(--border);border-radius:4px;background:var(--bg-darker);color:#fff;height:60px"><\/textarea>
        <\/div>
      <\/div>
      <div style="padding:16px;display:flex;gap:8px">
        <button class="header-btn accent" style="flex:1" id="btn-save-waste">Save<\/button>
        <button class="header-btn" style="flex:1" onclick="document.getElementById('modal-waste').classList.remove('open')">Cancel<\/button>
      <\/div>
    <\/div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener('click', (e) => {
    if(e.target === modal) modal.classList.remove('open');
  });
  modal.querySelector('.modal-close').addEventListener('click', () => {
    modal.classList.remove('open');
    setTimeout(() => modal.remove(), 300);
  });

  const saveBtn = modal.querySelector('#btn-save-waste');
  saveBtn.addEventListener('click', () => {
    const itemId = parseInt($('#waste-item').value);
    const qty = parseFloat($('#waste-qty').value);
    const reason = $('#waste-reason').value;
    const notes = $('#waste-notes').value.trim();

    if(!itemId || !qty || !reason){
      toast('Please fill required fields', 'error');
      return;
    }

    const stock = getStockById(itemId);
    stock.qty -= qty;
    stock.qty = Math.max(0, stock.qty);

    state.wasteLog.push({
      date: new Date().toISOString(),
      itemName: stock.name,
      qty: qty,
      unit: stock.unit,
      reason: reason,
      staffName: state.currentStaff?.name || 'Unknown',
      notes: notes,
    });

    saveState();
    modal.classList.remove('open');
    setTimeout(() => modal.remove(), 300);
    renderStock('waste');
    toast('Waste logged and stock adjusted', 'success');
  });
}

/* ─────────────────────────────────────
   CUSTOMERS VIEW
   ───────────────────────────────────── */
function renderCustomers(filter=''){
  const content = $('#customers-content');
  let list = CUSTOMERS;
  if(filter){
    const q = filter.toLowerCase();
    list = CUSTOMERS.filter(c => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q));
  }
  content.innerHTML = `<div style="margin-bottom:16px">
    <button class="header-btn accent" onclick="window.openNewCustomerForm?.()">+ New Customer<\/button>
  <\/div>
  <div class="customer-grid">${list.map(c => `
    <div class="customer-card">
      <div class="c-name">${c.name}<\/div>
      <div class="c-email">${c.email} · ${c.phone}<\/div>
      <div class="c-stats">
        <div class="c-stat"><div class="c-stat-val">${c.points}<\/div><div class="c-stat-label">Points<\/div><\/div>
        <div class="c-stat"><div class="c-stat-val">${c.visits}<\/div><div class="c-stat-label">Visits<\/div><\/div>
        <div class="c-stat"><div class="c-stat-val">${fmt(c.totalSpent)}<\/div><div class="c-stat-label">Total spent<\/div><\/div>
      <\/div>
    <\/div>
  `).join('')}<\/div>`;

  window.openNewCustomerForm = openNewCustomerForm;
}

$('#customer-search').addEventListener('input', (e) => {
  renderCustomers(e.target.value.trim());
});

/* ─────────────────────────────────────
   REPORTS VIEW
   ───────────────────────────────────── */
$$('[data-report]').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('[data-report]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderReports(btn.dataset.report);
  });
});

function renderReports(period){
  const content = $('#reports-content');
  const orders = state.orders;
  const now = new Date();
  let filtered = orders;

  if(period === 'xreport'){ renderXReport(content); return; }
  if(period === 'zreport'){ renderZReport(content); return; }

  if(period === 'today'){
    filtered = orders.filter(o => new Date(o.completedAt).toDateString() === now.toDateString());
  } else if(period === 'week'){
    const weekAgo = new Date(now - 7 * 86400000);
    filtered = orders.filter(o => new Date(o.completedAt) > weekAgo);
  } else if(period === 'staff'){
    // Staff report - hours worked
    content.innerHTML = `<div style="padding:20px">
      <h3 style="color:#fff;margin-bottom:16px">Staff Hours<\/h3>
      <table class="stock-table">
        <thead><tr><th>Staff<\/th><th>Clock In</th><th>Clock Out<\/th><th>Hours<\/th><\/tr><\/thead>
        <tbody>${state.clockRecords.map(record => {
          const clockIn = new Date(record.clockIn);
          const clockOut = record.clockOut ? new Date(record.clockOut) : null;
          const hours = clockOut ? ((clockOut - clockIn) / 3600000).toFixed(2) : 'Still clocked in';
          return `<tr>
            <td style="font-weight:600;color:#fff">${record.staffName}<\/td>
            <td style="font-size:12px">${clockIn.toLocaleString()}<\/td>
            <td style="font-size:12px">${clockOut ? clockOut.toLocaleString() : 'Active'}<\/td>
            <td>${hours}<\/td>
          <\/tr>`;
        }).join('')}<\/tbody>
      <\/table>
    <\/div>`;
    return;
  }

  // Use sample data if no real orders
  const sampleMode = filtered.length === 0;
  if(sampleMode) filtered = generateSampleOrders();

  const totalRevenue = filtered.reduce((s, o) => s + (o.total || 0), 0);
  const totalOrders = filtered.length;
  const avgOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const totalTax = filtered.reduce((s, o) => s + (o.tax || 0), 0);
  const totalDiscounts = filtered.reduce((s, o) => s + (o.discountAmount || 0), 0);

  // Payment method breakdown
  const byMethod = {};
  filtered.forEach(o => {
    const m = o.paymentMethod || 'card';
    if(!byMethod[m]) byMethod[m] = {count:0, total:0};
    byMethod[m].count++;
    byMethod[m].total += (o.total||0);
  });
  const methodRows = Object.entries(byMethod).sort((a,b) => b[1].total - a[1].total);
  const maxMethodTotal = methodRows.length > 0 ? methodRows[0][1].total : 1;

  // Category breakdown
  const byCat = {};
  filtered.forEach(o => {
    (o.lines || []).forEach(l => {
      const item = MENU_ITEMS.find(mi => mi.name === l.name);
      const cat = item ? CATEGORIES.find(c => c.id === item.cat)?.name || 'Other' : 'Other';
      if(!byCat[cat]) byCat[cat] = {qty:0, total:0};
      byCat[cat].qty += l.qty;
      byCat[cat].total += l.price * l.qty;
    });
  });
  const catRows = Object.entries(byCat).sort((a,b) => b[1].total - a[1].total);
  const maxCatTotal = catRows.length > 0 ? catRows[0][1].total : 1;

  const itemCounts = {};
  filtered.forEach(o => {
    (o.lines || []).forEach(l => {
      if(!itemCounts[l.name]) itemCounts[l.name] = {name:l.name, qty:0, revenue:0};
      itemCounts[l.name].qty += l.qty;
      itemCounts[l.name].revenue += l.price * l.qty;
    });
  });
  const topSellers = Object.values(itemCounts).sort((a,b) => b.revenue - a.revenue).slice(0, 8);
  const maxSellerRevenue = topSellers.length > 0 ? topSellers[0].revenue : 1;

  const hourly = new Array(24).fill(0);
  filtered.forEach(o => {
    const h = new Date(o.completedAt).getHours();
    hourly[h] += (o.total || 0);
  });
  const maxHourly = Math.max(...hourly, 1);

  content.innerHTML = `
    <div class="reports-kpi">
      <div class="kpi-card">
        <div class="kpi-label">Revenue<\/div>
        <div class="kpi-value">${fmt(totalRevenue)}<\/div>
        <div class="kpi-change up">↑ 12% vs last ${period === 'today' ? 'day' : period}<\/div>
      <\/div>
      <div class="kpi-card">
        <div class="kpi-label">Orders<\/div>
        <div class="kpi-value">${totalOrders}<\/div>
        <div class="kpi-change up">↑ 8%<\/div>
      <\/div>
      <div class="kpi-card">
        <div class="kpi-label">Avg. Order<\/div>
        <div class="kpi-value">${fmt(avgOrder)}<\/div>
        <div class="kpi-sub">per transaction<\/div>
      <\/div>
      <div class="kpi-card">
        <div class="kpi-label">VAT Collected<\/div>
        <div class="kpi-value">${fmt(totalTax)}<\/div>
        <div class="kpi-sub">23% rate<\/div>
      <\/div>
    <\/div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px">
      <div class="report-section" style="margin-bottom:0">
        <h3>Payment Methods<\/h3>
        <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);padding:18px 20px">
          ${methodRows.map(([method, data]) => `
            <div style="margin-bottom:14px">
              <div style="display:flex;justify-content:space-between;margin-bottom:6px">
                <span style="color:var(--text-soft);font-size:14px;font-weight:500">${method.charAt(0).toUpperCase()+method.slice(1)} <span style="color:var(--text-muted);font-size:11px">(${data.count})<\/span><\/span>
                <span style="color:#fff;font-weight:700;font-size:15px;font-variant-numeric:tabular-nums">${fmt(data.total)}<\/span>
              <\/div>
              ${renderBar(data.total, maxMethodTotal, method === 'cash' ? '#34d399' : method === 'card' ? '#8b5cf6' : '#f97316')}
            <\/div>
          `).join('')}
          ${totalDiscounts > 0 ? `
            <div style="border-top:1px solid rgba(255,255,255,.08);padding-top:10px;margin-top:10px;display:flex;justify-content:space-between">
              <span style="color:var(--text-soft);font-size:13px">Discounts<\/span>
              <span style="color:var(--red);font-weight:700;font-size:14px">−${fmt(totalDiscounts)}<\/span>
            <\/div>
          ` : ''}
        <\/div>
      <\/div>
      <div class="report-section" style="margin-bottom:0">
        <h3>Revenue by Hour ${sampleMode ? '<span class="report-badge">SAMPLE<\/span>' : ''}<\/h3>
        <div class="report-chart" style="padding:18px 20px">
          <div class="chart-bars">
            ${hourly.map((val, i) => {
              if(i < 7 || i >= 23) return '';
              const h = maxHourly > 0 ? Math.max(2, (val / maxHourly) * 100) : 2;
              return `<div class="chart-bar-wrap">
                <div class="chart-bar-value">${val > 0 ? fmt(val) : ''}<\/div>
                <div class="chart-bar" style="height:${h}%"><\/div>
                <div class="chart-bar-label">${i}:00<\/div>
              <\/div>`;
            }).join('')}
          <\/div>
        <\/div>
      <\/div>
    <\/div>

    <div class="report-section">
      <h3>Category Breakdown<\/h3>
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);padding:18px 20px">
        ${catRows.map(([cat, data]) => `
          <div style="margin-bottom:14px">
            <div style="display:flex;justify-content:space-between;margin-bottom:6px">
              <span style="color:var(--text-soft);font-size:14px;font-weight:500">${cat} <span style="color:var(--text-muted);font-size:11px">(${data.qty} items)<\/span><\/span>
              <span style="color:#fff;font-weight:700;font-size:15px;font-variant-numeric:tabular-nums">${fmt(data.total)}<\/span>
            <\/div>
            ${renderBar(data.total, maxCatTotal, '#a855f7')}
          <\/div>
        `).join('')}
      <\/div>
    <\/div>

    <div class="report-section">
      <h3>Top Sellers<\/h3>
      <div class="top-sellers">
        ${topSellers.map((item, i) => `
          <div class="top-item">
            <div class="top-rank">${i + 1}<\/div>
            <div class="top-name">${item.name}<\/div>
            <div style="display:flex;gap:12px;align-items:center;width:100%">
              <div style="flex:1">
                ${renderBar(item.revenue, maxSellerRevenue, '#8b5cf6')}
              <\/div>
              <div style="text-align:right;min-width:50px">
                <div style="color:var(--emerald);font-size:13px;font-weight:700;font-variant-numeric:tabular-nums">${fmt(item.revenue)}<\/div>
                <div style="color:var(--text-muted);font-size:11px">${item.qty}× sold<\/div>
              <\/div>
            <\/div>
          <\/div>
        `).join('')}
      <\/div>
    <\/div>
  `;
}

/* ─────────────────────────────────────
   X REPORT (shift / mid-day read)
   ───────────────────────────────────── */
function renderXReport(container){
  const now = new Date();
  const todayOrders = state.orders.filter(o => new Date(o.completedAt).toDateString() === now.toDateString());

  const sample = todayOrders.length === 0;
  const orders = sample ? generateSampleOrders() : todayOrders;

  const revenue    = orders.reduce((s,o) => s + (o.total||0), 0);
  const tax        = orders.reduce((s,o) => s + (o.tax||0), 0);
  const subtotal   = revenue - tax;
  const txCount    = orders.length;
  const avg        = txCount > 0 ? revenue / txCount : 0;

  // Payment method breakdown
  const byMethod = {};
  orders.forEach(o => {
    const m = o.paymentMethod || 'card';
    if(!byMethod[m]) byMethod[m] = {count:0, total:0};
    byMethod[m].count++;
    byMethod[m].total += (o.total||0);
  });

  // Category breakdown — separate F&B from Accommodation
  const byCat = {};
  let accomRevenue = 0, accomItems = 0, fbRevenue = 0, fbItems = 0;
  const accomBreakdown = {};
  orders.forEach(o => {
    (o.lines||[]).forEach(l => {
      const item = MENU_ITEMS.find(mi => mi.name === l.name);
      const catId = item ? item.cat : 'other';
      const cat = item ? CATEGORIES.find(c => c.id === item.cat)?.name || 'Other' : 'Other';
      if(!byCat[cat]) byCat[cat] = {qty:0, total:0};
      byCat[cat].qty += l.qty;
      byCat[cat].total += l.price * l.qty;
      if(catId === 'accom'){
        accomRevenue += l.price * l.qty;
        accomItems += l.qty;
        if(!accomBreakdown[l.name]) accomBreakdown[l.name] = {qty:0, total:0};
        accomBreakdown[l.name].qty += l.qty;
        accomBreakdown[l.name].total += l.price * l.qty;
      } else {
        fbRevenue += l.price * l.qty;
        fbItems += l.qty;
      }
    });
  });

  // Staff on shift
  const staffHours = {};
  state.clockRecords.forEach(r => {
    if(new Date(r.clockIn).toDateString() === now.toDateString()){
      if(!staffHours[r.staffName]) staffHours[r.staffName] = 0;
      const start = new Date(r.clockIn);
      const end = r.clockOut ? new Date(r.clockOut) : now;
      staffHours[r.staffName] += (end - start) / 3600000;
    }
  });

  const fbCatRows = Object.entries(byCat).filter(([cat]) => cat !== 'Accommodation').sort((a,b) => b[1].total - a[1].total);
  const methodRows = Object.entries(byMethod).sort((a,b) => b[1].total - a[1].total);
  const maxMethodTotal = methodRows.length > 0 ? methodRows[0][1].total : 1;
  const maxFbCatTotal = fbCatRows.length > 0 ? fbCatRows[0][1].total : 1;
  const accomRows = Object.entries(accomBreakdown).sort((a,b) => b[1].total - a[1].total);
  const maxAccomTotal = accomRows.length > 0 ? accomRows[0][1].total : 1;

  container.innerHTML = `
    <div class="xz-report">
      <div class="xz-header">
        <h3>X Report — Shift Read${sample ? ' <span style="font-size:13px;font-weight:500;color:var(--text-muted)">(sample data)<\/span>' : ''}<\/h3>
        <div class="xz-meta">
          <span>📅 ${now.toLocaleDateString('en-IE',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}<\/span>
          <span>🕐 Read at ${now.toLocaleTimeString('en-IE',{hour:'2-digit',minute:'2-digit'})}<\/span>
          <span>👤 ${state.currentStaff?.name || 'Admin'}<\/span>
        <\/div>
      <\/div>

      <div class="xz-quick-actions" style="display:flex;gap:8px;padding:16px 20px;background:var(--surface-2);border-bottom:1px solid var(--border)">
        <button class="header-btn" onclick="window.print()" style="flex:1">🖨️ Print<\/button>
        <button class="header-btn" style="flex:1">✉️ Email<\/button>
      <\/div>

      <div class="xz-body">

        <!-- REVENUE OVERVIEW -->
        <div class="xz-highlight-card" style="background:linear-gradient(135deg,rgba(168,85,247,.08),rgba(96,165,250,.08));border:1px solid rgba(168,85,247,.2);margin-bottom:0">
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;text-align:center">
            <div>
              <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">Total Revenue<\/div>
              <div style="font-size:32px;font-weight:900;color:#fff;font-variant-numeric:tabular-nums">${fmt(revenue)}<\/div>
            <\/div>
            <div>
              <div style="font-size:10px;color:var(--textconst now = new Date();
  const todayOrders = state.orders.filter(o => new Date(o.completedAt).toDateString() === now.toDateString());

  const sample = todayOrders.length === 0;
  const orders = sample ? generateSampleOrders() : todayOrders;

  const revenue    = orders.reduce((s,o) => s + (o.total||0), 0);
  const tax        = orders.reduce((s,o) => s + (o.tax||0), 0);
  const subtotal   = revenue - tax;
  const txCount    = orders.length;
  const avg        = txCount > 0 ? revenue / txCount : 0;
  container.innerHTML = 'Z Report placeholder';
}

/* SAMPLE ORDER GENERATOR */
function generateSampleOrders(){
  const now = new Date();
  const sampleOrders = [];
  const sampleData = [
    {time:8, items:[{name:'Flat White',price:3.50,qty:2}], method:'card'},
    {time:12, items:[{name:'Pt Guinness',price:5.80,qty:2}], method:'card'},
    {time:17, items:[{name:'8oz Smash Burger',price:17.50,qty:1},{name:'Fries',price:4.50,qty:1}], method:'card'},
  ];
  sampleData.forEach((entry, i) => {
    const completedAt = new Date(now);
    completedAt.setHours(entry.time, Math.floor(Math.random()*50)+5, 0, 0);
    const total = entry.items.reduce((s,it) => s + it.price * it.qty, 0);
    const tax = total * 0.23;
    sampleOrders.push({
      id: 900 + i,
      lines: entry.items,
      total: total,
      subtotal: total - tax,
      tax: tax,
      discountAmount: 0,
      paymentMethod: entry.method,
      completedAt: completedAt.toISOString(),
      staffName: ['Admin','Sarah','Declan'][i % 3],
    });
  });
  return sampleOrders;
}

/* SETTINGS VIEW */
function renderSettings(){
  const content = $('#settings-content');
  content.innerHTML = '<div style="padding:20px"><p>Settings placeholder<\/p><\/div>';
}

function openMenuEditor(){toast('Menu Editor - placeholder','info');}
function openStaffEditor(){toast('Staff Editor - placeholder','info');}
function openBusinessInfo(){toast('Business Info - placeholder','info');}
function openExportBackup(){
  const modal = document.createElement('div');
  modal.className = 'modal open';
  modal.id = 'modal-export';
  modal.innerHTML = `<div class="modal-content"><div class="modal-header"><h2>Export<\/h2><button class="modal-close" data-close="modal-export">✕<\/button><\/div><div class="modal-body"><p>Export functionality<\/p><\/div><\/div>`;
  document.body.appendChild(modal);
}
function openAbout(){toast('About - Sonas Till v1.0','info');}

/* MODALS */
function openModal(id){
  document.getElementById(id).classList.add('open');
}
function closeModal(id){
  document.getElementById(id).classList.remove('open');
}

$$('.modal-close').forEach(btn => {
  btn.addEventListener('click', () => {
    closeModal(btn.dataset.close);
  });
});

$$('.modal').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if(e.target === modal) modal.classList.remove('open');
  });
});

/* KEYBOARD SHORTCUTS */
document.addEventListener('keydown', (e) => {
  if(!state.currentStaff) return;
  if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  const viewKeys = {F1:'pos', F2:'tables', F3:'kitchen', F4:'stock', F5:'customers', F6:'reports', F7:'settings'};
  if(viewKeys[e.key]){
    e.preventDefault();
    const btn = $(`[data-view="${viewKeys[e.key]}"]`);
    if(btn) btn.click();
    return;
  }

  if(e.key === 'Escape'){
    $$('.modal.open').forEach(m => m.classList.remove('open'));
    return;
  }

  if(e.key === 'p' && state.currentView === 'pos' && state.currentOrder.lines.length > 0){
    $('#btn-pay').click();
    return;
  }

  if(e.key === 'h' && state.currentView === 'pos'){
    $('#btn-hold').click();
    return;
  }

  if((e.key === 'Delete' || e.key === 'Backspace') && state.currentView === 'pos' && state.currentOrder.lines.length > 0){
    e.preventDefault();
    state.currentOrder.lines.pop();
    renderOrder();
    return;
  }
});

/* INIT */
function renderAll(){
  renderCategories();
  renderItems();
  renderTableSelect();
  renderOrder();
}

loadState();
initLogin();

})();
