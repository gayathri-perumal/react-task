import React, { Component } from "react";
import fire from "../config/Fire";

class Showpost extends Component {
  constructor(props) {
    super(props);
    this.ref = fire.firestore().collection("posts");
    this.unsubscribe = null;
    this.state = {
      posts: [],
      keyid: ""
    };
  }

  onCollectionUpdate = querySnapshot => {
    const posts = [];
    querySnapshot.forEach(doc => {
      const { title, description, author } = doc.data();
      posts.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        author
      });
    });
    this.setState({
      posts
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  singlepost = key => {
    this.setState({
      keyid: key
    });
    alert(this.state.keyid);
  };

  render() {
    var postkey = this.state.keyid;
    return (
      <div className="postlist">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => {
              if (post.author === fire.auth().currentUser.email)
                return (
                  <tr onClick={() => this.singlepost(post.key)}>
                    <td>{post.title}</td>
                    <td>{post.description}</td>
                    <td>{post.author}</td>
                    <td>{post.key}</td>
                  </tr>
                );
            })}
          </tbody>
        </table>
        <div className="dummy">
          hi
          {this.state.posts.map(post => {
            if (post.key === postkey)
              return (
                <tr onClick={() => this.singlepost(post.key)}>
                  <td>{post.title}</td>
                  <td>{post.description}</td>
                  <td>{post.author}</td>
                  <td>{post.key}</td>
                </tr>
              );
          })}
        </div>
      </div>
    );
  }
}
export default Showpost;
