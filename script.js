fetch("./data.json")
  .then((result) => {
    const json = result.json();
    return json;
  })
  .then((data) => {
    console.log(data[0].title);
  });
