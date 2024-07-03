const manifestUri =
  "https://storage.googleapis.com/shaka-demo-assets/tos-surround/dash.mpd";

async function init() {
  const video = document.getElementById("video");
  const ui = video["ui"];
  const controls = ui.getControls();
  const player = controls.getPlayer();

  player.configure({
    preferredAudioChannelCount: 6,
  });

  window.player = player;
  window.ui = ui;

  player.addEventListener("error", onPlayerErrorEvent);
  controls.addEventListener("error", onUIErrorEvent);

  try {
    await player.load(manifestUri);
    console.log("Loaded!");
  } catch (error) {
    onPlayerError(error);
  }
}

function onPlayerErrorEvent(errorEvent) {
  onPlayerError(event.detail);
}

function onPlayerError(error) {
  console.error("Error code", error.code, "object", error);
}

function onUIErrorEvent(errorEvent) {
  onPlayerError(event.detail);
}

function initFailed(errorEvent) {
  console.error("Failed to load UI:", errorEvent.detail.reason);
}

document.addEventListener("shaka-ui-loaded", init);
document.addEventListener("shaka-ui-load-failed", initFailed);
