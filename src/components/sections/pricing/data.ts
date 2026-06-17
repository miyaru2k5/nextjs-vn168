export const BILLING_PERIODS = [
  {
    label: 'Hàng tháng',
    key: 'monthly',
    saving: null,
  },
  {
    label: 'Hàng năm',
    key: 'yearly',
    saving: '20%',
  },
] as const;

const AMOUNTS = {
  free: {
    monthly: 0,
    yearly: 0,
  },
  plus: {
    monthly: 15,
    yearly: 144,
  },
  pro: {
    monthly: 40,
    yearly: 384,
  },
  enterprise: {
    monthly: null,
    yearly: null,
  },
};

export type TBILLING_PLAN = (typeof BILLING_PLANS)[number];

export const BILLING_PLANS = [
  {
    name: 'Miễn phí',
    description:
      'Dành cho người dùng cá nhân muốn khám phá AI với các tính năng cơ bản và giới hạn số lượng token hàng tháng.',
    pricing: {
      monthly: {
        amount: AMOUNTS['free']['monthly'],
        formattedPrice: '$' + AMOUNTS['free']['monthly'],
        stripeId: null,
      },
      yearly: {
        amount: AMOUNTS['free']['yearly'],
        formattedPrice: '$' + AMOUNTS['free']['yearly'],
        stripeId: null,
      },
    },
    features: [
      'Truy cập các mô hình AI cơ bản',
      'Tối đa 25.000 token mỗi tháng',
      'Giới hạn 3 dự án',
      'Không hỗ trợ API Key',
      'Chỉ hỗ trợ qua cộng đồng',
    ],
    cta: 'Dùng thử miễn phí',
    popular: false,
  },
  {
    name: 'Gói Plus',
    description:
      'Dành cho nhà phát triển xây dựng sản phẩm thực tế với giới hạn cao hơn và khả năng sử dụng linh hoạt hơn.',
    pricing: {
      monthly: {
        amount: AMOUNTS['plus']['monthly'],
        formattedPrice: '$' + AMOUNTS['plus']['monthly'],
        stripeId: process.env.NEXT_PUBLIC_PLUS_MONTHLY_PRICE_ID!,
      },
      yearly: {
        amount: AMOUNTS['plus']['yearly'],
        formattedPrice: '$' + AMOUNTS['plus']['yearly'],
        stripeId: process.env.NEXT_PUBLIC_PLUS_YEARLY_PRICE_ID!,
      },
    },
    features: [
      'Bao gồm toàn bộ tính năng của gói Miễn phí',
      'Tối đa 250.000 token mỗi tháng',
      'Không giới hạn số lượng dự án',
      'Sử dụng API Key OpenAI của riêng bạn',
      'Bảng thống kê và phân tích cơ bản',
      'Hỗ trợ qua email',
    ],
    cta: 'Đăng ký ngay',
    popular: true,
  },
  {
    name: 'Gói Pro',
    description:
      'Dành cho đội nhóm và người dùng chuyên nghiệp cần giới hạn token lớn cùng các công cụ AI nâng cao.',
    pricing: {
      monthly: {
        amount: AMOUNTS['pro']['monthly'],
        formattedPrice: '$' + AMOUNTS['pro']['monthly'],
        stripeId: process.env.NEXT_PUBLIC_PRO_MONTHLY_PRICE_ID!,
      },
      yearly: {
        amount: AMOUNTS['pro']['yearly'],
        formattedPrice: '$' + AMOUNTS['pro']['yearly'],
        stripeId: process.env.NEXT_PUBLIC_PRO_YEARLY_PRICE_ID!,
      },
    },
    features: [
      'Bao gồm toàn bộ tính năng của gói Plus',
      'Tối đa 1 triệu token mỗi tháng',
      'Lựa chọn mô hình AI nâng cao (GPT-4, Claude 3)',
      'Ưu tiên hỗ trợ',
      'Công cụ cộng tác nhóm',
      'Xuất báo cáo sử dụng',
    ],
    cta: 'Đăng ký ngay',
    popular: false,
  },
  {
    name: 'Doanh nghiệp',
    description:
      'Giải pháp tùy chỉnh dành cho doanh nghiệp có nhu cầu sử dụng AI quy mô lớn và yêu cầu bảo mật cao.',
    pricing: {
      monthly: {
        amount: AMOUNTS['enterprise']['monthly'],
        formattedPrice: 'Liên hệ tư vấn',
        stripeId: null,
      },
      yearly: {
        amount: AMOUNTS['enterprise']['yearly'],
        formattedPrice: 'Liên hệ tư vấn',
        stripeId: null,
      },
    },
    features: [
      'Bao gồm toàn bộ tính năng của gói Pro',
      'Token không giới hạn',
      'Hệ thống AI riêng biệt (tùy chọn)',
      'Hỗ trợ cam kết SLA 24/7',
      'Đăng nhập một lần (SSO) và nhật ký kiểm toán',
    ],
    cta: 'Liên hệ kinh doanh',
    popular: false,
  },
];