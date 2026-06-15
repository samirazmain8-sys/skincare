import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'boj-sun-rice',
    sku: 'BOJ-SUN-001',
    name: 'Relief Sun : Rice + Probiotics SPF50+',
    brand: 'Beauty of Joseon',
    category: 'Skin Care',
    subCategory: 'Sunscreen',
    price: 1850,
    salePrice: 1450,
    image: 'https://images.unsplash.com/photo-1556229174-5e42a09e45af?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1556229174-5e42a09e45af?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80'
    ],
    stockStatus: 'In Stock',
    rating: 4.5,
    reviewsCount: 142,
    shortDescription: 'Relief Sun is a lightweight and creamy organic sunscreen that is comfortable on skin. Even if you apply a large amount multiple times, it is not sticky and gives a moist finish like that of a light moisturizing cream.',
    description: 'Relief Sun is a lightweight and creamy organic sunscreen that is comfortable on skin. Even if you apply a large amount multiple times, it is not sticky and gives a moist finish like that of a light moisturizing cream. Containing 30% rice extract and grain fermented extracts, it provides moisture and nourishment to the skin. It is rich in vitamins B, C, E, amino acids, and minerals which help to moisturize dry skin and comfortably calm the skin.',
    howToUse: 'At the last step of skin care routine, evenly spread a generous amount over areas vulnerable to sun exposure.',
    ingredients: 'Water, Oryza Sativa (Rice) Extract (30%), Dibutyl Adipate, Propanediol, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Polymethylsilsesquioxane, Ethylhexyl Triazone, Niacinamide, Methylene Bis-Benzotriazolyl Tetramethylbutylphenol, Coco-Caprylate/Caprate, Caprylyl Methicone, Diethylhexyl Butamido Triazone, Glycerin, Butylene Glycol.',
    tags: ['Sunscreen', 'Rice Extract', 'Beauty of Joseon', 'Hydrating', 'All Skin Types'],
    isBestseller: true
  },
  {
    id: 'cosrx-snail-cream',
    sku: 'COSRX-SNAIL-002',
    name: 'Advanced Snail 92 All in One Cream',
    brand: 'COSRX',
    category: 'Skin Care',
    subCategory: 'Cream/Moisturizer',
    price: 1950,
    salePrice: 1550,
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1617897903246-719242758050?w=600&auto=format&fit=crop&q=80'
    ],
    stockStatus: 'In Stock',
    rating: 4.5,
    reviewsCount: 98,
    shortDescription: 'An all-in-one cream that supports natural regeneration of damaged skin with 92% snail secretion filtrate. This deeply moisturizing cream plumps and calms irritated skin.',
    description: 'Formulated with 92% Snail Secretion Filtrate (Mucin), this cream helps naturally create the appealing glow of healthy skin. It is safe for usage on skin as it consists of excellent skin-activation components, preventing skin damage and available directly after washing face, without toner.',
    howToUse: 'Gently apply a proper amount of the cream to face, avoiding the eye and mouth area, after cleansing and prepping.',
    ingredients: 'Snail Secretion Filtrate, Betaine, Caprylic/Capric Triglyceride, Cetearyl Olivate, Sorbitan Olivate, Sodium Hyaluronate, Cetearyl Alcohol, Stearic Acid, Arginine, Dimethicone, Carbomer, Panthenol, Allantoin, Sodium Polyacrylate, Xanthan Gum.',
    tags: ['Cream', 'Moisturizer', 'COSRX', 'Snail Mucin', 'Fungal Acne Safe'],
    isBestseller: true
  },
  {
    id: 'cosrx-snail-mucin',
    sku: 'COSRX-SNAIL-001',
    name: 'Advanced Snail 96 Mucin Power Essence',
    brand: 'COSRX',
    category: 'Skin Care',
    subCategory: 'Essence',
    price: 2150,
    salePrice: 1650,
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608248597481-496100c80836?w=600&auto=format&fit=crop&q=80'
    ],
    stockStatus: 'In Stock',
    rating: 4.33,
    reviewsCount: 165,
    shortDescription: 'Lightweight essence which absorbs into the skin fast to give skin a natural glow from the inside. Formulated with 96.3% Snail Secretion Filtrate.',
    description: 'This high-concentration essence protects the skin from moisture loss while keeping the skin texture smooth and healthy. Made with lightweight snail mucin, it sinks immediately into the skin to deliver long-lasting hydration, fade dark spots, and enhance natural skin elasticity.',
    howToUse: 'After cleansing and toning, apply a small amount on your entire face. Gently pat using fingertips to aid absorption, then go ahead with your moisturizers.',
    ingredients: 'Snail Secretion Filtrate, Betaine, Butylene Glycol, 1,2-Hexanediol, Sodium Polyacrylate, Phenoxyethanol, Sodium Hyaluronate, Allantoin, Ethyl Hexanediol, Carbomer, Panthenol, Arginine.',
    tags: ['Essence', 'Snail Mucin', 'COSRX', 'Glowing Skin', 'Soothed Skin'],
    isBestseller: true
  },
  {
    id: 'cosrx-salicylic',
    sku: 'COSRX-CLEAN-003',
    name: 'Salicylic Acid Daily Gentle Cleanser',
    brand: 'COSRX',
    category: 'Skin Care',
    subCategory: 'Soap',
    price: 1300,
    salePrice: 950,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80'
    ],
    stockStatus: 'In Stock',
    rating: 5.0,
    reviewsCount: 75,
    shortDescription: 'A foaming cleanser for acne-prone skin, formulated with botanical ingredients and salicylic acid to gently remove impurities and excess sebum.',
    description: 'This daily gentle cleanser helps to reduce breakouts and promotes clear skin. Ideal for all skin types including sensitive, it gently removes impurities and excess sebum while fighting pimples and blemishes, leaving skin soft and smooth without the stripping feeling.',
    howToUse: 'Dispense a moderate amount into your hand. Add water and lather. Massage onto face and neck, avoiding eye area. Rinse with lukewarm water.',
    ingredients: 'Water, Glycerin, Myristic Acid, Stearic Acid, Potassium Hydroxide, Lauric Acid, Butylene Glycol, Glycol Distearate, Polysorbate 80, Sodium Methyl Cocoyl Taurate, Salicylic Acid, Cocamidopropyl Betaine, PEG-60 Hydrogenated Castor Oil, Citrus Limon (Lemon) Peel Oil.',
    tags: ['Cleanser', 'Salicylic Acid', 'COSRX', 'Acne-prone', 'Oil Control'],
    isBestseller: true
  },
  {
    id: 'isntree-sun-gel',
    sku: 'ISNTREE-SUN-001',
    name: 'Hyaluronic Acid Watery Sun Gel SPF50+',
    brand: 'Isntree',
    category: 'Skin Care',
    subCategory: 'Sunscreen',
    price: 1950,
    salePrice: 1590,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop&q=80'
    ],
    stockStatus: 'In Stock',
    rating: 5.0,
    reviewsCount: 110,
    shortDescription: 'A chemical sunscreen that doubles as a moisturizer, formulated with 8 types of hyaluronic acid to keep skin plumped and hydrated without a white cast.',
    description: 'Isntree Hyaluronic Acid Watery Sun Gel is a moisture-rich chemical sunscreen that provides broad-spectrum block with SPF 50+ PA++++. Formulated with active skin soothing elements like Centella Asiatica, Houttuynia Cordata, and Astaxanthin, it relieves heated skin and strengthens skin barriers.',
    howToUse: 'Apply a suitable amount onto the face and neck on the final skincare stage.',
    ingredients: 'Water, Butylene Glycol, Ethylhexyl Salicylate, Homosalate, Dibutyl Adipate, Niacinamide, Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine, Cyclopentasiloxane, Methylene Bis-Benzotriazolyl Tetramethylbutylphenol, Glycerin, Centella Asiatica Extract.',
    tags: ['Sunscreen', 'Hyaluronic Acid', 'Isntree', 'No White Cast', 'Moisturizing'],
    isBestseller: true
  },
  {
    id: 'isntree-niacinamide',
    sku: 'ISNTREE-SER-002',
    name: 'Hyper Niacinamide 20 Serum',
    brand: 'Isntree',
    category: 'Skin Care',
    subCategory: 'Serum/Ampoule',
    price: 1900,
    salePrice: 1500, // exact 21% off is 1500 on 1900 (21.05%)
    image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1608248597481-496100c80836?w=600&auto=format&fit=crop&q=80'
    ],
    stockStatus: 'In Stock',
    rating: 4.4,
    reviewsCount: 36,
    shortDescription: 'A highly concentrated pore-refining serum formulated with 20% Niacinamide and 4% Zinc PCA to help decrease sebum production and fade post-breakout dark spots.',
    description: 'This clinical-grade acne and dark spot corrector contains 20% Niacinamide and 4% Zinc PCA to target skin congestion, uneven texture, excess sebum, and dark spots. It diminishes the look of dilated pores, giving your skin a uniform, soft, and balanced texture.',
    howToUse: 'Apply 2-3 drops to clean skin after toning. Pat dry and follow with moisturizer. Start 2-3 times/week and build up usage.',
    ingredients: 'Water, Niacinamide (20%), Propanediol, Zinc PCA (4%), 1,2-Hexanediol, Sodium Hyaluronate, Xanthan Gum, Ethylhexylglycerin, Disodium EDTA, Centella Asiatica Extract.',
    tags: ['Serum', 'Niacinamide', 'Isntree', 'Pore Care', 'Dark Spots'],
    isSale: true
  },
  {
    id: 'skin1004-centella',
    sku: 'SK1004-SER-001',
    name: 'Madagascar Centella Ampoule',
    brand: 'SKIN1004',
    category: 'Skin Care',
    subCategory: 'Serum/Ampoule',
    price: 2200,
    salePrice: 1500, // exact 32% off is 1500 on 2200 (31.8%)
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&auto=format&fit=crop&q=80'
    ],
    stockStatus: 'In Stock',
    rating: 4.6,
    reviewsCount: 88,
    shortDescription: 'An all-rounder ampoule containing 100% extract of Madagascar Centella Asiatica to restore the skin barrier, soothe inflammation, and calm raw red spots.',
    description: 'SKIN1004 Madagascar Centella Ampoule is a pure soothing serum featuring 100% extract of Centella Asiatica. It instantly hydrates dry skin, reduces redness, repairs damaged protective barrier, and calms irritated acne blemishes with ultra-light viscosity.',
    howToUse: 'Drop a proper amount using dropper and evenly spread over the entire face. Pat gently.',
    ingredients: 'Centella Asiatica Extract (100%) sourced safely from Madagascar fields.',
    tags: ['Ampoule', 'Centella', 'SKIN1004', 'Soothed Skin', 'Sensitive Safe'],
    isSale: true
  },
  {
    id: 'axisy-dark-spot',
    sku: 'AXISY-SER-001',
    name: 'Dark Spot Correcting Glow Serum',
    brand: 'AXIS-Y',
    category: 'Skin Care',
    subCategory: 'Serum/Ampoule',
    price: 2600,
    salePrice: 1500, // exact 42% off is 1500 on 2600 (42.3%)
    image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1608248597481-496100c80836?w=600&auto=format&fit=crop&q=80'
    ],
    stockStatus: 'In Stock',
    rating: 4.7,
    reviewsCount: 150,
    shortDescription: 'A 5% Niacinamide-based serum that corrects dark spots and improves uneven skin tone. With plant-derived Squalane, it retains moisture to keep skin glowing and healthy.',
    description: 'Formulated with 5% Niacinamide and papaya extract, this dark spot brightening serum fades acne scars, hyperpigmentation, and sun damage. Plant-derived Squalane retains moisture and provides deep hydration for a glowing plump finish.',
    howToUse: 'Apply a small amount to your entire face or specific hyperpigmented areas after toning. Pat dry and seal with cream.',
    ingredients: 'Water, Glycerin, Niacinamide, Sodium Hyaluronate, Propanediol, Erythritol, Butylene Glycol, Squalane, Oryza Sativa (Rice) Bran Extract, Calendula Officinalis Flower Extract, Carica Papaya (Papaya) Fruit Extract.',
    tags: ['Serum', 'Niacinamide', 'AXIS-Y', 'Glow Skin', 'Dark Spot Treatment'],
    isSale: true
  },
  {
    id: 'aplb-glutathione',
    sku: 'APLB-SER-001',
    name: 'Glutathione Niacinamide Ampoule Serum',
    brand: 'APLB',
    category: 'Skin Care',
    subCategory: 'Serum/Ampoule',
    price: 2400,
    salePrice: 1950,
    image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1608248597481-496100c80836?w=600&auto=format&fit=crop&q=80'
    ],
    stockStatus: 'In Stock',
    rating: 4.8,
    reviewsCount: 41,
    shortDescription: 'Glutathione and Niacinamide are blended to deliver dynamic antioxidant protection, clarifying pigment spots and locking in a bright, even complexion.',
    description: 'SKIN CARE BD is the Exclusive Distributor of the Renowned Korean brand "APLB" in Bangladesh. This premium Glutathione Niacinamide Ampoule Serum provides exceptional nourishment and elasticity while reversing signs of environmental damage, uneven tone, and dark spots.',
    howToUse: 'After cleansing facial prep, dispense several drops and glide evenly across facial areas.',
    ingredients: 'Glutathione (1,000ppm), Niacinamide (2%), Centella Asiatica Extract, Beta-Glucan, Adenosine, Hyaluronic Acid, Nelumbo Nucifera Extract.',
    tags: ['Serum', 'APLB', 'Glutathione', 'Niacinamide', 'Brightening'],
    isNewArrival: true
  },
  {
    id: 'aplb-cleanser',
    sku: 'APLB-CLEAN-002',
    name: 'Salicylic Acid BHA Arbutin Cleansing Foam',
    brand: 'APLB',
    category: 'Skin Care',
    subCategory: 'Water Cleanser',
    price: 1500,
    salePrice: 1150,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80'
    ],
    stockStatus: 'In Stock',
    rating: 4.5,
    reviewsCount: 29,
    shortDescription: 'An clarifying foam cleanser combining Salicylic Acid (BHA) and Arbutin to dissolve stubborn sebum from pores while gently correcting tone.',
    description: 'This dual-action formula targets acne flare-ups and pigmented dull spots concurrently. It deeply flushes dead surface cells and sebum plugs out of pores using BHA, while Arbutin begins clearing post-inflammatory marks.',
    howToUse: 'Bubble up a nickel-sized dollop in damp hands. Massage over active dermal areas and rinse thoroughly.',
    ingredients: 'Salicylic Acid, Arbutin, Melaleuca Alternifolia (Tea Tree) Extract, Centella Asiatica Extract, Allantoin, Panthenol.',
    tags: ['Cleanser', 'APLB', 'BHA', 'Arbutin', 'Oil Control']
  },
  {
    id: 'ksecret-collagen',
    sku: 'KSEC-CRE-001',
    name: 'Collagen Boosting Secret Cream',
    brand: 'KSECRET',
    category: 'Skin Care',
    subCategory: 'Cream/Moisturizer',
    price: 2800,
    salePrice: 2250,
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1617897903246-719242758050?w=600&auto=format&fit=crop&q=80'
    ],
    stockStatus: 'In Stock',
    rating: 4.7,
    reviewsCount: 31,
    shortDescription: 'Elasticity-boosting premium cream packed with hydrolyzed collagen and peptides to lift sagging tissues and lock in moisture.',
    description: 'This nourishing cream re-densifies the skin matrix using molecularly optimized hydrolyzed collagen. Over several weeks, it returns bounce and bounce back resilience to moisture-depleted, fine-lined faces.',
    howToUse: 'Apply as final cream blanket in evening or morning skincare steps. Knead upwards.',
    ingredients: 'Hydrolyzed Collagen (50%), Peptide Complex, Adenosine, Ceramide NP, Squalane, Shea Butter.',
    tags: ['Cream', 'KSECRET', 'Collagen', 'Anti-Aging', 'Firming'],
    isNewArrival: true
  },
  {
    id: 'celimax-noni',
    sku: 'CELI-AMP-001',
    name: 'Noni Energy Ampoule',
    brand: 'Celimax',
    category: 'Skin Care',
    subCategory: 'Serum/Ampoule',
    price: 2300,
    salePrice: 1850,
    image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1608248597481-496100c80836?w=600&auto=format&fit=crop&q=80'
    ],
    stockStatus: 'SOLD', // marked as SOLD
    rating: 4.8,
    reviewsCount: 52,
    shortDescription: 'Super-nourishing ampoule powered by 71.77% Noni Fruit Extract to instantly energize stressed skin and calm flaring redness.',
    description: 'This multi-award-winning Noni Energy Ampoule contains vitamins and minerals to assist skin protection and heal dry, patchy textures and red zones. Rich hydration is deposited rapidly so dry and dull skins wake up rested.',
    howToUse: 'Pump appropriate measure and smooth over cheek, forehead, and chin contours. Tap gently.',
    ingredients: 'Noni Fruit Extract (71.77%), Noni Seed Oil, Rosemary Leaf Oil, Adenosine, Ceramide NP, Olive Fruit Oil.',
    tags: ['Ampoule', 'Celimax', 'Noni Extract', 'Soothing', 'Dry Skin']
  },
  {
    id: 'anua-toner-77',
    sku: 'ANUA-TON-001',
    name: 'Heartleaf 77% Soothing Toner',
    brand: 'Anua',
    category: 'Skin Care',
    subCategory: 'Toner',
    price: 2500,
    salePrice: 1950,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop&q=80'
    ],
    stockStatus: 'In Stock',
    rating: 4.7,
    reviewsCount: 215,
    shortDescription: 'The mega-viral soothing toner infused with 77% Heartleaf Extract, clinically proven to reduce redness, acne spots, and balance oily zones.',
    description: 'Anua Heartleaf 77% Soothing Toner is perfectly formulated to soothe, hydrate, and restore skin pH balances. Extremely beneficial for acne-prone skin, it removes light excess sebum while instantly relieving irritation.',
    howToUse: 'Drench cotton pads or splash direct onto palms and pat lightly over full clean face.',
    ingredients: 'Houttuynia Cordata (Heartleaf) Extract (77%), Centella Asiatica, Chamomile, Apple Fruit Extract, Butylene Glycol.',
    tags: ['Toner', 'Anua', 'Heartleaf', 'Soothing', 'Acne-prone']
  },
  {
    id: 'purito-eye',
    sku: 'PUR-EYE-001',
    name: 'Centella Green Level Eye Cream',
    brand: 'Purito Seoul',
    category: 'Skin Care',
    subCategory: 'Eye Care',
    price: 1600,
    salePrice: 1200,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80'
    ],
    stockStatus: 'In Stock',
    rating: 4.4,
    reviewsCount: 45,
    shortDescription: 'Gentle anti-aging eye wrinkle support combined with 49% Centella Asiatica Extract, Asiaticoside, and 4 kinds of skin-building peptides.',
    description: 'Formulated to target delicate under-eye boundaries without irritation. This formula strengthens and revives dry under-eyes, smoothing light baggage lines and reinforcing moisture levels.',
    howToUse: 'Dispense a fractional drop. Tap gently with ring finger surrounding the orbital bone until dry.',
    ingredients: 'Centella Asiatica Extract (49%), Hyaluronic Acid, Acetyl Hexapeptide-8, Panthenol, Adenosine, Ceramide NP.',
    tags: ['Eye Care', 'Purito Seoul', 'Centella', 'Anti-Wrinkle', 'Hydrating']
  },
  {
    id: 'mielle-oil',
    sku: 'MIELLE-HAIR-01',
    name: 'Rosemary Mint Scalp & Hair Strengthening Oil',
    brand: 'Mielle',
    category: 'Hair Care',
    subCategory: 'Hair Care',
    price: 1800,
    salePrice: 1450,
    image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1608248597481-496100c80836?w=600&auto=format&fit=crop&q=80'
    ],
    stockStatus: 'In Stock',
    rating: 4.8,
    reviewsCount: 310,
    shortDescription: 'An organic nutrient-dense, intensive formula geared to resolve your hair concerns: split end repair, dry scalp relief, and strand growth.',
    description: 'Infused with safe rosemary, mint, and biotin, this nourishing hair treatment oil invigorates hair follicles, smooths split ends, and treats flaky dry scalps. Safe for color treated or natural hair texture.',
    howToUse: 'Dray parts or rows in hair. Drop a few columns of oil directly cleanly onto scalp. Massage gently and comb through ends.',
    ingredients: 'Glycine Soja Oil, Ricinus Communis Seed Oil, Rosmarinus Officinalis Leaf Oil, Mentha Piperita Oil, Biotin, Melaleuca Alternifolia Leaf Oil.',
    tags: ['Hair Oil', 'Mielle', 'Rosemary', 'Growth Support', 'Scalp Care']
  },
  {
    id: 'bbw-gingham',
    sku: 'BBW-BODY-01',
    name: 'Gingham Fine Fragrance Body Mist',
    brand: 'Bath & Body Works',
    category: 'Body Care',
    subCategory: 'Body Care',
    price: 2400,
    salePrice: 1890,
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600&auto=format&fit=crop&q=80'
    ],
    stockStatus: 'In Stock',
    rating: 4.7,
    reviewsCount: 120,
    shortDescription: 'Gingham is a celebration of everything you love about Bath & Body Works. A fresh, vibrant, happy scent profile.',
    description: 'Whether you lavishly splash or lightly spritz, you will fall in love at first spray. This carefully crafted bottle and sophisticated pump delivers safe derm-tested conditioning aloe mist to leave skin fresh.',
    howToUse: 'Spritz generously onto pulse points or overall body surrounding clothing after showers.',
    ingredients: 'Alcohol Denat., Water, Fragrance (Parfum), Aloe Barbadensis Leaf Extract, Propylene Glycol.',
    tags: ['Fragrance Mist', 'BBW', 'Fresh Scent', 'Aloe Nourishment', 'Body Care']
  },
  {
    id: 'ordinary-niacinamide',
    sku: 'TO-SER-001',
    name: 'Niacinamide 10% + Zinc 1%',
    brand: 'The Ordinary',
    category: 'Skin Care',
    subCategory: 'Serum/Ampoule',
    price: 1250,
    salePrice: 990,
    image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1608248597481-496100c80836?w=600&auto=format&fit=crop&q=80'
    ],
    stockStatus: 'In Stock',
    rating: 4.5,
    reviewsCount: 540,
    shortDescription: 'A global bestselling clinical treatment designed to reduce skin blemishes, congested spots, and regulate sebum production.',
    description: 'This lightweight serum combats oil overproduction and repairs dull spots. Formulated with 10% pure Niacinamide and 1% Zinc PCA, it clarifies active blemishes, narrows enlarged pores, and unifies textures.',
    howToUse: 'Apply several drops to full face in the morning and evening, before applying heavier creams.',
    ingredients: 'Aqua (Water), Niacinamide, Pentylene Glycol, Zinc PCA, Dimethyl Isosorbide, Tamarindus Indica Seed Gum, Xanthan Gum.',
    tags: ['Serum', 'The Ordinary', 'Niacinamide', 'Anti-Acne', 'Oil Control']
  },
  {
    id: 'fino-hair-mask',
    sku: 'FINO-HAIR-001',
    name: 'Premium Touch Hair Mask',
    brand: 'FINO',
    category: 'Hair Care',
    subCategory: 'Hair Care',
    price: 1900,
    salePrice: 1550,
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600&auto=format&fit=crop&q=80'
    ],
    stockStatus: 'In Stock',
    rating: 4.9,
    reviewsCount: 185,
    shortDescription: 'The legendary Japanese premium hair mask formulated with Royal Jelly EX, PCA, and Lipidure to repair severely dry or damaged hair.',
    description: 'Fino Premium Touch is the perfect Japanese rinse-out hair treatment for dry, damaged, colored, or frizzy hair. It deeply reconstructs damaged structural zones from roots to ends, restoring shine and silkiness.',
    howToUse: 'After shampooing, squeeze out excess hair water. Apply a generous amount to dry ends. Leave for 5-10 minutes. Rinse warm.',
    ingredients: 'Water, Sorbitol, Dimethicone, Hydrogenated Rapeseed Oil Alcohol, Isopentyldiol, Behentrimonium Chloride, Royal Jelly Extract, Squalane.',
    tags: ['Hair Mask', 'FINO', 'Japanese Cosmetics', 'Damaged Repair', 'Deep Hydrating'],
    isNewArrival: true
  }
];

export const BRANDS_LIST = [
  // Korean Brand (A-B)
  "APLB", "April Skin", "Anua", "Abib", "AXIS-Y", "Aromatica", "Arencia", "Bonajour", "BRINGGREEN", "By Wishtrend", "Beauty of Joseon", "Benton", "Be The Skin", "Banila Co.", "Bad Skin", "Bellflower",
  // Korean Brand (B-F)
  "B.LAB", "Belif", "COSRX", "Celimax", "Coxir", "FINO", "Cos De BAHA", "Dr. Althea", "Dr. Ceuracle", "Dear Klairs", "Dr.ForHair", "Eqqualberry", "Etude House", "FULLY", "Farm Stay",
  // Korean Brand (G-M)
  "Goodal", "HaruHaru Wonder", "Heimish", "House of Hur", "I'M FROM", "Isntree", "Innisfree", "Iunik", "Illiyoon", "IZEZE", "Jumiso", "KSECRET", "KAINE", "Laneige", "Missha",
  // Korean Brand (M-R)
  "Mixsoon", "Manyo", "Mary & May", "Mise En Scene", "Medicube", "Numbuzin", "Neogen Dermalogy", "Nineless", "Nature Republic", "Purito Seoul", "Pyunkang Yul", "Rated Green", "Rovectin", "Ryo", "Round Lab",
  // Korean Brand (R-V)
  "Rom&nd", "SKIN1004", "Some By Mi", "Skin Food", "SimplyO", "Skinmiso", "TIRTIR", "Torriden", "Tocobo", "The Face Shop", "Tiam", "Healthy Place", "TONYMOLY", "VT Cosmetics", "3W Clinic",
  // Western / Japan
  "The Ordinary", "Bath & Body Works", "The Inkey List", "CeraVe", "Paula's Choice", "La Roche-Posay", "PanOxyl", "Neutrogena", "Mielle", "Bioderma", "Differin", "Cetaphil", "Topicals", "Japanese Cosmetics"
];

export const CATEGORIES_STRUCTURE = {
  column1: ["Cleansing Balm", "Cleansing Oil", "Water Cleanser", "Soap", "Exfoliator", "Toner", "Toner Pad"],
  column2: ["Essence", "Serum/Ampoule", "Cream/Moisturizer", "Sheet Mask", "Wash-Off Mask", "Sleeping Mask"],
  column3: ["Facial Mist & Oil", "Sunscreen", "Lotion", "Lip Care", "Eye Care", "Spot Treatment"],
  column4: ["Fungal Acne Safe", "Soothing Gel", "Combo", "Trial Kit/Travel Kit", "Miniature", "Makeup & Tools"]
};

export const BANGLADESH_REGIONS = [
  {
    division: "Dhaka",
    districts: [
      {
        name: "Dhaka",
        areas: ["Dhanmondi", "Gulshan-1", "Gulshan-2", "Banani", "Uttara", "Mirpur", "Mohammadpur", "Badda", "Tejgaon", "Khilgaon", "Bashundhara R/A", "Lalbagh", "Wari"]
      },
      {
        name: "Gazipur",
        areas: ["Gazipur Sadar", "Tongi", "Chow रास्ते", "Konabari", "Kaliakair"]
      },
      {
        name: "Narayanganj",
        areas: ["Narayanganj Sadar", "Chashara", "Siddhirganj", "Fatullah", "Sonargaon"]
      }
    ]
  },
  {
    division: "Chittagong",
    districts: [
      {
        name: "Chittagong",
        areas: ["GEC Circle", "Agrabad", "Halishahar", "Panchlaish", "Nasirabad", "Khulshi", "Chowkbazar", "Patenga"]
      },
      {
        name: "Cox's Bazar",
        areas: ["Cox's Bazar Sadar", "Kolatoli", "Inani", "Teknaf"]
      },
      {
        name: "Comilla",
        areas: ["Kandirpar", "Comilla Sadar", "Jhawtola", "Badurtala"]
      }
    ]
  },
  {
    division: "Sylhet",
    districts: [
      {
        name: "Sylhet",
        areas: ["Zindabazar", "Ambarkhana", "Uposhahar", "Chouhatta", "Shibgonj"]
      }
    ]
  },
  {
    division: "Rajshahi",
    districts: [
      {
        name: "Rajshahi",
        areas: ["Shaheb Bazar", "Motihar", "Kazla", "Boalia"]
      }
    ]
  },
  {
    division: "Khulna",
    districts: [
      {
        name: "Khulna",
        areas: ["Boyra", "Khulna Sadar", "Khalishpur", "Sonadanga"]
      }
    ]
  },
  {
    division: "Barisal",
    districts: [
      {
        name: "Barisal",
        areas: ["Barisal Sadar", "Rupatali", "Natullabad"]
      }
    ]
  },
  {
    division: "Rangpur",
    districts: [
      {
        name: "Rangpur",
        areas: ["Rangpur Sadar", "Modern More", "Dhap", "Kamarpukur"]
      }
    ]
  },
  {
    division: "Mymensingh",
    districts: [
      {
        name: "Mymensingh",
        areas: ["Mymensingh Sadar", "Ganginarpar", "Charpara", "Patgudam"]
      }
    ]
  }
];
