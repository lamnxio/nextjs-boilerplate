# Hướng dẫn tùy chỉnh GitHub Copilot cho dự án Next.js (App Router)

Tệp này cung cấp các nguyên tắc cho GitHub Copilot để đảm bảo tạo mã nhất quán, sạch sẽ và hiệu quả cho các ứng dụng Next.js (App Router) sử dụng Shadcn UI, Tailwind CSS, Zod, React Hook Form, React Query và Zustand.

## 1. Nguyên tắc chung

- **Ngôn ngữ:** Luôn trả lời và tạo mã bằng tiếng Việt.

- **Code sạch:** Ưu tiên khả năng đọc, bảo trì và tái sử dụng.

- **Ngắn gọn:** Hướng tới mã ngắn gọn và dễ hiểu.

- **Đặt tên mô tả:** Sử dụng tên rõ ràng và mô tả cho biến, hàm, component và tệp (ví dụ: `getUserProfile`, `ProductCard`, `useAuth`).

- **DRY (Don't Repeat Yourself):** Trích xuất logic có thể tái sử dụng vào các hàm, custom hook hoặc component.

- **TypeScript:** Luôn sử dụng TypeScript cho tất cả mã; ưu tiên `interface` hơn `type` khi định nghĩa props hoặc cấu trúc dữ liệu. Tránh `enum`; thay vào đó sử dụng các đối tượng hoặc `union type`.

- **Component:** Giữ các component nhỏ và tập trung vào một nhiệm vụ duy nhất.
  - **Đặt tên Component:** Sử dụng `PascalCase` cho tất cả tên component (ví dụ: `MyButton`, `UserAvatar`).

  - **Props:**
    - Sử dụng `camelCase` cho tên props.

    - Destructure props trong chữ ký hàm của component.

    - Cung cấp định nghĩa `interface` hoặc `type` rõ ràng cho props trong TypeScript.

  - **Tính bất biến (Immutability):** Không bao giờ thay đổi props hoặc state trực tiếp. Luôn tạo các đối tượng hoặc mảng mới để cập nhật.

  - **Fragments:** Sử dụng `<> </>` hoặc `React.Fragment` để tránh các phần tử DOM wrapper không cần thiết.

- **Styling:** Đảm bảo các style được giới hạn phạm vi để tránh xung đột toàn cục.

## 2. Next.js (App Router)

- **Router:** Dự án này sử dụng **Next.js App Router**. Không bao giờ gợi ý hoặc cung cấp mã sử dụng `pages router`.

- **Server Components (RSC):** Ưu tiên React Server Components (RSC) bất cứ khi nào có thể để tối ưu hiệu suất và giảm lượng JavaScript phía client.
  - Hạn chế sử dụng `use client` chỉ khi thực sự cần tương tác phía client (ví dụ: hooks, event listeners).

  - Giảm thiểu `useEffect` và `setState` trong các component phía client; ưu tiên truyền dữ liệu từ Server Components xuống.

- **Suspense:** Bọc các client component trong `Suspense` với `fallback` phù hợp để xử lý trạng thái tải.

- **Tải động (Dynamic Loading)::** Sử dụng `next/dynamic` cho các component không quan trọng để tối ưu hóa kích thước bundle.

- **Tối ưu hóa hình ảnh:** Sử dụng `next/image` với định dạng WebP, bao gồm dữ liệu kích thước và triển khai lazy loading.

- **Định tuyến (Routing):** Sử dụng định tuyến dựa trên hệ thống tệp của Next.js App Router.

## 3. Quản lý dữ liệu

- **React Query (TanStack Query):** Sử dụng React Query để quản lý việc tìm nạp, lưu trữ, đồng bộ hóa và cập nhật dữ liệu phía client.
  - Sử dụng `useQuery` cho các yêu cầu GET.

  - Sử dụng `useMutation` cho các thao tác POST, PUT, DELETE.

  - Quản lý trạng thái tải, lỗi và dữ liệu bằng các hook của React Query.

  - Tối ưu hóa các truy vấn bằng cách sử dụng `staleTime`, `cacheTime`, `refetchOnWindowFocus`, v.v.

- **Tìm nạp dữ liệu trong Server Components:**
  - Đối với dữ liệu thời gian xây dựng hoặc ít thay đổi, sử dụng `fetch` trực tiếp trong Server Components với tùy chọn `revalidate` (nếu cần).

  - Đối với dữ liệu động, thường xuyên thay đổi, sử dụng `fetch` trực tiếp trong Server Components.

  - Tránh tìm nạp dữ liệu phía client cho lần tải trang ban đầu trừ khi thực sự cần thiết (ví dụ: dữ liệu dành riêng cho người dùng sau khi hydrate).

  - Khi tìm nạp nhiều nguồn dữ liệu độc lập, hãy bắt đầu các yêu cầu song song.

## 4. UI/UX và Styling

- **Shadcn UI:** Sử dụng các component từ Shadcn UI. Khi tạo giao diện, ưu tiên sử dụng hoặc kết hợp các component Shadcn UI hiện có.

- **Tailwind CSS:** Sử dụng Tailwind CSS cho tất cả các style.
  - Triển khai thiết kế đáp ứng với Tailwind CSS; sử dụng phương pháp mobile-first.

  - Sử dụng các lớp tiện ích của Tailwind để tạo kiểu cho các phần tử.

  - Khi tạo component mới, hãy đảm bảo chúng dễ dàng tùy chỉnh bằng các lớp Tailwind.

- **`cn` helper:** Sử dụng hàm `cn` (từ `clsx` và `tailwind-merge`) để kết hợp các lớp Tailwind một cách có điều kiện và giải quyết xung đột.

## 5. Quản lý Form và Validation

- **React Hook Form:** Sử dụng React Hook Form để quản lý trạng thái form, validation và gửi form.
  - Sử dụng `useForm` hook để khởi tạo form.

  - Sử dụng `Controller` hoặc `useController` cho các component input tùy chỉnh (ví dụ: từ Shadcn UI).

- **Zod:** Sử dụng Zod cho định nghĩa schema và validation.
  - Tạo các schema Zod cho dữ liệu form và dữ liệu API.

  - Tích hợp Zod với React Hook Form bằng cách sử dụng `@hookform/resolvers/zod` để validation form.

## 6. Quản lý trạng thái toàn cục

- **Zustand:** Sử dụng Zustand cho quản lý trạng thái toàn cục nhẹ và linh hoạt.
  - Định nghĩa các store Zustand cho các phần trạng thái toàn cục khác nhau.

  - Sử dụng `create` để tạo store và `useStore` để truy cập trạng thái và hành động.

  - Giữ các store nhỏ và tập trung vào một miền cụ thể.

## 7. Các nguyên tắc khác

- **Không có TODOs/Placeholders:** Triển khai đầy đủ tất cả các chức năng được yêu cầu. Không để lại các `TODO` hoặc `placeholder` trong mã được tạo.

- **Tham chiếu tệp:** Khi gợi ý mã liên quan đến nhiều tệp, hãy tham chiếu tên tệp một cách rõ ràng.

- **Tính chính xác:** Luôn viết mã chính xác, cập nhật, không có lỗi, đầy đủ chức năng, an toàn và hiệu quả.

- **Khả năng đọc:** Ưu tiên khả năng đọc hơn hiệu suất nếu có xung đột.

- **Tái cấu trúc:** Chỉ viết lại toàn bộ mã nếu thực sự cần thiết.

- **Kiểm thử:** Đề xuất cập nhật hoặc tạo các bài kiểm thử liên quan nếu cần.
