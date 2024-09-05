import { useEffect, useState } from "react";
import { News } from "../interface/interface";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate()

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <Container>
        <Row className="justify-content-center">
            <Col xs={12} md={6} ><h1 className="text-center">Spacefligth</h1></Col>
        </Row>
      <Row xs={{cols:1}} md={{cols:3}} xl={{cols:4}} className="g-3" >  
        {news.map((n) =>{
            return(
                <Col key={n.id}>
                <Card className="h-100" >
                <Card.Img variant="top" src={n.image_url} />
                <Card.Body>
                  <Card.Title>{n.title}</Card.Title>
                  <Card.Text>
                    {n.summary}
                  </Card.Text>
                  <Button onClick={()=>{
                    navigate(`/${n.id}`)
                  }} variant="outline-dark">Go to article</Button>
                </Card.Body>
              </Card></Col>
            )
        })}
      </Row>
    </Container>
  );
}
export default Home;
