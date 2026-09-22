/**
 * Spotify iFrame API, loaded on first use. See https://developer.spotify.com/documentation/embeds.
 */
export interface SpotifyController {
  play: () => void;
  togglePlay?: () => void;
}

interface SpotifyIFrameAPI {
  createController: (
    element: Element,
    options: { uri: string; width?: string | number; height?: number },
    callback: (controller: SpotifyController) => void,
  ) => void;
}

const SCRIPT_URL = "https://open.spotify.com/embed/iframe-api/v1";
let api: Promise<SpotifyIFrameAPI> | null = null;

export function loadSpotifyIframeApi(): Promise<SpotifyIFrameAPI> {
  api ??= new Promise((resolve, reject) => {
    (window as unknown as { onSpotifyIframeApiReady: (a: SpotifyIFrameAPI) => void }).onSpotifyIframeApiReady = resolve;
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    script.onerror = () => {
      api = null;
      reject(new Error("Spotify iFrame API failed to load"));
    };
    document.head.appendChild(script);
  });
  return api;
}
