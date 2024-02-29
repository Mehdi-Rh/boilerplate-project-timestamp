const getData = async () => {
  const response = await fetch("http://localhost:3000/api/2015-12-25");
  const data = await response.json();
  console.log("first: ", { data });
  const code = document.getElementById("timestampId");
  code.innerHTML = `{"unix":${data.unix}, "utc":${data.date}}`;
  return data;
};

getData();
