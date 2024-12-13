// demo-config.js - Host this in your repo
const createDemoBox = (config) => {
  const {
    videoId = "",
    title = "Watch Demo Video",
    mobileOnly = true,
  } = config;

  // Only show for mobile devices if mobileOnly is true
  if (mobileOnly && !/Mobi|Android/i.test(navigator.userAgent)) {
    return;
  }

  // Create container
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
  button.textContent = "Watch Now";
  button.style.cssText = `
      background: #007bff;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      width: 100%;
    `;

  // Add click handler
  button.addEventListener("click", () => {
    // Open video in a modal, new tab, or however you prefer
    window.open(`https://your-video-platform.com/embed/${videoId}`, "_blank");
  });

  // Assemble elements
  container.appendChild(titleEl);
  container.appendChild(button);
  document.body.appendChild(container);
};

// Export for use in demos
window.createDemoBox = createDemoBox;
