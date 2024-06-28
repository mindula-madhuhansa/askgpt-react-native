import { POLLING_INTERVAL } from "@/constants";

export async function pollForImage(
  url: string,
  key: string,
  setImgUrl: (url: string) => void
) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });

    const data = await response.json();

    if (data.status === "processing") {
      setTimeout(() => pollForImage(url, key, setImgUrl), POLLING_INTERVAL);
    } else if (data.status === "succeeded") {
      const imageUrl = data.output[0];

      setImgUrl(imageUrl);
    } else if (data.status === "failed") {
      console.error("Image generation failed");
    } else {
      setTimeout(() => pollForImage(url, key, setImgUrl), POLLING_INTERVAL);
    }
  } catch (error) {
    console.error("Polling error:", error);
  }
}
