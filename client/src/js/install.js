const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA

window.addEventListener("beforeinstallprompt", (event) => {
  window.deferredPrompt = event;

  // Remove the 'hidden' class from the install button container
  butInstall.classList.toggle("hidden", false);
});

butInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

    // Show the install prompt
  promptEvent.prompt();

    // Wait for the user to respond to the prompt
  window.deferredPrompt = null;

  butInstall.classList.toggle("hidden", true);
});

window.addEventListener("appinstalled", (event) => {
// Log install to analytics
  window.deferredPrompt = null;
});