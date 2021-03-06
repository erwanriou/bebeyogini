import React from "react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"

// IMPORT ACTIONS
import { deletePost, fetchPosts } from "@actions/postActions"

// IMPORT COMPONENTS
import PostList from "../../landing/post/PostList"
import isEmpty from "@utils/isEmpty"
import Spinner from "@common/Spinner"

class DashboardAdmin extends React.Component {
  componentDidMount() {
    this.props.fetchPosts()
  }
  render() {
    const { translate } = this.props
    const { posts, loading } = this.props.posts
    let postContent

    isEmpty(posts) || loading
      ? (postContent = <Spinner />)
      : (postContent = (
          <PostList
            posts={posts}
            translate={translate}
            pathname={this.props.location.pathname}
            handleDeletePost={this.props.deletePost}
          />
        ))

    return (
      <main>
        <div className="create-post">
          <h2>New Post</h2>
          <Link to="/dashboard/new-post">Create a new post</Link>
        </div>
        <div className="admin-posts">
          <h2>List of created posts</h2>
          {postContent}
        </div>
      </main>
    )
  }
}
const mapStateToProps = state => ({
  posts: state.posts
})

export default withRouter(
  connect(
    mapStateToProps,
    { fetchPosts, deletePost }
  )(DashboardAdmin)
)
