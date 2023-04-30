const API_KEY = 'AIzaSyCEupOcixhpaox8TJb2O4y_ENrzYE__9Qo';
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;
const generateBody = (image: any) => {
  const body = {
    requests: [
      {
        image: {
          content: image,
        },
        features: [
          {
            type: 'TEXT_DETECTION', //we will use this API for text detection purposes.
            maxResults: 1,
          },
        ],
      },
    ],
  };
  return body;
};

const callGoogleVisionAsync = async (image: any) => {
  const body = generateBody(image); //pass in our image for the payload
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();

  const detectedText = result.responses[0].fullTextAnnotation;
  return detectedText ? detectedText : { text: "This image doesn't contain any text!" };
};
export default callGoogleVisionAsync;
