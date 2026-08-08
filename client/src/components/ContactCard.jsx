function ContactCard({
  contacts,
  contactData,
  handleContactChange,
  addContact,
}) {
  return (
    <div className="card">
      <h2>📞 Emergency Contacts</h2>

      <input
        type="text"
        name="name"
        placeholder="Contact Name"
        value={contactData.name}
        onChange={handleContactChange}
      />

      <br /><br />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={contactData.phone}
        onChange={handleContactChange}
      />

      <br /><br />

      <input
        type="text"
        name="relation"
        placeholder="Relation"
        value={contactData.relation}
        onChange={handleContactChange}
      />

      <br /><br />

      <button onClick={addContact}>
        ➕ Add Contact
      </button>

      <hr />

      {contacts.length === 0 ? (
        <p>No Contacts Added</p>
      ) : (
        contacts.map((contact) => (
          <div key={contact._id}>
            <h4>{contact.name}</h4>
            <p>{contact.phone}</p>
            <p>{contact.relation}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default ContactCard;
