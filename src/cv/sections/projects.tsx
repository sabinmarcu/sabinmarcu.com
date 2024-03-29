import { FormattedMessage } from 'gatsby-plugin-react-intl';
import { useCV } from '../core';
import { Heading } from '../components/Heading';
import { List } from '../components/List';
import { ProjectItem } from '../components/ProjectItem';

export const ProjectsSection = () => {
  const { projects } = useCV();
  if (!projects) {
    return null;
  }
  return (
    <>
      <Heading section isTitle>
        <FormattedMessage
          defaultMessage="Projects"
          description="projects section"
        />
      </Heading>
      <List>
        {projects.map(({ id, ...rest }) => (
          <ProjectItem key={id} {...{ ...rest, id }} />
        ))}
      </List>
    </>
  );
};

export default ProjectsSection;
