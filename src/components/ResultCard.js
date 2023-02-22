import Card from "react-bootstrap/Card";

export default function ResultCard({unique_words, total_words}) {
  return (
    <>
      <Card
        bg={"success"}
        text={"white"}
        style={{ width: "18rem" }}
        className="mb-2"
      >
        <Card.Header style={{ fontSize: "25px", fontWeight: "800" }}>
          Result 
        </Card.Header>
        <Card.Body>
          <Card.Text>
                <p style={{ fontSize : "20px", fontWeight : "900"}}>{unique_words}  Unique Words</p>
                <p style =  {{ fontSize : "20px", fontWeight : "900"}}>{total_words}   Total Words</p>
                
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
