import { useEffect, useState } from "react";
import { Card } from "../Components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const fetchThingSpeakChartData = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/cloud/thingspeak");

    if (!response.ok) {
      throw new Error("Không thể tải dữ liệu từ backend");
    }

    const chartData = await response.json();
    return Array.isArray(chartData) ? chartData : [];
  } catch (error) {
    console.error("Lỗi lấy dữ liệu ThingSpeak:", error);
    return [];
  }
};

export default function Analytics() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setLoading(true);
      const data = await fetchThingSpeakChartData();

      if (!isMounted) return;

      setChartData(data);
      setLoading(false);
    };

    loadData();
    const intervalId = setInterval(loadData, 15000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">
            Biểu Đồ Nhiệt Độ & Độ Ẩm
          </h2>
          <p className="text-muted-foreground">
            Dữ liệu được lấy trực tiếp từ ThingSpeak channel 3456801.
          </p>
        </div>

        <Card className="bg-card/50 border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Xu Hướng Nhiệt Độ & Độ Ẩm
          </h3>

          {loading ? (
            <div className="flex h-80 items-center justify-center text-muted-foreground">
              Đang tải dữ liệu từ ThingSpeak...
            </div>
          ) : chartData.length === 0 ? (
            <div className="flex h-80 items-center justify-center text-muted-foreground">
              Chưa có dữ liệu từ ThingSpeak.
            </div>
          ) : (
            <div className="w-full h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(0.22 0.04 280)"
                  />
                  <XAxis dataKey="time" stroke="oklch(0.65 0.05 280)" />
                  <YAxis stroke="oklch(0.65 0.05 280)" />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === "Nhiệt Độ (°C)") {
                        return [`${value}°C`, name];
                      }
                      return [`${value}%`, name];
                    }}
                    contentStyle={{
                      backgroundColor: "oklch(0.16 0.02 280)",
                      border: "1px solid oklch(0.22 0.04 280)",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "oklch(0.92 0 0)" }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="temp"
                    stroke="oklch(0.65 0.25 28)"
                    name="Nhiệt Độ (°C)"
                    strokeWidth={2}
                    dot={{ fill: "oklch(0.65 0.25 28)", r: 4 }}
                    connectNulls
                  />
                  <Line
                    type="monotone"
                    dataKey="humidity"
                    stroke="oklch(0.60 0.20 200)"
                    name="Độ Ẩm (%)"
                    strokeWidth={2}
                    dot={{ fill: "oklch(0.60 0.20 200)", r: 4 }}
                    connectNulls
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
