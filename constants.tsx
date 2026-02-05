
import { Product, Category, Testimonial } from './types';

export const CATEGORIES: Category[] = ['Roses', 'Bouquets', 'Wedding', 'Gifts'];

export const SHOP_WHATSAPP_NUMBER = "919000000000"; 
export const DELIVERY_FEE = 50;

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Romantic Rose Boutique',
    price: 45.00,
    category: 'Roses',
    image: 'https://images.unsplash.com/photo-1552174965-c6616f62fc4f?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1552174965-c6616f62fc4f?q=80&w=800',
      'https://images.unsplash.com/photo-1548624149-fbb88c3e80f9?q=80&w=800',
      'https://images.unsplash.com/photo-1518133835878-5a93cc3f89e5?q=80&w=800'
    ],
    description: 'A luxurious arrangement of premium red roses to express your deepest love.',
    longDescription: 'Our Romantic Rose Boutique is handcrafted using only the finest Grade-A long-stemmed roses. Each bloom is selected for its deep crimson hue and velvety texture. Perfect for anniversaries, proposals, or just to say "I love you" in the most elegant way possible.',
    freshness: '7-10 Days',
    isFeatured: true
  },
  {
    id: '2',
    name: 'Mixed Floral Joy',
    price: 55.00,
    category: 'Bouquets',
    image: 'https://images.unsplash.com/photo-1679765858056-408c3d929db6?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1679765858056-408c3d929db6?q=80&w=800',
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800'
    ],
    description: 'A vibrant mix of seasonal blooms hand-picked for maximum happiness.',
    longDescription: 'Bring a burst of color into any home with our Mixed Floral Joy. This bouquet features a curated selection of ranunculus, spray roses, and seasonal greenery. It is designed to look like a freshly picked garden meadow.',
    freshness: '5-8 Days',
    isFeatured: true
  },
  {
    id: '3',
    name: 'Sunshine Delight',
    price: 38.00,
    category: 'Bouquets',
    image: 'https://images.unsplash.com/photo-1553739289-08b7eee1afbe?q=80&w=800&auto=format&fit=crop',
    description: 'Bright sunflowers paired with elegant fillers to light up any room.',
    longDescription: 'The Sunshine Delight is our most popular "get well soon" and birthday bouquet. Large, radiant sunflowers are the star of the show, complemented by delicate chamomile and baby\'s breath.',
    freshness: '6-9 Days',
    isFeatured: true
  },
  {
    id: '4',
    name: 'Bridal Elegance',
    price: 120.00,
    category: 'Wedding',
    image: 'https://images.unsplash.com/photo-1488928741225-2aaf732c96cc?q=80&w=800&auto=format&fit=crop',
    description: 'A sophisticated white bouquet designed for the modern bride.',
    longDescription: 'Symbolizing purity and new beginnings, the Bridal Elegance features pristine white peonies, orchids, and silk ribbons. Each bouquet is individually balanced for weight and aesthetic to be the perfect wedding companion.',
    freshness: '4-6 Days',
    isFeatured: true
  },
  {
    id: '5',
    name: 'Orchid Paradise',
    price: 65.00,
    category: 'Gifts',
    image: 'https://images.unsplash.com/photo-1624998113087-37073f21bce1?q=80&w=800&auto=format&fit=crop',
    description: 'Exotic purple orchids that last long and symbolize luxury.',
    longDescription: 'Our Orchid Paradise is more than a gift; it is a statement of refinement. These exotic Phalaenopsis orchids are sourced from tropical nurseries and known for their exceptional longevity and striking architectural beauty.',
    freshness: '14-21 Days (in pot)',
    isFeatured: true
  },
  {
    id: '6',
    name: 'Lily Garden',
    price: 50.00,
    category: 'Bouquets',
    image: 'https://images.unsplash.com/photo-1706296091202-4dcd0c547dec?q=80&w=800&auto=format&fit=crop',
    description: 'Fragrant white lilies that bring a sense of peace and purity.',
    longDescription: 'The Lily Garden bouquet fills any space with an intoxicating, sweet fragrance. Oriental lilies are combined with eucalyptus leaves to create a calming, ethereal atmosphere.',
    freshness: '7-12 Days',
    isFeatured: true
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Johnson',
    rating: 5,
    text: 'The flowers were absolutely beautiful! My wife loved the bouquet and it lasted for weeks. Will definitely order again.'
  },
  {
    id: 't2',
    name: 'Michael Brown',
    rating: 5,
    text: 'Fast delivery and amazing quality. The wedding arrangements were perfect and exactly as described. Highly recommended!'
  },
  {
    id: 't3',
    name: 'Emily Davis',
    rating: 4.5,
    text: 'Great service and beautiful flowers. The team helped me choose the perfect bouquet for my anniversary.'
  }
];
