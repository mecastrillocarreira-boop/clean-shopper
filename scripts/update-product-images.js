import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const updates = [
  { id: 3,  name: 'Pure Daily Facial Cleanser',              image_url: 'https://honest.com/cdn/shop/files/B01S1300V3FLS_SSCCreamClnsr_4oz_XX_PDP_XX_0021_FrontHDC_1x1_73f27b76-b03b-4653-8915-e77e0e2d4d19.jpg?v=1775161448&width=1646' },
  { id: 4,  name: 'Sensitive Skin Mineral Sunscreen SPF 30', image_url: 'https://www.alternatievemiddelen.nl/wp-content/uploads/2024/02/Badger-zonnebrand-nieuw.jpg' },
  { id: 5,  name: 'Hydrating Body Lotion',                   image_url: 'https://m.media-amazon.com/images/I/51+CxH23onL._AC_SX679_.jpg' },
  { id: 6,  name: 'Charcoal Whitening Toothpaste',           image_url: 'https://m.media-amazon.com/images/I/41tbdClUeSL._SY300_SX300_QL70_FMwebp_.jpg' },
  { id: 7,  name: 'Natural Deodorant Lavender',              image_url: 'https://m.media-amazon.com/images/I/71M7OUHnfsL._SX679_.jpg' },
  { id: 8,  name: 'Fragrance-Free Shampoo Bar',              image_url: 'https://m.media-amazon.com/images/I/61gCgx2Y--L._SX679_.jpg' },
  { id: 9,  name: 'Multi-Surface Everyday Cleaner',          image_url: 'https://m.media-amazon.com/images/I/614ENtEQvOL._AC_SX679_.jpg' },
  { id: 10, name: 'Laundry Detergent Sheets',                image_url: 'https://m.media-amazon.com/images/I/61t-HJW6WNL._AC_SY300_SX300_QL70_FMwebp_.jpg' },
  { id: 11, name: 'Oxygen Brightener Powder',                image_url: 'https://m.media-amazon.com/images/I/61cb7p6CeGL._AC_SY300_SX300_QL70_FMwebp_.jpg' },
  { id: 12, name: 'Glass & Mirror Cleaner',                  image_url: 'https://m.media-amazon.com/images/I/71SOB4oFvxL._AC_SY300_SX300_QL70_FMwebp_.jpg' },
  { id: 13, name: 'Toilet Bowl Cleaner Mint',                image_url: 'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/sev/sev45166/v/8.jpg' },
  { id: 14, name: 'Dish Soap Fragrance Free',                image_url: 'https://m.media-amazon.com/images/I/71uHTaQ9W3L._SX679_.jpg' },
  { id: 15, name: 'Baby Wash & Shampoo',                     image_url: 'https://m.media-amazon.com/images/I/71-kp9vexQL._AC_SY300_SX300_QL70_ML2_.jpg' },
  { id: 16, name: 'Organic Baby Diaper Cream',               image_url: 'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ema/ema00031/v/51.jpg' },
  { id: 17, name: 'Fragrance-Free Baby Lotion',              image_url: 'https://m.media-amazon.com/images/I/61X8bazqmWL._SX679_.jpg' },
  { id: 18, name: 'Baby Laundry Detergent',                  image_url: 'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/def/def08624/v/8.jpg' },
  { id: 19, name: 'Reusable Beeswax Food Wrap',              image_url: 'https://m.media-amazon.com/images/I/71g8oLa0+OL._AC_SY300_SX300_QL70_FMwebp_.jpg' },
  { id: 20, name: 'Cast Iron Skillet Seasoning Oil',         image_url: 'https://m.media-amazon.com/images/I/41K0WNeYjRL._AC_SX679_.jpg' },
  { id: 21, name: 'Stainless Steel Water Bottle 24oz',       image_url: 'https://m.media-amazon.com/images/I/61EXQF2QVaL._AC_SY300_SX300_QL70_ML2_.jpg' },
  { id: 22, name: 'Bamboo Dish Scrub Brush',                 image_url: 'https://m.media-amazon.com/images/I/71g1b+5Wt4L._AC_SY879_.jpg' },
]

const toUpdate = updates.filter(p => p.image_url !== '')

if (toUpdate.length === 0) {
  console.log('No URLs filled in yet — add image_url values and re-run.')
  process.exit(0)
}

for (const { id, name, image_url } of toUpdate) {
  const { error } = await supabase.from('products').update({ image_url }).eq('id', id)
  if (error) console.error(`✗ id ${id} (${name}):`, error.message)
  else console.log(`✓ id ${id} (${name})`)
}
