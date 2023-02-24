import "./App.css";
import Header from "./components/Navbar";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import axios from "axios";
import Background from "./assets/pic.jpg";
import ResultCard from "./components/ResultCard";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [words, setWords] = useState();
  const [uploaded, setUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setUploaded(true);
  //   setIsLoading(true);
  //   const formData = new FormData();
  //   formData.append('file', selectedFile);

  const fetchLongRequest = async (event) => {
    event.preventDefault();
    setUploaded(true);

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    const waitTime = 10000;
    const handleError = (error) => {
      // this makes sure that the FAIL output isn't repeated in the case when there's a failure before the timeout
      if (!error.handled) {
        if (error.timedout) {
          console.log("TIMEDOUT", error.timedout);
          alert(error.timedout);
          setIsLoading(false);
        } else {
          console.log("FAIL!", error.message);
          alert(error.message);
          setIsLoading(false);
          error.handled = true;
          throw error;
        }
      }
    };
    const makeRequest = async () => {
      try {
        await axios({
          method: "post",
          mode: "cors",
          url: "http://127.0.0.1:5000/count",
          data: formData,
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => {
            return response;
          })
          .then((data) => {
            setIsLoading(false);
            setWords(data.data);
          });
      } catch (error) {
        return handleError(error);
      }
    };
    const timer = new Promise((_, reject) =>
      setTimeout(reject, waitTime, { timedout: "request taking a long time" })
    );
    try {
      await Promise.race([makeRequest(), timer]);
    } catch (error) {
      handleError(error);
    }
  };

  //   try {
  //     axios({
  //       method: 'post',
  //       mode: 'cors',
  //       url: 'https://unique-counter.herokuapp.com/count',
  //       data: formData,
  //       headers: { 'Content-Type': 'application/json' },
  //     })
  //       .then((response) => {
  //         return response;
  //       })
  //       .then((data) => {
  //         setIsLoading(false);
  //         setWords(data.data);
  //       });
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.log(error.response);
  //     alert('error');
  //   }
  // };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  if (!uploaded) {
    return (
      <div className="App" style={{ minHeight: "100vh" }}>
        <Header />

        <Row
          style={{
            backgroundImage: `url(${Background})`,
            backgroundSize: "cover",
            opacity: "1",
          }}
        >
          <div style={{ backgroundColor: "#225470", opacity: "0.81" }}>
            <Container style={{ height: "95vh" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  marginTop: "115px",
                }}
              >
                <div>
                  <h2 style={{ color: "white" }}>
                    Upload your documents ( PDF, docx and Excel only ) to get an
                    instant count of the number of words in your document.
                  </h2>
                </div>
                <div>
                  <h3 style={{ color: "white", marginTop: "30px" }}>
                    Please note that we don't store any documents you upload
                    here..
                  </h3>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "55%",
                  alignContent: "space-between",
                }}
              >
                <h1 style={{ color: "white" }}>Unique Words counter </h1>
                <Form onSubmit={fetchLongRequest}>
                  <div
                    style={{
                      marginBottom: "30px",
                      fontSize: "1.5rem",
                      color: "white",
                    }}
                  >
                    Upload .pdf, .docx or .xlsx file{" "}
                  </div>

                  <div>
                    <Form.Group name="file" controlId="file" className="mb-3">
                      <Form.Control
                        name="file"
                        type="file"
                        size="lg"
                        onChange={handleFileSelect}
                      />
                    </Form.Group>
                  </div>

                  <button
                    type="submit"
                    variant="primary"
                    class="btn btn-outline-light"
                    value="Upload File"
                  >
                    Submit
                  </button>
                </Form>
              </div>
            </Container>
          </div>
        </Row>
      </div>
    );
  }

  return (
    <div className="App" style={{ minHeight: "100vh" }}>
      <Header />
      <Row
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover",
          opacity: "1",
        }}
      >
        <div style={{ backgroundColor: "#225470", opacity: "0.81" }}>
          <Container
            style={{
              backgroundColor: "#225470",
              height: "95vh",
              opacity: "0.81",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                alignContent: "space-between",
                color: "white",
              }}
            >
              {isLoading ? (
                <>
                  <h1 style={{ color: "white" }}>Please Wait </h1>
                  <div class="spinner-border text-light" role="status">
                    <span class="sr-only"></span>
                  </div>
                </>
              ) : (
                words && (
                  <>
                    <ResultCard
                      unique_words={words.unique_words}
                      total_words={words.total_words}
                    />

                    <div>
                      <button
                        variant="primary"
                        class="btn btn-outline-light"
                        value="back  "
                        onClick={() => {
                          setUploaded(false);
                          setWords();
                        }}
                      >
                        sumbit another file
                      </button>
                    </div>
                  </>
                )
              )}
            </div>
          </Container>
        </div>
      </Row>
    </div>
  );
}

export default App;
