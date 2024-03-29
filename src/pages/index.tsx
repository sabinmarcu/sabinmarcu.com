import { Link, FormattedMessage } from 'gatsby-plugin-react-intl';

import Image from '../components/image';
import SEO from '../components/seo';

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <h1>
      <FormattedMessage
        defaultMessage="Hi everyone"
        description="some description"
      />
    </h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: '300px', marginBottom: '1.45rem' }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
    <Link to="/cv/">
      <FormattedMessage
        defaultMessage="To CV"
        description="cv link"
      />
      [WIP]
    </Link>
    <br />
    <Link to="/using-typescript/">Go to &quot;Using TypeScript&quot;</Link>
  </>
);

export default IndexPage;
