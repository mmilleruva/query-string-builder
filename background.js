chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      // Define the query string parameters you want to add
      const paramsToAdd = {
        "android": "true" // You can make this dynamic if needed
      };
  
      try {
        const url = new URL(details.url);
        const searchParams = new URLSearchParams(url.search);
  
        // Add the new parameters
        for (const key in paramsToAdd) {
          if (paramsToAdd.hasOwnProperty(key)) {
            searchParams.set(key, paramsToAdd[key]);
          }
        }
  
        // Reconstruct the URL with the added parameters
        const newUrl = url.origin + url.pathname + "?" + searchParams.toString() + url.hash;
  
        // Redirect the request to the modified URL
        return { redirectUrl: newUrl };
  
      } catch (error) {
        console.error("Error processing URL:", error);
      }
    },
    { urls: ["<all_urls>"] }, // Apply this to all URLs
    ["blocking"] // Allows us to modify the request
  );