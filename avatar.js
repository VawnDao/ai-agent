const avatarUpload = document.getElementById("avatar-upload");
const avatarPreview = document.getElementById("avatar-preview");
const audioUpload = document.getElementById("audio-upload");
const convertButton = document.getElementById("convert");
const registerAudioButton = document.getElementById("register-audio");
const registerAvatarButton = document.getElementById("register-avatar"); // Nút đăng ký avatar
const apiKey =
  "YjzwqDp4QfxH4wclj1hFzG869fYNM8XaAIMt4OdKGdIExCMll0ooqLNmGZfQJsbBm_s6qyCVQ4QOv6sK3jBHvg";

let selectedFile = null;
let audioUrl = null;
let avatarId = null; // Lưu trữ ID avatar sau khi đăng ký
let video_id = null;

// Lắng nghe sự kiện thay đổi file ảnh
avatarUpload.addEventListener("change", (event) => {
  selectedFile = event.target.files[0];
  if (selectedFile) {
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarPreview.src = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  }
});

// Xử lý đăng ký audio
registerAudioButton.addEventListener("click", async () => {
  const selectedAudio = audioUpload.files[0];
  if (!selectedAudio) {
    alert("Vui lòng chọn file âm thanh!");
    return;
  }

  const name = "Van Dao"; // Tên giọng nói
  const language = "vi"; // Ngôn ngữ (vi, en)
  const gender = "MALE"; // Giới tính (MALE, FEMALE)
  const age = "YOUNG"; // Độ tuổi (YOUNG, MIDDLE_AGED, OLD)
  const useCase = "CASUAL"; // Trường hợp sử dụng (CASUAL, NARRATION, ADVERTISEMENT, REPORTING)

  const audioFormData = new FormData();
  audioFormData.append("audio_file", selectedAudio);
  console.log({ name, language, gender, age, useCase, selectedAudio });
  try {
    const audioResponse = await fetch(
      `https://api.ausynclab.org/api/v1/voices/register?name=${encodeURIComponent(
        name
      )}&language=${language}&gender=${gender}&age=${age}&use_case=${useCase}`,
      {
        method: "POST",
        headers: {
          "X-API-Key": apiKey,
        },
        body: audioFormData,
      }
    );

    if (!audioResponse.ok) {
      const errorText = await audioResponse.text();
      console.error("Error:", errorText);
      throw new Error("Không thể đăng ký audio!");
    }

    const audioResult = await audioResponse.json();
    console.log("Audio registration result:", audioResult);
    const audioId = audioResult.result.id;

    // Lấy thông tin chi tiết giọng nói
    const voiceDetailsResponse = await fetch(
      `https://api.ausynclab.org/api/v1/voices/${audioId}`,
      {
        method: "GET",
        headers: {
          "X-API-Key": apiKey,
        },
      }
    );

    if (!voiceDetailsResponse.ok) {
      throw new Error("Không thể lấy thông tin giọng nói!");
    }

    const voiceDetails = await voiceDetailsResponse.json();
    audioUrl = voiceDetails.result.audio_url;

    console.log("Audio URL:", audioUrl);
    alert("Đăng ký audio thành công! URL: " + audioUrl);
  } catch (error) {
    console.error("Error:", error.message);
    alert(error.message);
  }
});

// Xử lý đăng ký avatar
registerAvatarButton.addEventListener("click", async () => {
  const avatarNameInput = document.getElementById("avatar-name"); // Lấy trường nhập liệu tên avatar
  const avatarName = avatarNameInput.value.trim(); // Lấy giá trị và loại bỏ khoảng trắng

  if (!avatarName) {
    alert("Vui lòng nhập tên avatar!");
    return;
  }

  if (!selectedFile) {
    alert("Vui lòng chọn file ảnh trước khi đăng ký avatar!");
    return;
  }

  try {
    const avatarFormData = new FormData();
    avatarFormData.append("avatar_file", selectedFile);

    const avatarResponse = await fetch(
      `https://api.ausynclab.org/api/v1/avatars/register?name=${encodeURIComponent(
        avatarName
      )}`,
      {
        method: "POST",
        headers: {
          "X-API-Key": apiKey,
        },
        body: avatarFormData,
      }
    );

    if (!avatarResponse.ok) {
      throw new Error("Không thể đăng ký avatar!");
    }

    const avatarResult = await avatarResponse.json();
    console.log("Avatar registration result:", avatarResult);
    avatarId = avatarResult.result.id;

    console.log("Avatar ID:", avatarId);
    alert("Đăng ký avatar thành công! ID: " + avatarId);
  } catch (error) {
    console.error("Error:", error.message);
    alert(error.message);
  }
});

// Lắng nghe sự kiện click nút Convert
convertButton.addEventListener("click", async () => {
  //   if (!avatarId || !audioUrl) {
  //     alert("Vui lòng đăng ký cả avatar và audio trước khi chuyển đổi!");
  //     return;
  //   }

  try {
    // Tạo video từ avatar và audio
    const videoResponse = await fetch(
      `https://api.ausynclab.org/api/v1/avatar-videos/generate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
        body: JSON.stringify({
          name: "Sample Video",
          avatar_id: "92ff6058-f546-4b87-a126-34c70260b299",
          audio_url:
            "https://cdn-ausync-endpoint.azureedge.net/voice-audio/854255f4-2e0a-11f0-a031-5699b3bf5506-ab2a47c1-5b9e-41aa-8171-a64b0481ac09.wav",
          callback_url:
            "https://webhook.site/019928d9-1798-464b-8445-19393dbe9524",
        }),
      }
    );

    if (!videoResponse.ok) {
      throw new Error("Không thể tạo video!");
    }

    const videoResult = await videoResponse.json();
    console.log("Video creation result:", videoResult);
    videoId = videoResult.result.video_id; // Lưu trữ ID videos
    console.log("Video created successfully:", videoResult.result.video_id);
    alert(`Video created successfully with ID: ${videoResult.result.video_id}`);
  } catch (error) {
    console.error("Error:", error);
    alert(error.message);
  }
});

const checkVideoStatusButton = document.getElementById("check-video-status");

checkVideoStatusButton.addEventListener("click", async () => {
  if (!videoId) {
    alert("Vui lòng tạo video trước khi kiểm tra trạng thái!");
    return;
  }

  const checkVideoStatus = async () => {
    try {
      const videoStatusResponse = await fetch(
        `https://api.ausynclab.org/api/v1/avatar-videos/${videoId}`,
        {
          method: "GET",
          headers: {
            "X-API-Key": apiKey,
          },
        }
      );

      if (!videoStatusResponse.ok) {
        throw new Error("Không thể lấy trạng thái video!");
      }

      const videoStatusResult = await videoStatusResponse.json();
      console.log("Video status result:", videoStatusResult);

      const videoStatus = videoStatusResult.result.status;

      if (videoStatus === "SUCCEED") {
        const videoLink = videoStatusResult.result.video_url;
        if (videoLink) {
          const videoContainer = document.getElementById("video-container");
          videoContainer.innerHTML = `<video controls width="600">
            <source src="${videoLink}" type="video/mp4">
            Trình duyệt của bạn không hỗ trợ video.
          </video>`;
        } else {
          alert("Video đã hoàn thành nhưng không có URL!");
        }
        return true; // Dừng kiểm tra khi thành công
      } else if (videoStatus === "FAILED") {
        alert("Video xử lý thất bại!");
        return true; // Dừng kiểm tra khi thất bại
      } else {
        console.log("Video đang xử lý, trạng thái:", videoStatus);
        return false; // Tiếp tục kiểm tra
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert(error.message);
      return true; // Dừng kiểm tra khi có lỗi
    }
  };

  // Lặp kiểm tra trạng thái
  const pollStatus = async () => {
    const interval = 5000; // 5 giây
    let isCompleted = false;

    while (!isCompleted) {
      isCompleted = await checkVideoStatus();
      if (!isCompleted) {
        await new Promise((resolve) => setTimeout(resolve, interval));
      }
    }
  };

  await pollStatus();
});
