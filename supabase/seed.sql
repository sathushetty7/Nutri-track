-- ==============================================================================
-- NUTRITRACK - RECIPES SEED SCRIPT
-- ==============================================================================

insert into public.recipes (
  id, name, description, image_url, prep_time_minutes, cook_time_minutes,
  difficulty, servings, calories_per_serving, protein_per_serving, carbs_per_serving,
  fat_per_serving, dietary_tags, allergens, instructions, cuisine
) values
(
  'palak-paneer-delight',
  'Iron-Rich Palak Paneer',
  'Tender paneer cubes simmered in a mildly spiced, vibrant spinach gravy loaded with calcium and plant antioxidants.',
  'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
  15, 20, 'Medium', 3, 285, 16.5, 11.0, 19.5,
  array['vegetarian', 'gluten-free', 'high protein'],
  array['dairy'],
  array[
    'Blanch spinach leaves in boiling water for 2 minutes, then immediately transfer to ice water to preserve bright green color.',
    'Puree the blanched spinach with ginger, garlic, and green chili until smooth.',
    'Heat olive oil in a pan; temper with cumin seeds and sauté finely chopped onions until golden translucent.',
    'Add pureed tomatoes, turmeric, and coriander powder; cook until oil begins to separate.',
    'Pour in the spinach puree and simmer gently on low heat for 5-7 minutes.',
    'Gently fold in fresh paneer cubes and garam masala. Simmer for 2 more minutes and serve warm with rotis or brown rice.'
  ],
  'Indian'
),
(
  'moong-dal-khichdi',
  'Comforting Moong Dal Khichdi',
  'A nourishing one-pot classic made with yellow split moong lentils, fragrant rice, and a gentle cumin-ghee tadka.',
  'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
  10, 20, 'Easy', 2, 260, 12.0, 44.0, 4.8,
  array['vegetarian', 'gluten-free', 'balanced'],
  array['dairy'],
  array[
    'Wash rice and moong dal together thoroughly until water runs clear; soak for 15 minutes.',
    'In a pressure cooker or heavy-bottomed pot, warm ghee and add cumin seeds until they splutter.',
    'Add grated ginger, a pinch of asafoetida (hing), and turmeric powder.',
    'Add the drained rice and dal, lightly roasting for 1 minute.',
    'Add 3.5 cups of water and salt. Pressure cook for 3-4 whistles (or simmer covered for 22 minutes).',
    'Stir gently to reach a comforting porridge-like texture. Top with a pinch of fresh black pepper and serve with curd.'
  ],
  'Indian'
),
(
  'protein-packed-egg-bhurji',
  'Spiced Street-Style Egg Bhurji',
  'Scrambled eggs tossed with caramelized onions, tangy tomatoes, bell peppers, and fresh cilantro for high-protein energy.',
  'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
  8, 10, 'Easy', 2, 220, 17.5, 6.0, 14.0,
  array['eggetarian', 'high protein', 'low carb', 'gluten-free'],
  array['eggs'],
  array[
    'Whisk eggs in a bowl with a pinch of salt and turmeric until aerated.',
    'Heat olive oil in a skillet. Sauté chopped onions and green chili until soft and sweet.',
    'Add diced tomatoes and bell peppers; sauté for 3 minutes until tomatoes soften slightly without turning mushy.',
    'Lower the heat and pour in the whisked eggs.',
    'Scramble gently from the edges inwards on medium-low flame until soft curds form.',
    'Garnish with chopped fresh cilantro and serve with whole wheat toast or roti.'
  ],
  'Indian'
),
(
  'hearty-chana-masala',
  'Homestyle Amritsari Chana Masala',
  'Protein-packed tender chickpeas cooked in a fragrant onion, tomato, roasted cumin, and pomegranate-amchur sauce.',
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',
  15, 25, 'Medium', 4, 255, 13.5, 38.0, 6.5,
  array['vegan', 'vegetarian', 'high protein', 'gluten-free'],
  array[]::text[],
  array[
    'Boil soaked chickpeas with a tea bag, bay leaf, and cinnamon stick until fork tender.',
    'Heat mustard oil in a heavy kadai until smoking point, then let cool slightly; add cumin seeds.',
    'Add onions and cook patiently until deep golden brown.',
    'Add crushed garlic, ginger paste, and chana masala powder. Sauté for 1 minute.',
    'Add tomato puree and simmer until the masala turns thick and glistening.',
    'Add boiled chickpeas along with some cooking liquor. Lightly mash 2 tablespoons of chickpeas to thicken the gravy.',
    'Simmer for 12 minutes. Finish with julienned ginger and lemon juice.'
  ],
  'Indian'
),
(
  'mediterranean-grilled-chicken-bowl',
  'Mediterranean Herb Chicken Bowl',
  'Juicy marinated grilled chicken breast served over fluffy quinoa, crisp cucumbers, cherry tomatoes, and mint-tahini drizzle.',
  'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80',
  15, 15, 'Easy', 2, 390, 38.0, 28.0, 12.5,
  array['high protein', 'gluten-free', 'balanced'],
  array['sesame'],
  array[
    'Marinate chicken strips with olive oil, lemon juice, minced garlic, oregano, salt, and black pepper for 15 minutes.',
    'Rinse quinoa and simmer in 2 cups of water with a pinch of salt for 15 minutes until tender and water is absorbed.',
    'Heat a grill pan on medium-high heat. Grill chicken for 5-6 minutes on each side until charred and cooked through.',
    'Assemble bowl: base of cooked quinoa, layered with grilled chicken slices, diced cucumbers, and sweet cherry tomatoes.',
    'Drizzle with lemon-herb olive oil dressing and fresh parsley.'
  ],
  'Mediterranean'
)
on conflict (id) do nothing;
