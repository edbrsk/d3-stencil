const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    const docsUrl = this.props.config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    return `${baseUrl}${docsPart}${langPart}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a
            href="https://code.facebook.com/projects/"
            target="_blank"
            rel="noreferrer noopener"
            className="fbOpenSource"
          >
            <img
              src={`${this.props.config.baseUrl}img/oss_logo.png`}
              alt="Facebook Open Source"
              width="170"
              height="45"
            />
          </a>

          <a
            href="https://twitter.com/edbrsk"
            target="_blank"
            rel="noreferrer noopener"
          >
            Twitter
          </a>

          <a
            href="https://d3-stencil.slack.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            Slack channel
          </a>

          <a href="https://npmjs.com/package/d3-stencil">NPM Package</a>

          <a href={this.docUrl('dev/dev-intro.html')}>
            Contribute to D3-Stencil
          </a>

          {this.props.config.footerIcon && (
            <img
              src={this.props.config.baseUrl + this.props.config.footerIcon}
              alt={this.props.config.title}
              width="130"
              height="40"
            />
          )}
        </section>

        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
