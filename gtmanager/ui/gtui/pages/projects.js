export default function Projects({ user }) {
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

    // Send data to database
    const response = await user.callFunction("storeProjectsInfo", {
      project_id: data.pid,
      public_key: data.pubkey,
      private_key: data.prikey,
    });
  };
  return (
    // We pass the event to the handleSubmit() function on submit.
    <html>
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="pid">Atlas Project ID</label>
          <span>&nbsp;</span>
          <input type="text" id="pid" name="pid" required />
          <span>&nbsp;</span>

          <label htmlFor="pubkey">Public Key</label>
          <span>&nbsp;</span>
          <input type="text" id="pubkey" name="pubkey" required />
          <span>&nbsp;</span>

          <label htmlFor="prikey">Private Key</label>
          <span>&nbsp;</span>
          <input type="text" id="prikey" name="prikey" required />
          <span>&nbsp;</span>

          <button type="submit">Submit</button>
        </form>
      </div>
    </html>
  );
}
