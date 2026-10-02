import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Seo } from "@/components/site/Seo";
import { Container, Heading, Body, ButtonLink } from "@/components/site/primitives";
import { useContent } from "@/i18n";

const NotFound = () => {
  const location = useLocation();
  const { NOT_FOUND, UI } = useContent();
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Container className="ks-section">
      <Seo title={UI.notFoundTitle} description={NOT_FOUND.body} path={location.pathname} />
      <p className="ks-label mb-4">{UI.pageNotFound}</p>
      <Heading as="h1" size="display-2">{NOT_FOUND.title}</Heading>
      <Body className="mt-6">{NOT_FOUND.body}</Body>
      <div className="mt-8">
        <ButtonLink to="/">{NOT_FOUND.cta}</ButtonLink>
      </div>
    </Container>
  );
};

export default NotFound;
