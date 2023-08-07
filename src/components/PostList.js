import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BsPlusCircleFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

function PostList() {
  const history = useHistory();

  const [posts, setPosts] = useState([]);

  const deletePost = async (id) => {
    const confirmation = window.confirm("Are you sure to delete ?");

    if (!confirmation) {
      return;
    }
    const response = await fetch(`${BASE_URL}/api/deletepost/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      history.push('/'); // Reload the page
      console.log(response);
    }
  };

  const getPosts = async () => {
    const response = await fetch(`${BASE_URL}/api/posts`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Container className="mt-5">
        <Button size="lg" variant="success">
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={"/create"}
          >
            Create Post <BsPlusCircleFill></BsPlusCircleFill>
          </Link>
        </Button>
        <Row className="mt-3" sm={1} md={3}>
          {posts.map((post) => (
            <Col key={post._id}>
              <Card className="mb-2">
                <Card.Body>
                  <Row className="mb-2">
                    <Col xs={8} md={7} lg={8}>
                      <Card.Title>{post.title}</Card.Title>
                    </Col>
                    <Col>
                      <Link to={`/update/${post._id}`}>
                        <AiOutlineEdit className="text-primary" role="button" />
                      </Link>
                    </Col>
                    <Col>
                      <AiFillDelete
                        className="text-danger"
                        role="button"
                        onClick={() => deletePost(post._id)}
                      />
                    </Col>
                  </Row>
                  <Card.Text>{post.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default PostList;
