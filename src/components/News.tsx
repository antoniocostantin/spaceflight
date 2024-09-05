import { useEffect, useState } from "react";
import { Article } from "../interface/interface";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row, Spinner } from "react-bootstrap";

function News() {
  const navigate = useNavigate();
  const [article, setArtcle] = useState<Article>({
    id: 0,
    title: "",
    url: "",
    image_url: "",
    news_site: "",
    summary: "",
    published_at: new Date(),
    updated_at: new Date(),
    featured: true,
    launches: [],
    events: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  const IDURL = "https://api.spaceflightnewsapi.net/v4/articles/";

  const fetchArticle = (): Promise<Article> => {
    return fetch(IDURL + params.newsId)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel recupero dei libri");
        }
      })
      .then((data) => {
        console.log(data);
        setArtcle(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  };

  useEffect(() => {
    fetchArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner variant="danger" />
      ) : (
        <Container>
          {" "}
          <Row className="justify-content-center">
            <Col xs={12} md={6}>
              <Link to={"/"} className="text-decoration-none text-black" >
                <h1 className="text-center">Spacefligth</h1>
              </Link>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12} md={9}>
              <h2>{article.title}</h2>
              <img alt="boh" src={article.image_url} className="object-fit-contain w-75" />
              <p>{article.summary}</p>
              <small>posted: {`${article.published_at}`}</small>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
export default News;
