import Navigation from "../Components/ui/navigation";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Navigation chứa cả Header top và Bottom bar */}
      <Navigation />

      {/* Main chứa nội dung trang, xử lý lỗi đè hình bằng pt và pb */}
      <main className="flex-1 pt-24 pb-24 px-4 overflow-y-auto">
        <div className="container mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
};

export default MainLayout;
