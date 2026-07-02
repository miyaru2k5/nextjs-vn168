export const BILLING_PERIODS = [
  {
    label: 'Dịch vụ Spa',
    key: 'monthly',
    saving: null,
  },
  {
    label: 'Mỹ phẩm',
    key: 'yearly',
    saving: null,
  },
] as const;

const AMOUNTS = {
  skincare: {
    monthly: 299000,
    yearly: 690000,
  },
  acne: {
    monthly: 699000,
    yearly: 990000,
  },
  whitening: {
    monthly: 899000,
    yearly: 1290000,
  },
  premium: {
    monthly: null,
    yearly: null,
  },
};

export type TBILLING_PLAN = (typeof BILLING_PLANS)[number];

export const BILLING_PLANS = [
  {
    name: 'Chăm Sóc Da',
    description:
      'Liệu trình chăm sóc da cơ bản giúp làm sạch sâu, cấp ẩm và phục hồi làn da khỏe mạnh.',
    pricing: {
      monthly: {
        amount: AMOUNTS.skincare.monthly,
        formattedPrice: '299.000đ',
        stripeId: null,
      },
      yearly: {
        amount: AMOUNTS.skincare.yearly,
        formattedPrice: 'Từ 690.000đ',
        stripeId: null,
      },
    },
    features: [
      'Soi da miễn phí',
      'Làm sạch chuyên sâu',
      'Tẩy tế bào chết',
      'Cấp ẩm và phục hồi',
      'Massage thư giãn',
    ],
    cta: 'Đặt lịch ngay',
    popular: false,
  },
  {
    name: 'Điều Trị Mụn',
    description:
      'Liệu trình điều trị mụn chuẩn y khoa giúp giảm viêm, làm sạch da và hạn chế mụn tái phát.',
    pricing: {
      monthly: {
        amount: AMOUNTS.acne.monthly,
        formattedPrice: '699.000đ',
        stripeId: null,
      },
      yearly: {
        amount: AMOUNTS.acne.yearly,
        formattedPrice: 'Từ 990.000đ',
        stripeId: null,
      },
    },
    features: [
      'Soi da & tư vấn',
      'Lấy nhân mụn chuẩn y khoa',
      'Điện di tinh chất',
      'Kháng viêm, giảm thâm',
      'Theo dõi sau điều trị',
    ],
    cta: 'Đặt lịch ngay',
    popular: true,
  },
  {
    name: 'Trị Nám & Làm Trắng',
    description:
      'Ứng dụng công nghệ hiện đại kết hợp mỹ phẩm chuyên sâu giúp cải thiện sắc tố và mang lại làn da sáng khỏe.',
    pricing: {
      monthly: {
        amount: AMOUNTS.whitening.monthly,
        formattedPrice: '899.000đ',
        stripeId: null,
      },
      yearly: {
        amount: AMOUNTS.whitening.yearly,
        formattedPrice: 'Từ 1.290.000đ',
        stripeId: null,
      },
    },
    features: [
      'Điều trị nám',
      'Làm sáng da',
      'Phục hồi chuyên sâu',
      'Giảm thâm sau mụn',
      'Mỹ phẩm hỗ trợ tại nhà',
    ],
    cta: 'Đặt lịch ngay',
    popular: false,
  },
  {
    name: 'Combo Premium',
    description:
      'Gói chăm sóc toàn diện dành cho khách hàng muốn điều trị và duy trì làn da khỏe đẹp lâu dài.',
    pricing: {
      monthly: {
        amount: null,
        formattedPrice: 'Liên hệ',
        stripeId: null,
      },
      yearly: {
        amount: null,
        formattedPrice: 'Liên hệ',
        stripeId: null,
      },
    },
    features: [
      'Điều trị mụn',
      'Điều trị nám',
      'Trẻ hóa da',
      'Chăm sóc định kỳ',
      'Tặng mỹ phẩm chính hãng',
    ],
    cta: 'Liên hệ tư vấn',
    popular: false,
  },
];