window.onload = () => {
  const buttonCreatePin = document.getElementById("button-create-pin");
  if (buttonCreatePin) {
    buttonCreatePin.addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: createPinInBackground,
        });
      });
    });
  }
};

function createPinInBackground() {
  console.log("Send message to background.js");
  chrome.runtime.sendMessage(
    {
      message: "create-pin-message",
      link: "https://www.pexels.com/photo/kitten-standing-atop-wall-under-blue-sky-15940872/",
      title: "Kitten Standing atop Wall under Blue Sky",
      board_id: "706291222751574372",
      image_url:
        "https://images.pexels.com/photos/15940872/pexels-photo-15940872.jpeg",
    },
    (response) => {
      console.log(`response from background.js ${response.message}`);
    }
  );
}
