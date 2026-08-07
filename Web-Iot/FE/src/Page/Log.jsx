import { Card } from "../Components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../Components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const temperatureData = [
  { time: "08:00", temp: 22.1, humidity: 48 },
  { time: "09:00", temp: 23.2, humidity: 50 },
  { time: "10:00", temp: 24.5, humidity: 52 },
  { time: "11:00", temp: 25.3, humidity: 54 },
  { time: "12:00", temp: 26.1, humidity: 58 },
  { time: "13:00", temp: 26.8, humidity: 60 },
  { time: "14:00", temp: 25.9, humidity: 57 },
  { time: "15:00", temp: 25.2, humidity: 55 },
  { time: "16:00", temp: 24.6, humidity: 52 },
  { time: "17:00", temp: 23.8, humidity: 50 },
  { time: "18:00", temp: 23.2, humidity: 49 },
];

const activityLog = [
  {
    id: 1,
    timestamp: "2024-05-28 18:32:15",
    device: "Đèn",
    action: "Tắt",
    duration: "6h 24m",
  },
  {
    id: 2,
    timestamp: "2024-05-28 18:15:42",
    device: "Quạt",
    action: "Tắt",
    duration: "3h 15m",
  },
  {
    id: 3,
    timestamp: "2024-05-28 15:00:28",
    device: "Đèn",
    action: "Tự Động Bật",
    duration: "-",
  },
  {
    id: 4,
    timestamp: "2024-05-28 15:00:15",
    device: "Quạt",
    action: "Tự Động Bật",
    duration: "-",
  },
  {
    id: 5,
    timestamp: "2024-05-28 14:45:32",
    device: "Đèn",
    action: "Tắt Thủ Công",
    duration: "45m",
  },
  {
    id: 6,
    timestamp: "2024-05-28 14:00:18",
    device: "Quạt",
    action: "Bật Thủ Công",
    duration: "-",
  },
];

const usageData = [
  { day: "Mon", lights: 6.5, fan: 3.2 },
  { day: "Tue", lights: 7.2, fan: 3.8 },
  { day: "Wed", lights: 6.8, fan: 3.1 },
  { day: "Thu", lights: 7.5, fan: 4.0 },
  { day: "Fri", lights: 8.1, fan: 4.3 },
  { day: "Sat", lights: 5.2, fan: 2.1 },
];

export default function Analytics() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">
            Phân Tích & Lịch Sử
          </h2>
          <p className="text-muted-foreground">
            Xem dữ liệu lịch sử và xu hướng của phòng thông minh của bạn
          </p>
        </div>

        {/* Temperature Chart */}
        <Card className="bg-card/50 border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Xu Hướng Nhiệt Độ & Độ Ẩm (Hôm Nay)
          </h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={temperatureData}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.22 0.04 280)"
                />
                <XAxis dataKey="time" stroke="oklch(0.65 0.05 280)" />
                <YAxis stroke="oklch(0.65 0.05 280)" />
                <Tooltip
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
                />
                <Line
                  type="monotone"
                  dataKey="humidity"
                  stroke="oklch(0.60 0.20 200)"
                  name="Độ Ẩm (%)"
                  strokeWidth={2}
                  dot={{ fill: "oklch(0.60 0.20 200)", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Weekly Usage Chart */}
        <Card className="bg-card/50 border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Báo Cáo Sử Dụng Hàng Tuần
          </h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={usageData}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.22 0.04 280)"
                />
                <XAxis dataKey="day" stroke="oklch(0.65 0.05 280)" />
                <YAxis stroke="oklch(0.65 0.05 280)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(0.16 0.02 280)",
                    border: "1px solid oklch(0.22 0.04 280)",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "oklch(0.92 0 0)" }}
                />
                <Legend />
                <Bar
                  dataKey="lights"
                  fill="oklch(0.65 0.25 28)"
                  name="Đèn (giờ)"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey="fan"
                  fill="oklch(0.60 0.20 200)"
                  name="Quạt (giờ)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Activity Log */}
        <Card className="bg-card/50 border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Nhật Ký Hoạt Động
          </h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">
                    Thời Gian
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    Thiết Bị
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    Hành Động
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    Thời Lượng
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activityLog.map((log) => (
                  <TableRow
                    key={log.id}
                    className="border-border hover:bg-secondary/20"
                  >
                    <TableCell className="text-sm text-foreground">
                      {log.timestamp}
                    </TableCell>
                    <TableCell className="text-sm text-foreground font-medium">
                      {log.device}
                    </TableCell>
                    <TableCell className="text-sm">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          log.action.includes("Off")
                            ? "bg-red-500/20 text-red-300"
                            : "bg-green-500/20 text-green-300"
                        }`}
                      >
                        {log.action}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {log.duration}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Statistics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card/50 border-border p-4">
            <p className="text-sm text-muted-foreground mb-2">
              Nhiệt Độ Trung Bình
            </p>
            <p className="text-2xl font-bold text-primary">24.6°C</p>
            <p className="text-xs text-muted-foreground mt-2">Hôm nay</p>
          </Card>
          <Card className="bg-card/50 border-border p-4">
            <p className="text-sm text-muted-foreground mb-2">
              Độ Ẩm Trung Bình
            </p>
            <p className="text-2xl font-bold text-primary">53%</p>
            <p className="text-xs text-muted-foreground mt-2">Hôm nay</p>
          </Card>
          <Card className="bg-card/50 border-border p-4">
            <p className="text-sm text-muted-foreground mb-2">
              Tổng Số Sự Kiện
            </p>
            <p className="text-2xl font-bold text-primary">127</p>
            <p className="text-xs text-muted-foreground mt-2">Tháng này</p>
          </Card>
          <Card className="bg-card/50 border-border p-4">
            <p className="text-sm text-muted-foreground mb-2">
              Năng Lượng Sử Dụng
            </p>
            <p className="text-2xl font-bold text-primary">24.3 kWh</p>
            <p className="text-xs text-muted-foreground mt-2">Tháng này</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
