#!/bin/bash

products=(
  "Honest Beauty Pure Daily Facial Cleanser"
  "Badger Sensitive Skin Mineral Sunscreen SPF 30"
  "Everyone Hydrating Body Lotion"
  "Hello Charcoal Whitening Toothpaste"
  "Schmidt's Natural Deodorant Lavender"
  "Ethique Fragrance-Free Shampoo Bar"
  "Branch Basics Multi-Surface Everyday Cleaner"
  "Tru Earth Laundry Detergent Sheets"
  "Molly's Suds Oxygen Brightener Powder"
  "ECOS Glass Mirror Cleaner"
  "Seventh Generation Toilet Bowl Cleaner Mint"
  "Dr. Bronner's Dish Soap Fragrance Free"
  "Burt's Bees Baby Wash Shampoo"
  "Earth Mama Organic Baby Diaper Cream"
  "Cetaphil Baby Fragrance-Free Lotion"
  "Dreft Stage 1 Baby Laundry Detergent"
  "Bee's Wrap Reusable Beeswax Food Wrap"
  "Caron Doucet Cast Iron Skillet Seasoning Oil"
  "Klean Kanteen Stainless Steel Water Bottle 24oz"
  "Full Circle Bamboo Dish Scrub Brush"
)

for product in "${products[@]}"; do
  query=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$product'))")
  open "https://www.amazon.com/s?k=${query}"
  sleep 0.5
done
