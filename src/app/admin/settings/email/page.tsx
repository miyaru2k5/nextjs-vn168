'use client';

import { toast } from 'sonner';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { AdminForm, AdminFormSection, AdminFormActions, InputGroup, AdminSelect } from '@/components/admin/AdminForm';

export default function EmailSettingsPage() {
  return (
    <div>
      <AdminPageHeader title="Cài đặt Email" description="Cấu hình SMTP và email templates" />
      <AdminForm onSubmit={() => toast.success('Đã lưu cài đặt email')}>
        <AdminFormSection title="SMTP Configuration">
          <InputGroup label="SMTP Host" name="host" defaultValue="smtp.gmail.com" />
          <InputGroup label="SMTP Port" name="port" defaultValue="587" />
          <InputGroup label="Username" name="username" defaultValue="noreply@aistarterkit.com" />
          <InputGroup label="Password" name="password" type="password" defaultValue="••••••••" />
          <AdminSelect label="Encryption" name="encryption" defaultValue="tls" options={[
            { value: 'tls', label: 'TLS' },
            { value: 'ssl', label: 'SSL' },
            { value: 'none', label: 'None' },
          ]} />
          <InputGroup label="From Name" name="fromName" defaultValue="VN168" />
        </AdminFormSection>
        <AdminFormActions cancelHref="/admin" submitLabel="Lưu cài đặt" />
      </AdminForm>
    </div>
  );
}
