import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { AnchorVariant } from '../../enums/Index';
import Anchor from './Anchor';

interface EdgeData {
  node: {
    frontmatter: {
      slug: string;
      title: string;
      date: string;
    };
  };
}

const PostLinks: React.FC = () => {
  return (
    <StaticQuery
      query={graphql`
        query MyQuery {
          allMarkdownRemark {
            edges {
              node {
                id
                frontmatter {
                  date(formatString: "DD  MMMM, YYYY")
                  slug
                  title
                }
              }
            }
          }
        }
      `}
      render={(data) => (
        <ul>
          {data.allMarkdownRemark.edges.map((edge: EdgeData, index: number) => (
            <li key={index}>
              <Anchor
                url={edge.node.frontmatter.slug}
                title={edge.node.frontmatter.title}
                variant={AnchorVariant.LINK}
              >
                <h2>{edge.node.frontmatter.title}</h2>
                <p>{edge.node.frontmatter.date}</p>
              </Anchor>
            </li>
          ))}
        </ul>
      )}
    />
  );
};

export default PostLinks;
