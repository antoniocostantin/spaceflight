import { useEffect, useState } from "react";
import { News } from "../interface/interface";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

function Home() {
  const [news, setNews] = useState<News[]>([]);

  const URL = "https://api.spaceflightnewsapi.net/v4/articles/";

  const fetchNews = (): Promise<News[] | string> => {
    return fetch(URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel recupero dei libri");
        }
      })
      .then((data) => {
        console.log(data);
        setNews(data.results);
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <Container>
      <Row xs={{cols:1}} md={{cols:3}} xl={{cols:4}}>
        {news.map((n) =>{
            return(
                <Col>
                <Card>
                <Card.Img variant="top" src={n.image_url} />
                <Card.Body>
                  <Card.Title>{n.title}</Card.Title>
                  <Card.Text>
                    {n.summary}
                  </Card.Text>
                  <Button variant="outline-dark">Go somewhere</Button>
                </Card.Body>
              </Card></Col>
            )
        })}
      </Row>
    </Container>
  );
}
export default Home;
