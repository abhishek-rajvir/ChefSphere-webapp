export default function CreatorTable({ posts = [], followers = [] }) {
  return (
    <>
      {posts ? (
        <table
          border={1}
          style={{
            width: "100%",
            borderRadius: "10px",
            borderCollapse: "collapse",
          }}
          className="table table-hover">
          <thead>
            <tr>
              <th>pid</th>
              <th>Post Title</th>
              <th>Description</th>
              <th>Video</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p, i) => (
              <tr key={i}>
                <td>{p.pid}</td>
                <td>{p.post_title}</td>
                <td>{p.description}</td>
                <td dangerouslySetInnerHTML={{ __html: p.videoTag }}></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : followers ? (
        <table
          border={1}
          style={{
            width: "100%",
            borderRadius: "10px",
            borderCollapse: "collapse",
          }}
          className="table table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Username</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {followers.map((f, i) => (
              <tr key={i}>
                <td>{f.f_id}</td>
                <td>{f.username}</td>
                <td>{f.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <></>
      )}
    </>
  );
}
