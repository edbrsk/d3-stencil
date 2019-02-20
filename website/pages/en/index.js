const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const { siteConfig, language = '' } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;
    const imgUrl = imgPath => `${baseUrl}${imgPath}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    const GithubButton = () => (
      <a
        className="github-button"
        href="https://github.com/edgarordonez/d3-stencil"
        data-icon="octicon-star"
        data-count-href="/edgarordonez/d3-stencil"
        data-show-count="true"
        data-count-api="/repos/edgarordonez/d3-stencil#stargazers_count"
        data-count-aria-label="# stargazers on GitHub"
        aria-label="Star edgarordonez/d3-stencil on GitHub"
      >
        Star
      </a>
    );

    return (
      <SplashContainer>
        <div className="inner">
          <div>
            <Logo img_src={imgUrl('img/d3-stencil_logo_main.png')} />
            <ProjectTitle siteConfig={siteConfig} />
          </div>
          <PromoSection>
            <Button href={docUrl('basics/basics-install.html')}>
              Getting started
            </Button>
            <Button href={docUrl('api/api-introduction.html')}>
              API Reference
            </Button>
          </PromoSection>
          <GithubButton />
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = '' } = this.props;
    const { baseUrl } = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}
      >
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const Features = () => (
      <Block layout="fourColumn">
        {[
          {
            content:
              'Choose the right chart. Put your data into d3-stencil, and visualise it.',
            image: `${baseUrl}img/clock-emoji.png`,
            imageAlign: 'top',
            title: 'Simple',
          },
          {
            content:
              'D3.js is an incredible library, and Stencil, as they said, are just Web Components, so they work with any major framework or no framework at all.',
            image: `${baseUrl}img/fire-emoji.png`,
            imageAlign: 'top',
            title: 'D3 - Stencil',
          },
          {
            content:
              'The only limit is your own imagination. If you like what you see, add more graphs.',
            image: `${baseUrl}img/puzzle-emoji.png`,
            imageAlign: 'top',
            title: 'Extensible',
          },
        ]}
      </Block>
    );

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Features />
        </div>
      </div>
    );
  }
}

module.exports = Index;
