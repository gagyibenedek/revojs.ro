import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";

import SpeakersListIndex from "@components/SpeakersListIndex";
import Subscribe from "@components/Subscribe";
import Button from "@components/Button";

import "./speakers.scss";

const Speakers = ({ data }) => {
  const { allSpeakersJson, speakerImages } = data;
  const speakers = allSpeakersJson.edges.map(e => e.node);
  const filteredRandomSpeakers = shuffle(speakers).filter((s, i) => i < 3);

  function shuffle(array) {
    return array.sort(function() {
      return 0.5 - Math.random();
    });
  }

  return (
    <section id="speakers" className="index-speakers-content">
      <h1 className="index-speakers-title">Speakers</h1>

      <SpeakersListIndex
        speakers={filteredRandomSpeakers}
        images={speakerImages}
      />

      {/* <p className="index-speakers-more mono">
        <strong>More speakers will be announced soon</strong>
        <br />
        <br />
        <strong className="highlight">Stay Tuned</strong>
      </p> */}

      <div style={{ textAlign: "center", marginTop: "5em" }}>
        <Link to="/speakers">
          <Button>Meet all the speakers</Button>
        </Link>
      </div>

      <div style={{ paddingTop: "96px" }} id="subscribe">
        <p style={{ textAlign: "center" }}>
          Subscribe to stay on top the latest changes and revo.news:
        </p>
        <Subscribe centered />
      </div>
    </section>
  );
};

export default props => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allSpeakersJson {
            edges {
              node {
                id
                firstname
                lastname
                image
                title
                company
              }
            }
          }
          speakerImages: allFile(
            filter: { relativePath: { glob: "speakers/*" } }
          ) {
            edges {
              node {
                base
                image: childImageSharp {
                  fluid(maxWidth: 400, maxHeight: 400, grayscale: true) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      `}
      render={data => <Speakers data={data} {...props} />}
    />
  );
};
