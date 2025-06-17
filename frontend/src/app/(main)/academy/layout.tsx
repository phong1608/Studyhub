import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Academy - MCNA Consulting and Analytics",
    description: "Giúp bạn thoải mái hơn trong hoạt động kinh doanh.",
    keywords: ["Academy", "MCNA", "Data Analytics", "Business Intelligence"],
  };

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
