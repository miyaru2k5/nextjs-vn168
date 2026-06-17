'use client';

import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/inputs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/inputs/textarea';
import { Checkbox } from '@/components/ui/inputs/checkbox';
import { Modal } from '@/components/ui/modal/modal';
import { cn } from '@/lib/utils';

type Props = {
  jobTitle: string;
  isOpen: boolean;
  onClose: () => void;
  variant?: 'modal' | 'inline';
};

type FormData = {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  position: string;
  experience: string;
  skills: string;
  education: string;
  expectedSalary: string;
  startDate: string;
  github: string;
  linkedin: string;
  website: string;
  coverLetter: string;
  introduction: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const INITIAL_FORM: FormData = {
  fullName: '',
  dateOfBirth: '',
  gender: '',
  email: '',
  phone: '',
  address: '',
  position: '',
  experience: '',
  skills: '',
  education: '',
  expectedSalary: '',
  startDate: '',
  github: '',
  linkedin: '',
  website: '',
  coverLetter: '',
  introduction: '',
  consent: false,
};

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.fullName.trim()) errors.fullName = 'Vui lòng nhập họ và tên';
  if (!data.email.trim()) {
    errors.email = 'Vui lòng nhập email';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Email không hợp lệ';
  }
  if (!data.phone.trim()) {
    errors.phone = 'Vui lòng nhập số điện thoại';
  } else if (!/^(0|\+84)[0-9]{9,10}$/.test(data.phone.replace(/\s/g, ''))) {
    errors.phone = 'Số điện thoại không hợp lệ';
  }
  if (!data.experience.trim()) errors.experience = 'Vui lòng nhập kinh nghiệm';
  if (!data.education.trim()) errors.education = 'Vui lòng nhập trình độ học vấn';
  if (!data.consent) errors.consent = 'Bạn cần đồng ý với điều khoản';

  return errors;
}

export function JobApplyForm({ jobTitle, isOpen, onClose, variant = 'modal' }: Props) {
  const [form, setForm] = useState<FormData>({ ...INITIAL_FORM, position: jobTitle });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateField = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitting(false);
    setSubmitted(true);
    toast.success('Hồ sơ ứng tuyển đã được gửi thành công!');
  };

  const handleClose = () => {
    if (!submitting) {
      onClose();
      setTimeout(() => {
        setForm({ ...INITIAL_FORM, position: jobTitle });
        setErrors({});
        setSubmitted(false);
      }, 300);
    }
  };

  const formContent = submitted ? (
    <div className="text-center py-8">
      <div className="size-16 rounded-full bg-success-50 dark:bg-success-500/10 text-success-500 flex items-center justify-center mx-auto mb-4">
        <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-2">
        Gửi hồ sơ thành công!
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        Cảm ơn bạn đã ứng tuyển vị trí <strong>{jobTitle}</strong>. HR sẽ liên hệ trong 3-5 ngày làm việc.
      </p>
      <button
        onClick={handleClose}
        className="px-6 py-2.5 rounded-full bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium transition-colors"
      >
        Đóng
      </button>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
      <FormSection title="Thông tin cá nhân">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Họ và tên *" error={errors.fullName}>
            <Input
              value={form.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              placeholder="Nguyễn Văn A"
              error={!!errors.fullName}
            />
          </Field>
          <Field label="Ngày sinh">
            <Input
              type="date"
              value={form.dateOfBirth}
              onChange={(e) => updateField('dateOfBirth', e.target.value)}
            />
          </Field>
          <Field label="Giới tính">
            <select
              value={form.gender}
              onChange={(e) => updateField('gender', e.target.value)}
              className="h-12 w-full rounded-full border border-gray-300 px-5 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90 dark:bg-transparent focus:border-primary-300 focus:outline-none focus:ring-3 focus:ring-primary-300/20"
            >
              <option value="">Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </Field>
          <Field label="Email *" error={errors.email}>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="email@example.com"
              error={!!errors.email}
            />
          </Field>
          <Field label="Số điện thoại *" error={errors.phone}>
            <Input
              type="tel"
              value={form.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="0901234567"
              error={!!errors.phone}
            />
          </Field>
          <Field label="Địa chỉ hiện tại" className="sm:col-span-2">
            <Input
              value={form.address}
              onChange={(e) => updateField('address', e.target.value)}
              placeholder="Quận, Thành phố"
            />
          </Field>
        </div>
      </FormSection>

      <FormSection title="Thông tin nghề nghiệp">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Vị trí ứng tuyển">
            <Input value={form.position} disabled />
          </Field>
          <Field label="Kinh nghiệm làm việc *" error={errors.experience}>
            <Input
              value={form.experience}
              onChange={(e) => updateField('experience', e.target.value)}
              placeholder="VD: 3 năm Frontend"
              error={!!errors.experience}
            />
          </Field>
          <Field label="Kỹ năng chuyên môn">
            <Input
              value={form.skills}
              onChange={(e) => updateField('skills', e.target.value)}
              placeholder="React, TypeScript, Node.js"
            />
          </Field>
          <Field label="Trình độ học vấn *" error={errors.education}>
            <Input
              value={form.education}
              onChange={(e) => updateField('education', e.target.value)}
              placeholder="Đại học CNTT"
              error={!!errors.education}
            />
          </Field>
          <Field label="Mức lương mong muốn">
            <Input
              value={form.expectedSalary}
              onChange={(e) => updateField('expectedSalary', e.target.value)}
              placeholder="VD: 30 triệu"
            />
          </Field>
          <Field label="Thời gian bắt đầu">
            <Input
              type="date"
              value={form.startDate}
              onChange={(e) => updateField('startDate', e.target.value)}
            />
          </Field>
        </div>
      </FormSection>

      <FormSection title="Hồ sơ">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Upload CV *">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-500 hover:file:bg-primary-100"
            />
          </Field>
          <Field label="Upload Portfolio">
            <input
              type="file"
              accept=".pdf,.zip"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-500 hover:file:bg-primary-100"
            />
          </Field>
          <Field label="Link GitHub">
            <Input
              value={form.github}
              onChange={(e) => updateField('github', e.target.value)}
              placeholder="https://github.com/username"
            />
          </Field>
          <Field label="Link LinkedIn">
            <Input
              value={form.linkedin}
              onChange={(e) => updateField('linkedin', e.target.value)}
              placeholder="https://linkedin.com/in/username"
            />
          </Field>
          <Field label="Website cá nhân" className="sm:col-span-2">
            <Input
              value={form.website}
              onChange={(e) => updateField('website', e.target.value)}
              placeholder="https://yourwebsite.com"
            />
          </Field>
        </div>
      </FormSection>

      <FormSection title="Nội dung bổ sung">
        <div className="space-y-4">
          <Field label="Thư giới thiệu (Cover Letter)">
            <Textarea
              value={form.coverLetter}
              onChange={(e) => updateField('coverLetter', e.target.value)}
              placeholder="Viết thư giới thiệu ngắn gọn..."
              rows={4}
            />
          </Field>
          <Field label="Giới thiệu bản thân">
            <Textarea
              value={form.introduction}
              onChange={(e) => updateField('introduction', e.target.value)}
              placeholder="Chia sẻ thêm về bản thân và động lực ứng tuyển..."
              rows={4}
            />
          </Field>
        </div>
      </FormSection>

      <div>
        <Checkbox
          checked={form.consent}
          onChange={(e) => updateField('consent', e.target.checked)}
          label="Tôi đồng ý cho phép doanh nghiệp lưu trữ thông tin tuyển dụng của tôi"
        />
        {errors.consent && (
          <p className="text-red-500 text-sm mt-1.5">{errors.consent}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={cn(
          'w-full h-12 rounded-full bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium transition-colors duration-200',
          submitting && 'opacity-70 pointer-events-none'
        )}
      >
        {submitting ? 'Đang gửi hồ sơ...' : 'Gửi hồ sơ ứng tuyển'}
      </button>
    </form>
  );

  if (variant === 'inline') {
    return (
      <section id="apply" className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-700 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90 mb-2">
          Ứng tuyển vị trí này
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          Điền thông tin bên dưới để gửi hồ sơ ứng tuyển cho vị trí {jobTitle}.
        </p>
        <div className="rounded-[20px] bg-white dark:bg-dark-primary shadow-one border border-gray-100 dark:border-gray-800 p-6 sm:p-8">
          {formContent}
        </div>
      </section>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={submitted ? undefined : 'Ứng tuyển ngay'}
      description={submitted ? undefined : jobTitle}
      className={{ modal: 'sm:w-[680px] max-w-[95vw]' }}
    >
      {formContent}
    </Modal>
  );
}

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-base font-semibold text-gray-800 dark:text-white/90 mb-4 pb-2 border-b border-gray-100 dark:border-gray-800">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label>{label}</Label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="text-red-500 text-sm mt-1.5">{error}</p>}
    </div>
  );
}
