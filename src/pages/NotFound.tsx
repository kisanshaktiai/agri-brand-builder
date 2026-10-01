import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Seo } from "@/components/site/Seo";
import { Container, Heading, Body, ButtonLink } from "@/components/site/primitives";
import { NOT_FOUND } from "@/content/pages";

const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Container className="ks-section">
      <Seo title="Page not found — KisanShakti AI" description={NOT_FOUND.body} path={location.pathname} />
      <p className="ks-label mb-4">404</p>
      <Heading as="h1" size="display-2">{NOT_FOUND.title}</Heading>
      <Body className="mt-6">{NOT_FOUND.body}</Body>
      <div className="mt-8">
        <ButtonLink to="/">{NOT_FOUND.cta}</ButtonLink>
      </div>
    </Container>
  );
};

export default NotFound;
