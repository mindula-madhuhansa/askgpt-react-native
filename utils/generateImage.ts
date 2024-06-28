import { pollForImage } from "@/utils/pollForImage";

export async function generateImage(
  key: string,
  message: string,
  setImgUrl: (url: string) => void
) {
  try {
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        version:
          "ad59ca21177f9e217b9075e7300cf6e14f7e5b4505b87b9689dbd866e9768969",
        input: {
          seed: Math.floor(Math.random() * (4294967295 + 1)),
          width: 512,
          height: 512,
          prompt: message,
          num_outputs: 1,
          guidance_scale: 7,
          prompt_strength: 0.8,
          num_inference_steps: 50,
        },
      }),
    });

    const data = await response.json();
    const getUrl = data.urls.get;

    await pollForImage(getUrl, key, setImgUrl);
  } catch (error) {
    console.error("Failed to generate image:", error);
  }
}
