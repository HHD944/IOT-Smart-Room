import { useEffect, useState } from "react";
import { Card } from "../Components/ui/card";
import { Button } from "../Components/ui/button";
import { io } from "socket.io-client";

export default function Dashboard() {
  const [lightOnTime, setLightOnTime] = useState(null);
  const [fanOnTime, setFanOnTime] = useState(null);

  const [lightOn, setLightOn] = useState(false);
  const [fanOn, setFanOn] = useState(false);
  const [occupancy, setOccupancy] = useState(true);

  const [temperature, setTemperature] = useState(25.5);
  const [humidity, setHumidity] = useState(55);
  const [lightIntensity, setLightIntensity] = useState(750);

  const setLight = async (state) => {
    try {
      const response = await fetch("http://localhost:3000/api/device/light", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          device: "light",
          action: state,
        }),
      });

      const data = await response.json();

      console.log("BE response:", data);
    } catch (error) {
      console.error("Lỗi gửi dữ liệu:", error);
    }
  };

  const toggleLight = () => {
    const newState = !lightOn;

    setLightOn(newState);
    setLight(newState ? "ON" : "OFF");

    if (newState) {
      setLightOnTime(new Date());
    }
  };

  const setFan = async (state) => {
    try {
      const response = await fetch("http://localhost:3000/api/device/fan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          device: "fan",
          action: state,
        }),
      });

      const data = await response.json();

      console.log("BE response:", data);
    } catch (error) {
      console.error("Lỗi gửi dữ liệu:", error);
    }
  };

  const toggleFan = () => {
    const newState = !fanOn;

    setFanOn(newState);
    setFan(newState ? "ON" : "OFF");

    if (newState) {
      setFanOnTime(new Date());
    }
  };

  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("connect", () => {
      console.log("Đã kết nối Socket.IO:", socket.id);
    });

    socket.on("dht11-data", (data) => {
      console.log("Nhận JSON từ BE:", data);
      setTemperature(data.temp);
      setHumidity(data.humid);
    });

    socket.on("pir-data", (data) => {
      console.log("Nhận JSON từ BE:", data);
      setOccupancy(data.motion);
    });

    socket.on("photoregister-data", (data) => {
      console.log("Nhận JSON từ BE:", data);
      setLightIntensity(data.light);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const formatTime = (time) => {
    if (!time) return "--:--";

    return time.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">
            Trung Tâm Điều Khiển
          </h2>
          <p className="text-muted-foreground">
            Theo dõi và kiểm soát phòng họp thông minh của bạn theo thời gian
            thực
          </p>
        </div>

        {/* Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Occupancy Status */}
          <Card className="bg-card/50 border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Trạng Thái Phòng!!
                </p>
                <h3 className="text-2xl font-bold text-foreground">
                  {occupancy ? "Có Người" : "Trống"}
                </h3>
              </div>
              <div
                className={`w-16 h-16 rounded-lg flex items-center justify-center ${
                  occupancy ? "bg-green-500/20" : "bg-gray-500/20"
                }`}
              >
                <svg
                  className={`w-8 h-8 ${occupancy ? "text-green-500" : "text-gray-400"}`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            </div>
          </Card>

          {/* Environment Status */}
          <Card className="bg-card/50 border-border p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Nhiệt Độ</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-foreground">
                    {temperature}°
                  </span>
                  <span className="text-sm text-muted-foreground">C</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Độ Ẩm</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-foreground">
                    {humidity}%
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Controls Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Điều Khiển Thiết Bị
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Lighting Control */}
            <Card className="bg-card/50 border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      lightOn ? "bg-yellow-500/20" : "bg-gray-500/20"
                    }`}
                  >
                    <svg
                      className={`w-6 h-6 ${lightOn ? "text-yellow-400" : "text-gray-400"}`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-20C5.1 1 2 4.1 2 8c0 2.85 1.92 5.28 4.5 6.16V21h5v-6.84c2.58-.88 4.5-3.31 4.5-6.16C15 4.1 11.9 1 12 1z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Đèn</p>
                    <p className="text-lg font-semibold text-foreground">
                      {lightOn ? "Bật" : "Tắt"}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={toggleLight}
                  variant={lightOn ? "default" : "outline"}
                  className="rounded-lg"
                >
                  {lightOn ? "Tắt" : "Bật"}
                </Button>
              </div>
              <div className="space-y-2 text-xs text-muted-foreground"></div>
            </Card>

            {/* Fan Control */}
            <Card className="bg-card/50 border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      fanOn ? "bg-blue-500/20" : "bg-gray-500/20"
                    }`}
                  >
                    <svg
                      className={`w-6 h-6 ${fanOn ? "text-blue-400" : "text-gray-400"} ${fanOn ? "animate-spin" : ""}`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 3C6.48 3 2 6.92 2 11.5c0 3.02 1.85 5.65 4.54 7.13.3.15.62.16.93.04l2.87-1.22c.27-.11.59-.08.85.08 1.61.87 3.48 1.38 5.49 1.38 3.59 0 6.74-2.08 8.41-5.15.24-.45.02-1.01-.48-1.13-2.35-.55-4.38-1.73-5.81-3.35-.64-.72-1.55-1.13-2.54-1.13-.94 0-1.81.37-2.46 1.03-.36.38-.95.42-1.38.09l-1.37-1.07c-.36-.28-.38-.8-.04-1.1.93-.82 2.15-1.33 3.5-1.33 2.16 0 4.12.91 5.51 2.37 1.6-1.18 3.58-1.87 5.72-1.87.55 0 1-.45 1-1s-.45-1-1-1c-2.52 0-4.82.72-6.82 1.96-1.5-1.14-3.36-1.81-5.39-1.81z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Quạt Thông Gió
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      {fanOn ? "Bật" : "Tắt"}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={toggleFan}
                  variant={fanOn ? "default" : "outline"}
                  className="rounded-lg"
                >
                  {fanOn ? "Tắt" : "Bật"}
                </Button>
              </div>
              <div className="space-y-2 text-xs text-muted-foreground"></div>
            </Card>
          </div>
        </div>

        {/* Quick Stats */}
        <Card className="bg-card/50 border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Hoạt Động Hôm Nay
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Đèn Bật</p>
              <p className="text-2xl font-bold text-primary">
                {formatTime(lightOnTime)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Thời Gian Quạt
              </p>
              <p className="text-2xl font-bold text-primary">
                {formatTime(fanOnTime)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Cường Độ Ánh Sáng
              </p>
              <p className="text-2xl font-bold text-primary">
                {lightIntensity} lux
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
