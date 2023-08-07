import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Link,useNavigate } from "react-router-dom";

function AddPost() {
  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title) {
      alert("Please enter title");
      return;
    }
    if (!description) {
      alert("Please enter description");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/createpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      if (response.ok) {
        console.log(response);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <>
      <Container className="mt-5">
        <Row className="mt-3">
          <Col xs={{span: 9, offset: 2}} md={{ span: 8 }} lg={{span: 6, offset: 3}}>
            <h1 className="display-6 text-center mb-3">
              Create Post
            </h1>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="enter title"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="enter description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Button variant="dark" type="button">
              <Link className="text-decoration-none text-white" to={"/"}>cancel</Link>
              </Button>

              {!loading && (
                <Button type="submit" className="mx-2">
                  Create
                </Button>
              )}

              {loading && (
                <Button variant="primary" className="mx-2" disabled>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Loading...
                </Button>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AddPost;

