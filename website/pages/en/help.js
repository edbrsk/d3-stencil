const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

function Help(props) {
  const { config: siteConfig, language = '' } = props;
  const { baseUrl, docsUrl } = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
  const langPart = `${language ? `${language}/` : ''}`;
  const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

  const supportLinks = [
    {
      title: 'Browse Docs',
      content: `Find what you're looking for in our detailed documentation and guides.

       \n- Learn how to get started with [D3-Stencil](${docUrl(
         'basics/basics-install.html',
       )})

       \n- Look at the full [API Reference](${docUrl(
         'api/api-introduction.html',
       )}).
      `,
    },
    {
      title: 'Join the community',
      content: `Ask questions and find answers from other D3-Stencil users like you.

      \n- Join to [D3-Stencil](https://d3-stencil.slack.com/) Slack channel.

      \n- Many members of the D3-Stencil use [Github](https://github.com/edgarordonez/d3-stencil). Read through the existing issues or ask your own!
      `,
    },
    {
      title: 'Stay up to date',
      content: `Find out what's new with D3-Stencil

      \n- Follow [D3-Stencil](https://twitter.com/edbrsk) news on Twitter.
      `,
    },
  ];

  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <div className="post">
          <header className="postHeader">
            <h1>Need help?</h1>
          </header>
          <p>
            This project is maintained by{' '}
            <a href="https://github.com/edgarordonez/">Edgar Ordóñez</a>.
          </p>
          <GridBlock contents={supportLinks} layout="threeColumn" />
        </div>
      </Container>
    </div>
  );
}

module.exports = Help;
