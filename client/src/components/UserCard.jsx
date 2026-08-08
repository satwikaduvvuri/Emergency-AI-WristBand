function UserCard({ user }) {
  return (
    <div className="card">
      <h2>👤 User Details</h2>

      <p>
        <strong>Name:</strong> {user?.name}
      </p>

      <p>
        <strong>Email:</strong> {user?.email}
      </p>

      <p>
        <strong>Phone:</strong> {user?.phone}
      </p>
    </div>
  );
}

export default UserCard;