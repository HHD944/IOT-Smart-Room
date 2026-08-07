import { useState } from "react";
import { Card } from "../Components/ui/card";
import { Button } from "../Components/ui/button";
import { Input } from "../Components/ui/input";
import { Label } from "../Components/ui/label";
import { Badge } from "../Components/ui/badge";

export default function Settings() {
  const [wifiSSID, setWifiSSID] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleWifiConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6 max-w-2xl">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">
            Cài Đặt Thiết Bị
          </h2>
          <p className="text-muted-foreground">
            Cấu hình WiFi và các cài đặt thiết bị khác
          </p>
        </div>

        {/* WiFi Configuration */}
        <Card className="bg-card/50 border-border p-6">
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Cấu Hình WiFi
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Kết nối thiết bị của bạn đến mạng WiFi
              </p>
            </div>

            {/* Current Connection Status */}
            <div className="bg-secondary/20 rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Kết Nối Hiện Tại
                  </p>
                  <p className="text-foreground font-medium">HomeOffice-5G</p>
                </div>
                <Badge className="bg-green-500/20 text-green-300 border border-green-500/30">
                  Đã Kết Nối
                </Badge>
              </div>
              <div className="mt-3 text-xs text-muted-foreground space-y-1">
                <p>Cường Độ Tín Hiệu: 85%</p>
                <p>Địa Chỉ IP: 192.168.1.145</p>
              </div>
            </div>

            {/* New Connection Form */}
            <div className="space-y-4 pt-4 border-t border-border">
              <p className="text-sm font-medium text-foreground">
                Kết Nối Mạng Khác
              </p>

              <div className="space-y-2">
                <Label htmlFor="ssid" className="text-sm text-muted-foreground">
                  Tên Mạng (SSID)
                </Label>
                <Input
                  id="ssid"
                  placeholder="Nhập tên mạng WiFi"
                  value={wifiSSID}
                  onChange={(e) => setWifiSSID(e.target.value)}
                  className="bg-secondary/30 border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm text-muted-foreground"
                >
                  Mật Khẩu
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu WiFi"
                    value={wifiPassword}
                    onChange={(e) => setWifiPassword(e.target.value)}
                    className="bg-secondary/30 border-border text-foreground pr-10"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M11.83 9L15.64 12.81c.04-.25.08-.5.08-.75 0-1.66-1.34-3-3-3-.25 0-.5.04-.75.08L11.83 9zm7.08 0l-5.08 5.08c.25.04.5.08.75.08 1.66 0 3-1.34 3-3 0-.25-.04-.5-.08-.75zM2.01 3.87l2.68 2.68C3.06 7.83 1.77 9.53 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l3.12 3.12c.46.46 1.21.46 1.67 0 .46-.46.46-1.21 0-1.67L3.67 2.2c-.46-.46-1.21-.46-1.67 0-.46.46-.46 1.22 0 1.67zm12.13 1.23C16.04 4.83 14.1 4 12 4c-5 0-9.27 3.11-11 7.5 1.27 3.58 4.05 6.2 7.59 7.29l2.75-2.75c-.67-.52-1.11-1.3-1.11-2.19 0-1.66 1.34-3 3-3 .89 0 1.67.44 2.19 1.11l2.58-2.58z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <Button
                onClick={handleWifiConnect}
                disabled={!wifiSSID || !wifiPassword || connecting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {connecting ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Đang Kết Nối...
                  </span>
                ) : (
                  "Kết Nối Mạng"
                )}
              </Button>

              {connected && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <p className="text-sm text-green-300 flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                    Đã kết nối thành công đến mạng
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Device Information */}
        <Card className="bg-card/50 border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Thông Tin Thiết Bị
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <p className="text-sm text-muted-foreground">Tên Thiết Bị</p>
              <p className="text-sm text-foreground font-medium">
                Bộ Điều Khiển Phòng Thông Minh
              </p>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <p className="text-sm text-muted-foreground">
                Phiên Bản Firmware
              </p>
              <p className="text-sm text-foreground font-medium">v2.1.0</p>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <p className="text-sm text-muted-foreground">Phần Cứng</p>
              <p className="text-sm text-foreground font-medium">
                ESP32 Rev 1.0
              </p>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <p className="text-sm text-muted-foreground">Địa Chỉ MAC</p>
              <p className="text-sm text-foreground font-medium">
                AA:BB:CC:DD:EE:FF
              </p>
            </div>
            <div className="flex justify-between items-center py-2">
              <p className="text-sm text-muted-foreground">
                Lần Khởi Động Cuối
              </p>
              <p className="text-sm text-foreground font-medium">
                2 ngày trước
              </p>
            </div>
          </div>
        </Card>

        {/* System Actions */}
        <Card className="bg-card/50 border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Hành Động Hệ Thống
          </h3>
          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              className="border-border text-foreground hover:bg-secondary/20"
            >
              Khởi Động Lại Thiết Bị
            </Button>
            <Button
              variant="outline"
              className="border-border text-foreground hover:bg-secondary/20"
            >
              Đặt Lại Cài Đặt WiFi
            </Button>
            <Button
              variant="outline"
              className="border-destructive text-destructive hover:bg-destructive/10"
            >
              Đặt Lại Nhà Máy
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
