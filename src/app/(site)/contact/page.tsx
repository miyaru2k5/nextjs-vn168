import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/inputs";
import { Textarea } from "@/components/ui/inputs/textarea";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Phone,
  Mail,
  Clock3,
  MapPin,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Liên hệ",
};

export default function ContactPage() {
  return (
    <section className="py-14 md:py-24">
      <div className="wrapper">
        <div className="mx-auto max-w-3xl">

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8 lg:p-10 dark:border-gray-800 dark:bg-dark-primary">

            {/* Heading */}

            <div className="text-center">
              <span className="inline-flex rounded-full bg-primary-50 px-4 py-1 text-sm font-medium text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
                Liên hệ Spa
              </span>

              <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                Đặt Lịch Tư Vấn Chăm Sóc Da
              </h1>

              <p className="mx-auto mt-3 max-w-2xl leading-7 text-gray-500 dark:text-gray-400">
                Hãy để lại thông tin, đội ngũ chuyên viên sẽ liên hệ và tư vấn
                miễn phí liệu trình chăm sóc da cùng sản phẩm phù hợp nhất dành
                cho bạn.
              </p>
            </div>

            {/* Form */}

            <form className="mt-10 space-y-5">

              {/* Họ tên */}

              <div>
                <Label htmlFor="fullName">
                  Họ và tên <span className="text-red-500">*</span>
                </Label>

                <Input
                  id="fullName"
                  placeholder="Nhập họ và tên"
                />
              </div>

              {/* Điện thoại */}

              <div>
                <Label htmlFor="phone">
                  Số điện thoại <span className="text-red-500">*</span>
                </Label>

                <Input
                  id="phone"
                  type="tel"
                  placeholder="0900 xxx xxx"
                />
              </div>

              {/* Email */}

              <div>
                <Label htmlFor="email">
                  Email
                </Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                />
              </div>

              {/* Dịch vụ */}

              <div>
                <Label>Dịch vụ quan tâm</Label>

                <Select>
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder="Chọn dịch vụ" />
                  </SelectTrigger>

                  <SelectContent className="rounded-xl">

                    <SelectItem value="scan">
                      Soi da miễn phí
                    </SelectItem>

                    <SelectItem value="acne">
                      Điều trị mụn
                    </SelectItem>

                    <SelectItem value="scar">
                      Điều trị sẹo
                    </SelectItem>

                    <SelectItem value="melasma">
                      Điều trị nám
                    </SelectItem>

                    <SelectItem value="white">
                      Làm trắng da
                    </SelectItem>

                    <SelectItem value="care">
                      Chăm sóc da
                    </SelectItem>

                    <SelectItem value="young">
                      Trẻ hóa da
                    </SelectItem>

                    <SelectItem value="product">
                      Mỹ phẩm
                    </SelectItem>

                    <SelectItem value="other">
                      Khác
                    </SelectItem>

                  </SelectContent>
                </Select>
              </div>

              {/* Tiêu đề */}

              <div>
                <Label htmlFor="subject">
                  Tiêu đề
                </Label>

                <Input
                  id="subject"
                  placeholder="Ví dụ: Tư vấn điều trị mụn"
                />
              </div>

              {/* Nội dung */}

              <div>
                <Label htmlFor="message">
                  Nội dung
                </Label>

                <Textarea
                  id="message"
                  rows={8}
                  className="rounded-2xl"
                  placeholder="Vui lòng mô tả tình trạng da hoặc nhu cầu của bạn..."
                />
              </div>

              {/* Button */}

              <Button
                type="submit"
                className="h-12 w-full rounded-xl text-base font-semibold"
              >
                Đặt lịch tư vấn miễn phí
              </Button>

            </form>

            {/* Contact */}

            <div className="mt-10 grid gap-5 border-t border-gray-200 pt-8 md:grid-cols-2 dark:border-gray-800">

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-primary-50 p-3 text-primary-600 dark:bg-primary-500/10">
                  <Phone size={20} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Hotline
                  </h3>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    0900 000 000
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-primary-50 p-3 text-primary-600 dark:bg-primary-500/10">
                  <Mail size={20} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Email
                  </h3>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    contact@yourspa.vn
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-primary-50 p-3 text-primary-600 dark:bg-primary-500/10">
                  <Clock3 size={20} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Giờ làm việc
                  </h3>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    08:00 - 20:00
                    <br />
                    Thứ 2 - Chủ nhật
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-primary-50 p-3 text-primary-600 dark:bg-primary-500/10">
                  <MapPin size={20} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Địa chỉ
                  </h3>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    123 Nguyễn Văn A, Quận 1,
                    <br />
                    TP. Hồ Chí Minh
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}