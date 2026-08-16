import express from "express";
import "dotenv/config";

const router = express.Router();

const fetchThingSpeakField = async (field) => {
  const channelId = process.env.THINGSPEAK_CHANNEL_ID;
  const readApiKey = process.env.THINGSPEAK_READ_API_KEY;

  if (!channelId || !readApiKey) {
    throw new Error("ThingSpeak configuration is missing");
  }

  const url = `https://api.thingspeak.com/channels/${channelId}/fields/${field}.json?api_key=${readApiKey}&results=20`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`ThingSpeak request failed with status ${response.status}`);
  }

  return response.json();
};

router.get("/thingspeak", async (req, res) => {
  try {
    const [tempData, humidityData] = await Promise.all([
      fetchThingSpeakField(1),
      fetchThingSpeakField(2),
    ]);

    const tempFeeds = Array.isArray(tempData?.feeds) ? tempData.feeds : [];
    const humidityFeeds = Array.isArray(humidityData?.feeds)
      ? humidityData.feeds
      : [];

    const longestLength = Math.max(tempFeeds.length, humidityFeeds.length);

    const chartData = Array.from({ length: longestLength }, (_, index) => {
      const tempFeed = tempFeeds[index];
      const humidityFeed = humidityFeeds[index];
      const createdAt = tempFeed?.created_at || humidityFeed?.created_at;

      return {
        time: createdAt
          ? new Date(createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "",
        temp:
          tempFeed && tempFeed.field1 !== undefined
            ? Number(tempFeed.field1)
            : null,
        humidity:
          humidityFeed && humidityFeed.field2 !== undefined
            ? Number(humidityFeed.field2)
            : null,
      };
    }).filter((entry) => entry.temp !== null || entry.humidity !== null);

    res.json(chartData);
  } catch (error) {
    console.error("Lỗi lấy dữ liệu ThingSpeak từ backend:", error);
    res.status(500).json({
      message: "Không thể lấy dữ liệu ThingSpeak",
    });
  }
});

export default router;
