export const classifyurl = async (url) => {
  try {
    const response = await fetch('http://74.226.249.87:3000/api/submiturl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
      }),
    });

    const data = response.data.json();
    return data;

} catch (error) {
    console.log(error);
    console.log('classify function error');
  }
};
