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
            type: 'DOCUMENT_TEXT_DETECTION',
            maxResults: 10,
          },
        ],
      },
    ],
  };
  return body;
};

export const callGoogleVisionAsync = async (image: any) => {
  try {
    const parsedObj = {
      total: 0,
      store: '',
    };

    const body = generateBody(image); //pass in our image for the payload
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const resultRes = await response.json();
    // let store = null;
    console.log('line 40', resultRes);

    const detectedText = resultRes.responses[0].fullTextAnnotation;
    return detectedText ? detectedText : { text: "This image doesn't contain any text!" };

    // let test: string | string[] = JSON.stringify(resultRes);
    // console.log('line 42', test);
    // test = test.substring(test.lastIndexOf('"text\\'), test.lastIndexOf('}'));
    // test = test.split('\\n');

    // let result = -1;
    // for (var i in test) {
    //   if (test[i].toLowerCase().indexOf('total') !== -1 && test[i].toLowerCase().indexOf('subtotal') === -1) {
    //     let total = test[i].match(/\d+(?:\.\d+)?/g);
    //     if (total !== null) {
    //       result = parseInt(total[0]);
    //     }
    //     break;
    //   }
    //   // if (test[i].toLowerCase().includes("walmart")) {
    //   //   store = "Walmart";
    //   // } else if (test[i].toLowerCase().includes("target")) {
    //   //   store = "Target";
    //   // } else if (test[i].toLowerCase().includes("walgreens")) {
    //   //   store = "Walgreens";
    //   // }
    // }

    // parsedObj.total = result === -1 ? 0 : result;
    // parsedObj.store = store === null ? '' : store;

    // return parsedObj;
  } catch (err) {}

  // const detectedText = result.responses[0].fullTextAnnotation;
  // return detectedText ? detectedText : { text: "This image doesn't contain any text!" };
};
