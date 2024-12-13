// demo-script.js
console.log("Demo script loaded");

const createDemoBox = (config) => {
  const {
    vimeoId,
    title = "Watch Demo Video",
    mobileOnly = true,
    width = "800",
  } = config;

  if (!vimeoId) {
    console.error("Vimeo ID is required");
    return;
  }

  if (mobileOnly && !/Mobi|Android/i.test(navigator.userAgent)) {
    return;
  }

  // Create elements
  const modal = document.createElement("div");
  modal.className = "demo-modal";

  const iframeContainer = document.createElement("div");
  iframeContainer.className = "demo-iframe-container";
  iframeContainer.style.maxWidth = `${width}px`;

  const iframe = document.createElement("iframe");
  iframe.className = "demo-iframe";
  iframe.src = `https://player.vimeo.com/video/${vimeoId}?autoplay=1`;
  iframe.allow = "autoplay; fullscreen";

  const closeButton = document.createElement("button");
  closeButton.className = "demo-close-button";
  closeButton.textContent = "×";

  const container = document.createElement("div");
  container.className = "demo-container";

  const titleEl = document.createElement("h3");
  titleEl.className = "demo-title";
  titleEl.textContent = title;

  const button = document.createElement("button");
  button.className = "demo-button";
  button.textContent = "Watch Demo";

  // Add event handlers
  button.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
    iframe.src = iframe.src; // Reset video
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      iframe.src = iframe.src;
    }
  });

  // Assemble elements
  iframeContainer.appendChild(iframe);
  iframeContainer.appendChild(closeButton);
  modal.appendChild(iframeContainer);
  container.appendChild(titleEl);
  container.appendChild(button);

  document.body.appendChild(modal);
  document.body.appendChild(container);
};

window.createDemoBox = createDemoBox;
