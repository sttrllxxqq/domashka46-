function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(xhr.statusText);
        }
      }
    };
    xhr.send();
  });
}

function fetchAndCombineChildren() {
  const url1 = 'data.json';
  const url2 = 'data2.json';

  const request1 = makeRequest(url1);
  const request2 = makeRequest(url2);

  Promise.all([request1, request2])
    .then(results => {
      const combinedChildren = results.reduce((acc, result) => {
        if (result.children) {
          acc.push(...result.children);
        }
        return acc;
      }, []);

      console.log(combinedChildren);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

fetchAndCombineChildren();
