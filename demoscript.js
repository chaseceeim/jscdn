// demo-config.js - Host this in your repo
const createDemoBox = (config) => {
  const {
    vimeoId,
    title = "Watch Demo Video",
    mobileOnly = true,
    width = "800",
    height = "450",
  } = config;

  if (!vimeoId) {
    console.error("Vimeo ID is required");
    return;
  }

  // Only show for mobile devices if mobileOnly is true
  if (mobileOnly && !/Mobi|Android/i.test(navigator.userAgent)) {
    return;
  }

  // Create modal
  const modal = document.createElement("div");
  modal.style.cssText = `
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.8);
      z-index: 2000;
      justify-content: center;
      align-items: center;
    `;

  // Create iframe container for proper responsive scaling
  const iframeContainer = document.createElement("div");
  iframeContainer.style.cssText = `
      position: relative;
      width: 90%;
      max-width: ${width}px;
      padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
    `;

  // Create Vimeo iframe
  const iframe = document.createElement("iframe");
  iframe.src = `https://player.vimeo.com/video/${vimeoId}?autoplay=1`;
  iframe.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
    `;
  iframe.allow = "autoplay; fullscreen";

  // Create close button
  const closeButton = document.createElement("button");
  closeButton.textContent = "×";
  closeButton.style.cssText = `
      position: absolute;
      top: -40px;
      right: 0;
      background: none;
      border: none;
      color: white;
      font-size: 30px;
      cursor: pointer;
    `;

  // Create demo box
  const container = document.createElement("div");
  container.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: white;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      z-index: 1000;
      max-width: 90%;
      width: 300px;
    `;

  // Create title
  const titleEl = document.createElement("h3");
  titleEl.textContent = title;
  titleEl.style.cssText = `
      margin: 0 0 10px 0;
      font-size: 16px;
      font-weight: 500;
    `;

  // Create button
  const button = document.createElement("button");
  button.textContent = "Watch Demo";
  button.style.cssText = `
      background: #00adef;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      width: 100%;
      font-weight: 500;
    `;

  // Add click handlers
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
      iframe.src = iframe.src; // Reset video
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

// Export for use in demos
window.createDemoBox = createDemoBox;
