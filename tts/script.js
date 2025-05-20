// Đặt API key của bạn vào đây
const apiKey =
  "lYGX-qsyK0Zg4EbXdjbGhLVahBHrovEK7n8YJ2eAgPX6c-aec9kdnZj86nWdxvG_-BhpdBi00BSindlcR5s7Kw";

// Sự kiện click
document.getElementById("convert").addEventListener("click", async () => {
  const text = document.getElementById("text").value.trim();
  const voice = document.getElementById("voice-id").value.trim();
  const speed = parseFloat(document.getElementById("speed").value.trim());

  if (!voice) {
    alert("Vui lòng nhập voice ID!");
    return;
  }

  if (isNaN(voice)) {
    alert("Voice ID phải là số!");
    return;
  }

  if (!text) {
    alert("Vui lòng nhập văn bản!");
    return;
  }

  try {
    const response = await fetch(
      "https://api.ausynclab.org/api/v1/speech/text-to-speech",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "X-API-Key": apiKey,
        },
        body: JSON.stringify({
          audio_name: "Web Audio Demo",
          text,
          voice_id: voice,
          speed,
          callback_url:
            "https://webhook.site/019928d9-1798-464b-8445-19393dbe9524",
        }),
      }
    );

    if (!response.ok) {
      console.error(
        "Lỗi khi gửi yêu cầu:",
        response.status,
        response.statusText
      );
      alert(`Lỗi khi gửi yêu cầu: ${response.status} - ${response.statusText}`);
      return;
    }

    const result = await response.json();
    console.log("Dữ liệu trả về từ API:", result);
    const audioId = result.result.audio_id;
    console.log("Audio ID:", audioId);

    let audioUrl = "";
    while (!audioUrl) {
      const detailResponse = await fetch(
        `https://api.ausynclab.org/api/v1/speech/${audioId}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "X-API-Key": apiKey,
          },
        }
      );

      if (!detailResponse.ok) {
        console.error(
          "Lỗi khi lấy thông tin chi tiết:",
          detailResponse.status,
          detailResponse.statusText
        );
        alert(
          `Lỗi khi lấy thông tin chi tiết: ${detailResponse.status} - ${detailResponse.statusText}`
        );
        return;
      }

      const detailResult = await detailResponse.json();
      console.log("Chi tiết audio:", detailResult);

      // Kiểm tra nếu audio_url không rỗng
      audioUrl = detailResult.result.audio_url;

      if (!audioUrl) {
        console.log("Audio URL chưa sẵn sàng, chờ 2 giây...");
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Chờ 2 giây trước khi thử lại
      }
    }

    // Lấy URL audio và phát trên web
    const audioPlayer = document.getElementById("audio-player");
    audioPlayer.style.display = "block";
    audioPlayer.innerHTML = `
      <audio controls>
        <source src="${audioUrl}" type="audio/wav">
        Trình duyệt của bạn không hỗ trợ phát audio.
      </audio>
    `;
  } catch (error) {
    console.error("Lỗi trong quá trình xử lý:", error);
    alert("Đã xảy ra lỗi trong quá trình xử lý. Vui lòng thử lại.");
  }
});
