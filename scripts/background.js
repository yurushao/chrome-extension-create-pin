chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "create-pin-message") {
    console.log("background.js received message from content.js");

    const { link, title, board_id, image_url } = request;

    createPin(link, title, board_id, image_url);

    sendResponse({ message: "responseFromBackground" });
  }
});

const createPin = async (link, title, board_id, image_url) => {
  const accessToken = "YOU_ACCESS_TOKEN";

  // If you use a sandbox access token, the url domain should be api-sandbox.pinterest.com
  const url = "https://api-sandbox.pinterest.com/v5/pins";

  // Set the required parameters for the Pin
  const data = {
    link: link,
    title: title,
    board_id: board_id,
    media_source: {
      source_type: "image_url",
      url: image_url,
    },
  };

  const headers = new Headers({
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (response.status === 201) {
      console.log("Pin created successfully!");
      const responseData = await response.json();
      console.log(responseData);
    } else {
      console.error(`Error creating Pin. Status code: ${response.status}`);
      const errorData = await response.json();
      console.error(errorData);
    }
  } catch (error) {
    console.error("Error creating Pin:", error);
  }
};
