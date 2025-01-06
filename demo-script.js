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

  // Change document.body to window.parent.document.body
  const parentDoc = window.parent.document;

  // Create elements using the parent document
  const modal = parentDoc.createElement("div");
  modal.className = "demo-modal";

  const iframeContainer = parentDoc.createElement("div");
  iframeContainer.className = "demo-iframe-container";
  iframeContainer.style.maxWidth = `${width}px`;

  const iframe = parentDoc.createElement("iframe");
  iframe.className = "demo-iframe";
  iframe.src = `https://player.vimeo.com/video/${vimeoId}?autoplay=1`;
  iframe.allow = "autoplay; fullscreen";

  const closeButton = parentDoc.createElement("button");
  closeButton.className = "demo-close-button";
  closeButton.textContent = "×";

  const container = parentDoc.createElement("div");
  container.className = "demo-container";

  const titleEl = parentDoc.createElement("h3");
  titleEl.className = "demo-title";
  titleEl.textContent = title;

  const button = parentDoc.createElement("button");
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

  parentDoc.body.appendChild(modal);
  parentDoc.body.appendChild(container);
};

window.createDemoBox = createDemoBox;

// Inject CSS into parent document
const style = window.parent.document.createElement("link");
style.rel = "stylesheet";
style.href = "https://cdn.jsdelivr.net/gh/chaseceeim/jscdn/demo-styles.css";
window.parent.document.head.appendChild(style);
