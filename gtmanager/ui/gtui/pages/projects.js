export default function PageWithJSbasedForm() {
  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    const data = {
      pid: event.target.pid.value,
      pubkey: event.target.pubkey.value,
      prikey: event.target.prikey.value,
    };

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = "/api/form";

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();
    alert(`Is this your full name: ${result.data}`);
  };
  return (
    // We pass the event to the handleSubmit() function on submit.
    <form onSubmit={handleSubmit}>
      <label htmlFor="pid">Atlas Project ID</label>
      <input type="text" id="pid" name="pid" required />

      <label htmlFor="pubkey">Public Key</label>
      <input type="text" id="pubkey" name="pubkey" required />

      <label htmlFor="prikey">Private Key</label>
      <input type="text" id="prikey" name="prikey" required />

      <button type="submit">Submit</button>
    </form>
  );
}
