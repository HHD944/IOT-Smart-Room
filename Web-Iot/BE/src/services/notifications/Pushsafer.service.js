const lastAlertState = {
  lastSentAt: 0,
  hasBeenTriggered: false,
};

const sendPushsaferAlert = async (temperature) => {
  const apiKey = process.env.PUSHSAFER_KEY;
  const deviceKey = process.env.PUSHSAFER_DEVICE_KEY;

  if (!apiKey || !deviceKey) {
    console.warn("Pushsafer chưa được cấu hình. Vui lòng kiểm tra .env");
    return;
  }

  const now = Date.now();

  if (now - lastAlertState.lastSentAt < 10_000) {
    return;
  }

  const payload = new URLSearchParams({
    k: apiKey,
    d: deviceKey,
    m: `Cảnh báo nhiệt độ phòng: ${temperature}°C. Nhiệt độ đang cao hơn mức cho phép 20°C.`,
    t: "Cảnh báo nhiệt độ phòng",
    s: "8",
  });

  try {
    const response = await fetch("https://www.pushsafer.com/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload.toString(),
    });

    const rawResult = await response.text();
    let parsedResult = null;

    try {
      parsedResult = JSON.parse(rawResult);
    } catch {
      parsedResult = null;
    }

    if (parsedResult?.error) {
      console.error("Pushsafer API error:", parsedResult.error);
      if (parsedResult.error === "not enough API calls") {
        console.error(
          "Tài khoản Pushsafer của bạn đã hết quota API. Hãy nâng gói hoặc mua thêm lượt gọi.",
        );
      }
      return;
    }

    lastAlertState.lastSentAt = now;
    lastAlertState.hasBeenTriggered = true;

    console.log("Pushsafer alert sent:", parsedResult ?? rawResult);
  } catch (error) {
    console.error("Lỗi gửi Pushsafer:", error);
  }
};

export const shouldSendHeatAlert = (temperature) => {
  return temperature > 20;
};

export const resetHeatAlertState = () => {
  lastAlertState.lastSentAt = 0;
  lastAlertState.hasBeenTriggered = false;
};

export default sendPushsaferAlert;
