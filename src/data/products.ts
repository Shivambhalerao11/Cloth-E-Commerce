import { Product, Order, InventoryItem } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'oversized-cotton-twill-shirt',
    name: 'Oversized Cotton Twill Shirt',
    subtitle: 'Heavyweight Twill (250gsm)',
    category: 'Shirts',
    price: 2499,
    originalPrice: 3999,
    badge: 'NEW',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4VTQezvOdSkpweDbEv94_Ss59ZcVoC3qUHFYGmdU8ScytqHJ-s_tdgwpGGVDBpjtu9Hj0O9R7nrTnxFlQ2CxKlqD5CrOTq0dMzpXygT7qdlI6ePuTNVUCMfM1Hh72xMuV2Z58jSgcCE02k2y-_V63YPpyKe59vxSAe-ENtfsn2Kjzqm_2dK6EL2ZSsjk8og9AIB9R2d65h4c6r1m3D1aXDBKwFpMwCp3y2GluVxnNkMVtx2s09hd_',
    detailImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB4VTQezvOdSkpweDbEv94_Ss59ZcVoC3qUHFYGmdU8ScytqHJ-s_tdgwpGGVDBpjtu9Hj0O9R7nrTnxFlQ2CxKlqD5CrOTq0dMzpXygT7qdlI6ePuTNVUCMfM1Hh72xMuV2Z58jSgcCE02k2y-_V63YPpyKe59vxSAe-ENtfsn2Kjzqm_2dK6EL2ZSsjk8og9AIB9R2d65h4c6r1m3D1aXDBKwFpMwCp3y2GluVxnNkMVtx2s09hd_',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAZBeXz3M2JaOtBZzgwSSkNJPxUYMKE6FXcOXRVNnBbt6zvw-RXtghEWGYlRJCgqaUIpYUeR1CDueIiggNXZwFH86QZ6kp9EvYw406u-6MQWAfnIHays564P8R7GJ1YVKY3NqcsTP8vc6dvUNXD_1yZqEQx-nNTbd39TV04Ki3PPspA7jzbWnkG50pu4H2vcs00XsXBOV6LngJ9XvflJu2-yeGyE9ic57qkZ7yjg9QsESDCvmbJBIm8',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBaUVRdFfHmKvDtTeo8sIq6J23eydfhCeWRC5kYwusYuLj7A7qt67iDW6D3iKls5i7er6hIWdev0N5-9fNw8tBPGt_gSiGoebkddaYtxSu1OYGncbdEcp8w5Uftd2riOFdVARlyr68vt2xxG45YNqxicVplAAccdtuGDfcbnALODv-BPMhjQ99E5jKMaEnrXsvDSKe9e1pFMotKmYtBw3jw13zCMflKZF1dGDEam0yq0yALskTo4GMO'
    ],
    description: 'A foundational piece designed with a dropped shoulder and generous cut through the body. Crafted from heavy-weight 100% organic cotton twill that holds its shape while softening with wear.',
    specs: [
      '100% Organic Cotton',
      'Heavyweight Twill (250gsm)',
      'Boxy, oversized fit',
      'Machine wash cold',
      'Sourced & tailored at Gandhi Chowk, Varangaon'
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Bone', hex: '#e8e2d6' },
      { name: 'Ink Black', hex: '#1d1c14' },
      { name: 'Rust', hex: '#a53c1b' }
    ],
    stock: 14,
    sku: 'SHT-TW-BNE',
    featured: true
  },
  {
    id: 'heavyweight-box-tee',
    name: 'Heavyweight Box Tee',
    subtitle: 'Olive Drab / 280gsm Cotton',
    category: 'T-Shirts',
    price: 2499,
    originalPrice: 2999,
    badge: 'NEW',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTHe0FiqP_XhL4-nnd-LmlnV_sK-wR3-zOhSuyzJdxRMCWsPP0IpxFEWOzkiQ8JYt2ktllSdqb-02eLQh8k02tCeXEZM7jejFCX5eCq5jLGEVcMlSSJXbcXino4T8rG_Ek1Ca13ptkxHx_k3iAj0FE038UfVDjT8dS7a9BGqMlr52ZG5MiPoGAq14SZFNusXwGjLiLGG5JBAh3xh7C6WQ84xJUGdiD461SsIPpoYTf2yyoz-wPknY9',
    description: 'Detailed, close-up heavy cotton oversized t-shirt in deep olive drab. Built for durability, sharp silhouette and structured drape.',
    specs: [
      '100% Carded Heavy Cotton',
      '280gsm Pre-shrunk Fabric',
      'Reinforced collar ribbing',
      'Relaxed boxy silhouette'
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Olive Drab', hex: '#4b5320' },
      { name: 'Bone White', hex: '#f4eee2' },
      { name: 'Washed Black', hex: '#252321' }
    ],
    stock: 22,
    sku: 'TEE-BX-OLV',
    featured: true
  },
  {
    id: 'structured-chore-jacket',
    name: 'Structured Chore Jacket',
    subtitle: 'Olive Green / Heavyweight Cotton',
    category: 'Jackets',
    price: 3499,
    originalPrice: 4999,
    badge: 'NEW',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApENk5ZRAW11t1OoVIKw59odrkt9IDU-v2usWTOeBYMfMLqnGqcM6ve1oUnMKmHyo200AG6CqT7tC3nC-Fqz95FTP7H-X8ERYiUneHMJtt6mxxXrX94Yl6X9k7EcdO-IbEqylowPj5yInjlsMZh2pXZMzV5ANmFmYZFj3vryRBoNtccMQrZHQHePCOTJDkb0_EfthuAI2sfXFajkjGKwPWd8Sde9z3ZcrKegHTIHQpByLfhqnxFx_2',
    description: 'Minimalist, raw brutalist silhouette jacket with deep utility pockets, concealed button placket, and substantial tactile fabric feel.',
    specs: [
      '100% Heavy Canvas Cotton',
      'Triple-needle reinforced stitching',
      'Custom matte metal hardware',
      'Dual utility drop-in chest pockets'
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Olive Green', hex: '#4a5d23' },
      { name: 'Charcoal', hex: '#2c2b29' },
      { name: 'Khaki Stone', hex: '#cdc5c0' }
    ],
    stock: 8,
    sku: 'JKT-CHR-OLV',
    featured: true,
    isHero: true
  },
  {
    id: 'raw-indigo-jacket',
    name: 'Raw Indigo Jacket',
    subtitle: 'Structured Denim / 14oz Selvedge',
    category: 'Jackets',
    price: 4899,
    originalPrice: 5999,
    badge: 'LIMITED',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKx9wonfYUv2MP01cFco1sxiT6OUVE_r78hVRrkIfRl3gyVvuOisZmDVGh2Mwbz1cIh70D-6sCXfgKaUt_Jjw9_SwHosNub_xVtm0hc-vpU6toPB_S-BYS5TvTb5rn9N7cups-6yRObQXLa1A8GsiKpATzqNGxKpS2O1PrKy-td9n-VD7PzsI74aZtEbSE2Rg7ABnEgY061xfBulTBmtD4Bp_UIjp9wc3xlaR5oMiNzMDToqUIjVQm',
    description: 'Structured denim jacket in raw, unwashed dark indigo. Accentuates the rigid texture of authentic heritage selvedge with contrast copper hardware.',
    specs: [
      '14oz Japanese Selvedge Denim',
      'Unwashed raw indigo finish',
      'Copper rivet reinforcement',
      'Ages uniquely to wearer patina'
    ],
    availableSizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Raw Indigo', hex: '#1a233a' },
      { name: 'Overdyed Black', hex: '#111111' }
    ],
    stock: 6,
    sku: 'JKT-DN-RAW',
    featured: true
  },
  {
    id: 'oxford-button-down',
    name: 'Oxford Button-Down',
    subtitle: 'Crisp White / Heritage Weave',
    category: 'Shirts',
    price: 1899,
    originalPrice: 2499,
    badge: 'POPULAR',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-pTQeSkRbYSBQtVbrstNCe8BM5xqiVH5Vq03JupEJj2K7G7YYjdoIlvAyfW1SK3UCGeiaSoKWJcvKuaPNVkfzUavT0oZHoP8k4pnIhyTPuMwC-zvtJk4Fk16rZxUVcEbrRhJvWmNOZaRqdQ44CdQtGTWynyAVS9x_agm6-Yqiuze6ElUp304VnPlHL6tJf1JpRC7qkcDdss3bpnvKnw__aOpswwwjEjSoX11h_rdoELnf8raQtl0W',
    description: 'A close-up tactile Oxford shirt made with textured heavy cotton weave and sharp button-down collar points for casual and elevated wear.',
    specs: [
      '100% Combed Oxford Cotton',
      'Natural Mother-of-Pearl buttons',
      'Reinforced gusset side seams',
      'Signature chest patch pocket'
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Crisp White', hex: '#ffffff' },
      { name: 'Stone Grey', hex: '#cfc5bd' },
      { name: 'Pale Sky Blue', hex: '#b8c9d9' }
    ],
    stock: 25,
    sku: 'SHT-OXF-WHT',
    featured: true
  },
  {
    id: 'selvedge-denim',
    name: 'Selvedge Denim',
    subtitle: 'Rigid Twill / Straight Cut',
    category: 'Denim',
    price: 4299,
    originalPrice: 5499,
    badge: 'LIMITED',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDl3OX8PHJpILOPYpcPAcoFFqjlbLf0pQhHD67I4JPLvZO4HGpF9E8I0SHKAc9TDKLke9YhsdTjqdo_svHRilq64erwuUvIanhpKmxOQ12V80qn3BRDdSt-_qKuzxWoBZylrkWU_mvnZZwMAOyHgRSR2Y_KjJuxZEhAkzOIqUrzUaXxxEl3dI6sJi5zKag4pWdHE4uRUY6MmuK8_jDzM2uEBbPs4ZUNUgpot2PSrwzki9N-AKvmgkG-',
    description: 'Heavily textured ink-black and deep indigo denim trousers with classic red selvedge ID, brass hardware, and a flattering straight leg drape.',
    specs: [
      '13.5oz Red-line Selvedge',
      'Mid-rise straight leg cut',
      'Heavy-duty pocket bags',
      'Button fly closure'
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Ink Black', hex: '#161616' },
      { name: 'Raw Deep Indigo', hex: '#1e2840' }
    ],
    stock: 12,
    sku: 'DNM-SLV-BLK',
    featured: true
  },
  {
    id: 'heavyweight-knit',
    name: 'Heavyweight Knit',
    subtitle: 'Rust Wool / Tactile Weave',
    category: 'Knitwear',
    price: 2999,
    originalPrice: 3899,
    badge: 'RESTOCKED',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASJnd8hA5APLxz7w4hhYkMXX9sffesZw2YLtahLY9uqVQ_Aj_taVSAJg_SbdS5s9E3_koO3ro0KlRaB52CmSCD-AQXzFEIeEVUDWzlI5rn1SGmGdlr0KqzINQXn63vD2gd3SIuLr1hZ_0f4EzsEJ5P01GpSEyaXsk047w9yiDYmPb9p9djQ9mE0pzGvHQeeCflnaI3h5wWsUiqsNsQ2b9hpXrzGb9o-ZM8UMtyYCgWwMsMrA1wPX61',
    description: 'Textured knit crewneck sweater in a rich autumnal rust color. Chunky ribbed trim at neck, cuffs, and hem ensures warmth and structure.',
    specs: [
      '80% Merino Wool, 20% Organic Cotton',
      '7-gauge heavy knit construction',
      'Ribbed collar and cuffs',
      'Hand wash or dry clean recommended'
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Rust Earth', hex: '#a53c1b' },
      { name: 'Forest Moss', hex: '#37432e' },
      { name: 'Bone Cream', hex: '#e8e2d6' }
    ],
    stock: 7,
    sku: 'KNT-HVY-RST',
    featured: true
  },
  {
    id: 'essential-tee',
    name: 'Essential Tee',
    subtitle: 'Bone White / 220gsm Combed Cotton',
    category: 'T-Shirts',
    price: 999,
    originalPrice: 1299,
    badge: 'POPULAR',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAp67CmvTZZ9amFiga_CuxBJfTR1B46gbzmtP9rJs-30fBAwM-0kp2Tv7GYPbjsHnqMF_wvQhVvag3IOD7MIRIO6_AhfdS5QtAkgeQ1XReyDt_07gTx_FjmFPg_HiHiSipzvcN6wcbMdE7w7Sz0kcwWl8IKHKLBYqNEOZ7UwLC-kJFhok9rtXgxPlU_5zZU_wHU4f4oPD75Iz42xHlFB6RYQQTa8tfv7NFu7n1oZ4402NLyWsDQYSNP',
    description: 'The definitive daily foundation t-shirt. Cut from soft yet structured 220gsm combed cotton with a clean ribbed neckline that retains its shape.',
    specs: [
      '100% Ringspun Combed Cotton',
      'Clean bind neckline rib',
      'Pre-washed against shrinkage',
      'Relaxed everyday fit'
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Bone White', hex: '#fff9ed' },
      { name: 'Washed Charcoal', hex: '#333028' },
      { name: 'Olive Green', hex: '#586144' }
    ],
    stock: 35,
    sku: 'TEE-ESS-WHT',
    featured: true
  },
  {
    id: 'utility-tote',
    name: 'Utility Tote',
    subtitle: 'Canvas / Heavy Duty Black',
    category: 'Accessories',
    price: 1299,
    originalPrice: 1699,
    badge: 'LIMITED',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDujcAxTXVLKXQOkMUNCV95_B5ZrpXSMx7A-oyRftPr-Nmlc5vNp0k-HvYCW1d-oY4lStUHYWcnjXSBQ2j1_aIA1v_PUvna6NGzkyckwLHK6J31BqCTsuckD3W71VriswaPWj2o8ki_lJqhZGx6XwlQuQC5PUdRM6X1-cdvvVqAXIIti4dFIYvxrhmj_0F1z57seTi7k2sv2W4xfqfy-Rh_BRvE5Qyk-pCjTT1aaqLmx4LvM02I43b0',
    description: 'A brutalist utilitarian canvas tote bag featuring reinforced webbing handles, internal zip compartment, and subtle typography branding.',
    specs: [
      '18oz Heavy Duty Cotton Duck Canvas',
      'Internal zippered security pocket',
      'Cross-stitched reinforced webbing handles',
      'Capacity: 22 Liters'
    ],
    availableSizes: ['M'],
    colors: [
      { name: 'Pitch Black', hex: '#000000' },
      { name: 'Raw Canvas Natural', hex: '#e9e1db' }
    ],
    stock: 15,
    sku: 'ACC-TOT-BLK'
  },
  {
    id: 'classic-linen-shirt',
    name: 'Classic White Linen',
    subtitle: 'Natural Slub Linen / Breathable',
    category: 'Shirts',
    price: 1499,
    originalPrice: 2199,
    badge: 'RESTOCKED',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuqFlRd9dnDTHP5VGxSoLYfqjBDuJpbvRt6_dKKKZwAEVVm0O0YjqvGTlbhekDrF5dUAKHPTSxOdftwIEoVhxW-6tT8ggDnSNmuHaZgWzaq7wOkM3ICbRdYws_AQOoGLjfgUc4PMUGZNMOBPsHI-G-gHkJi2FSA2UXe96pwBv6D-Im1-2py3WU0kbd9QPsOzLBKF9QHI3eM4Wa4BiR1CiZjFsiEcdNvpCvu4d7QOPAo58G5tb0xGZJ',
    description: 'Natural slub linen shirt featuring relaxed chest drape, breathable weave, and minimalist mother-of-pearl buttons. Ideal for year-round warmth.',
    specs: [
      '100% Pure Organic French Flax Linen',
      'Natural textured slub finish',
      'Relaxed Cuban style collar',
      'Pre-washed for instant softness'
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Bone White', hex: '#fff9ed' },
      { name: 'Raw Sand', hex: '#d9cfc1' }
    ],
    stock: 4,
    sku: 'SHT-LN-WHT'
  },
  {
    id: 'twill-chinos-olive',
    name: 'Twill Chinos - Olive',
    subtitle: 'Heavy Cotton Twill / Relaxed Taper',
    category: 'Denim',
    price: 2699,
    originalPrice: 3499,
    badge: 'POPULAR',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZjUZbRH0SXm_KrrBGsHPNQrXGBQ-c6mQQt6Ur8hv8nPQiGcVheOCC0_Ia-LntV9dqlnLGcOxp9cZNS_Gq5NJM-351m8g8RDRK2ZsgnuURc3unseCzGf3UPINt--4f_wQHnTXQoECfezPn0QfK4RSB9IKUBug7iwlU8AQ6F4nwL3Pb7TlzREwImWiwH0jtqxx8b6Qj1iJ0b57lHBAGDlWcAmE1W7PXAhDsTc-gjHKmehGqdzyGky8d',
    description: 'Pleated relaxed taper chinos made from 280gsm durable cotton twill. Designed with deep front slash pockets and structured waistband.',
    specs: [
      '100% Heavyweight Cotton Twill',
      'Double front pleats for room & drape',
      'Horn button closure',
      'Slight crop above ankle'
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Olive Green', hex: '#4a5d23' },
      { name: 'Stone Khaki', hex: '#c5b8a5' }
    ],
    stock: 2,
    sku: 'CHN-TW-OLV'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: '#AMW-9901',
    customerName: 'Aarav Deshmukh',
    customerPhone: '+91 98220 12345',
    address: {
      fullName: 'Aarav Deshmukh',
      street: 'Near Gandhi Chowk, Market Road',
      landmark: 'Opposite Old Clock Tower',
      city: 'Varangaon',
      pinCode: '425305'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        size: 'L',
        color: 'Stone Grey',
        quantity: 1,
        price: 2499
      },
      {
        product: INITIAL_PRODUCTS[4],
        size: 'L',
        color: 'Crisp White',
        quantity: 1,
        price: 1899
      }
    ],
    subtotal: 4398,
    shipping: 0,
    tax: 0,
    total: 4250,
    status: 'Shipped',
    statusDetails: 'Package is at Varangaon Sorting Hub.',
    date: 'Oct 14, 2026',
    time: '14:30 PM',
    timeline: [
      { step: 'Placed', date: 'Oct 12', time: '10:45 AM', completed: true },
      { step: 'Packed', date: 'Oct 13', time: '09:12 AM', completed: true },
      { step: 'Shipped', date: 'Oct 14', time: '14:30 PM', completed: true, active: true, note: 'Package is at Varangaon Sorting Hub.' },
      { step: 'Out for Delivery', date: 'Oct 15', completed: false },
      { step: 'Delivered', date: 'Expected Oct 16', completed: false }
    ]
  },
  {
    id: '#AMW-8921',
    customerName: 'Rahul Desai',
    customerPhone: '+91 98231 44556',
    address: {
      fullName: 'Rahul Desai',
      street: 'Subhash Road, Block 4',
      city: 'Bhusawal',
      pinCode: '425201'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[2],
        size: 'M',
        color: 'Olive Green',
        quantity: 1,
        price: 3499
      }
    ],
    subtotal: 3499,
    shipping: 100,
    tax: 0,
    total: 4200,
    status: 'Placed',
    date: 'Today',
    time: '11:20 AM',
    timeline: [
      { step: 'Placed', date: 'Today', time: '11:20 AM', completed: true, active: true }
    ]
  },
  {
    id: '#AMW-8920',
    customerName: 'Vikram Singh',
    customerPhone: '+91 98210 99887',
    address: {
      fullName: 'Vikram Singh',
      street: 'Station Road, Near Bus Stand',
      city: 'Varangaon',
      pinCode: '425305'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[4],
        size: 'L',
        color: 'Crisp White',
        quantity: 1,
        price: 1899
      }
    ],
    subtotal: 1899,
    shipping: 0,
    tax: 0,
    total: 1850,
    status: 'Shipped',
    date: 'Yesterday',
    time: '16:45 PM',
    timeline: [
      { step: 'Placed', date: 'Oct 17', completed: true },
      { step: 'Packed', date: 'Oct 17', completed: true },
      { step: 'Shipped', date: 'Oct 18', completed: true, active: true }
    ]
  },
  {
    id: '#AMW-8919',
    customerName: 'Arjun Patel',
    customerPhone: '+91 94222 77112',
    address: {
      fullName: 'Arjun Patel',
      street: 'Gandhi Chowk, 1st Lane',
      city: 'Varangaon',
      pinCode: '425305'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[3],
        size: 'XL',
        color: 'Raw Indigo',
        quantity: 1,
        price: 4899
      },
      {
        product: INITIAL_PRODUCTS[5],
        size: 'L',
        color: 'Ink Black',
        quantity: 1,
        price: 4299
      }
    ],
    subtotal: 9198,
    shipping: 0,
    tax: 0,
    total: 8900,
    status: 'Delivered',
    date: 'Oct 10',
    time: '12:05 PM',
    timeline: [
      { step: 'Placed', date: 'Oct 8', completed: true },
      { step: 'Packed', date: 'Oct 8', completed: true },
      { step: 'Shipped', date: 'Oct 9', completed: true },
      { step: 'Out for Delivery', date: 'Oct 10', completed: true },
      { step: 'Delivered', date: 'Oct 10', completed: true }
    ]
  },
  {
    id: '#AMW-8918',
    customerName: 'Karan Kapoor',
    customerPhone: '+91 97654 33211',
    address: {
      fullName: 'Karan Kapoor',
      street: 'Jalgaon Highway, Colony A',
      city: 'Varangaon',
      pinCode: '425305'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[2],
        size: 'L',
        color: 'Olive Green',
        quantity: 1,
        price: 3499
      }
    ],
    subtotal: 3499,
    shipping: 0,
    tax: 0,
    total: 3450,
    status: 'Placed',
    date: 'Today',
    time: '08:15 AM',
    timeline: [
      { step: 'Placed', date: 'Today', time: '08:15 AM', completed: true, active: true }
    ]
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-1',
    name: 'Classic White Linen',
    sku: 'SHT-LN-WHT',
    category: 'Shirts',
    stock: 4,
    lowStockThreshold: 5,
    price: 1499,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuqFlRd9dnDTHP5VGxSoLYfqjBDuJpbvRt6_dKKKZwAEVVm0O0YjqvGTlbhekDrF5dUAKHPTSxOdftwIEoVhxW-6tT8ggDnSNmuHaZgWzaq7wOkM3ICbRdYws_AQOoGLjfgUc4PMUGZNMOBPsHI-G-gHkJi2FSA2UXe96pwBv6D-Im1-2py3WU0kbd9QPsOzLBKF9QHI3eM4Wa4BiR1CiZjFsiEcdNvpCvu4d7QOPAo58G5tb0xGZJ'
  },
  {
    id: 'inv-2',
    name: 'Raw Denim Jacket',
    sku: 'JKT-DN-RAW',
    category: 'Jackets',
    stock: 42,
    lowStockThreshold: 10,
    price: 4899,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC26Hn_1wACuueCyACc9qK0_J5pM_nd2pZPtLNjecmDnMxM8FOu1QD1Ng403yHACRiq5wDwPCul4p0RtOrSOF7rn0DrjVUSCpb7jtFsWH8HqMhwrULUR7a8Oe2vAqbifNOAVAoxW-wBcE3G-JpLgbInWh8eYQvw6-ZZUMowq6GlOpBQ3ru88h9CskV8NctYPwnh9ehQLdVRhqFgfBwZX2FLwoKj_aEzlmslhEba0Bj2emgN_lfdlbHJ'
  },
  {
    id: 'inv-3',
    name: 'Twill Chinos - Olive',
    sku: 'CHN-TW-OLV',
    category: 'Denim',
    stock: 2,
    lowStockThreshold: 5,
    price: 2699,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZjUZbRH0SXm_KrrBGsHPNQrXGBQ-c6mQQt6Ur8hv8nPQiGcVheOCC0_Ia-LntV9dqlnLGcOxp9cZNS_Gq5NJM-351m8g8RDRK2ZsgnuURc3unseCzGf3UPINt--4f_wQHnTXQoECfezPn0QfK4RSB9IKUBug7iwlU8AQ6F4nwL3Pb7TlzREwImWiwH0jtqxx8b6Qj1iJ0b57lHBAGDlWcAmE1W7PXAhDsTc-gjHKmehGqdzyGky8d'
  },
  {
    id: 'inv-4',
    name: 'Oversized Cotton Twill',
    sku: 'SHT-TW-BNE',
    category: 'Shirts',
    stock: 14,
    lowStockThreshold: 5,
    price: 2499,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4VTQezvOdSkpweDbEv94_Ss59ZcVoC3qUHFYGmdU8ScytqHJ-s_tdgwpGGVDBpjtu9Hj0O9R7nrTnxFlQ2CxKlqD5CrOTq0dMzpXygT7qdlI6ePuTNVUCMfM1Hh72xMuV2Z58jSgcCE02k2y-_V63YPpyKe59vxSAe-ENtfsn2Kjzqm_2dK6EL2ZSsjk8og9AIB9R2d65h4c6r1m3D1aXDBKwFpMwCp3y2GluVxnNkMVtx2s09hd_'
  },
  {
    id: 'inv-5',
    name: 'Heavyweight Box Tee',
    sku: 'TEE-BX-OLV',
    category: 'T-Shirts',
    stock: 22,
    lowStockThreshold: 8,
    price: 2499,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTHe0FiqP_XhL4-nnd-LmlnV_sK-wR3-zOhSuyzJdxRMCWsPP0IpxFEWOzkiQ8JYt2ktllSdqb-02eLQh8k02tCeXEZM7jejFCX5eCq5jLGEVcMlSSJXbcXino4T8rG_Ek1Ca13ptkxHx_k3iAj0FE038UfVDjT8dS7a9BGqMlr52ZG5MiPoGAq14SZFNusXwGjLiLGG5JBAh3xh7C6WQ84xJUGdiD461SsIPpoYTf2yyoz-wPknY9'
  }
];
