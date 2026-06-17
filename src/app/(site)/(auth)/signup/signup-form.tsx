'use client';

import { Checkbox } from '@/components/ui/inputs/checkbox';
import { Input, InputGroup } from '@/components/ui/inputs';
import { Label } from '@/components/ui/label';
import { EyeCloseIcon, EyeIcon } from '@/icons/icons';
import { authValidation } from '@/lib/zod/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type Inputs = z.infer<typeof authValidation.register>;

export default function SignupForm() {
  const form = useForm<Inputs>({
    resolver: zodResolver(authValidation.register),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  async function onSubmit(data: Inputs) {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000)); // Giả lập gọi API

    toast.success(
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    );

    setIsLoading(false);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

        {/* Họ */}
        <Controller
          control={form.control}
          name="firstName"
          render={({ field, fieldState }) => (
            <InputGroup
              label="Họ"
              placeholder="Nhập họ của bạn"
              disabled={isLoading}
              {...field}
              error={fieldState.error?.message}
            />
          )}
        />

        {/* Tên */}
        <Controller
          control={form.control}
          name="lastName"
          render={({ field, fieldState }) => (
            <InputGroup
              label="Tên"
              placeholder="Nhập tên của bạn"
              disabled={isLoading}
              {...field}
              error={fieldState.error?.message}
            />
          )}
        />

        {/* Email */}
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <InputGroup
              type="email"
              label="Địa chỉ email"
              placeholder="Nhập địa chỉ email của bạn"
              groupClassName="col-span-full"
              disabled={isLoading}
              {...field}
              error={fieldState.error?.message}
            />
          )}
        />

        {/* Mật khẩu */}
        <div className="col-span-full">
          <Label htmlFor="password">Mật khẩu</Label>

          <div className="relative">
            <Input
              type={isShowPassword ? 'text' : 'password'}
              placeholder="Nhập mật khẩu của bạn"
              id="password"
              disabled={isLoading}
              {...form.register('password')}
            />

            <button
              type="button"
              title={isShowPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
              aria-label={isShowPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
              onClick={handleShowPassword}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600"
            >
              {isShowPassword ? <EyeIcon /> : <EyeCloseIcon />}
            </button>
          </div>

          {form.formState.errors.password && (
            <p className="text-red-500 text-sm mt-1.5">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        {/* Ghi nhớ đăng nhập */}
        <Checkbox
          label="Ghi nhớ đăng nhập"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          name="remember_me"
          className="col-span-full"
        />

        {/* Nút đăng ký */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary-500 hover:bg-primary-600 transition py-3 px-6 w-full font-medium text-white text-sm rounded-full col-span-full disabled:opacity-75"
        >
          {isLoading ? 'Đang tạo tài khoản...' : 'Đăng ký'}
        </button>

      </div>
    </form>
  );
}