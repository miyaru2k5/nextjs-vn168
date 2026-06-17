'use client';

import { InputGroup } from '@/components/ui/inputs';
import { authValidation } from '@/lib/zod/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type Inputs = z.infer<typeof authValidation.forgotPasswordForm>;

type PropsType = {
  invalidToken: boolean;
};

export default function ForgotPasswordForm({ invalidToken }: PropsType) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<Inputs>({
    resolver: zodResolver(authValidation.forgotPasswordForm),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(data: Inputs) {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Mô phỏng gọi API

      toast.success(
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      );

      form.reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (invalidToken) {
      toast.error(
        'Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn. Vui lòng yêu cầu một liên kết mới.'
      );
    }
  }, [invalidToken]);

  return (
    <>
      <div className="text-center mb-8">
        <h3 className="text-gray-800 font-bold text-3xl mb-2 dark:text-white/90">
          Quên mật khẩu?
        </h3>

        <p className="text-gray-500 dark:text-gray-400">
          Nhập địa chỉ email đã liên kết với tài khoản của bạn, chúng tôi sẽ gửi
          cho bạn một liên kết để đặt lại mật khẩu.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-5">
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <InputGroup
                label="Email"
                type="email"
                placeholder="Nhập địa chỉ email của bạn"
                required
                error={fieldState.error?.message}
                disabled={isLoading}
                {...field}
              />
            )}
          />

          <button
            className="bg-primary-500 hover:bg-primary-600 transition py-3 px-6 w-full font-medium text-white text-sm rounded-full"
            disabled={isLoading}
          >
            {isLoading
              ? 'Đang gửi...'
              : 'Gửi liên kết đặt lại mật khẩu'}
          </button>
        </div>
      </form>

      <p className="text-gray-700 dark:text-gray-400 font-normal text-sm mt-5">
        Đã nhớ mật khẩu?{' '}
        <Link href="/signin" className="text-sm font-semibold text-primary-500">
          Đăng nhập
        </Link>
      </p>
    </>
  );
}