import React, { useMemo } from 'react';
import { useCV } from './core';
import { ExperienceItem } from './components';
import {
  Heading,
  List,
} from './style';

const diffTime = (a, b) => Math.sign(new Date(a) - new Date(b));
export const ExperienceSection = () => {
  const { workExperiences } = useCV();
  if (!workExperiences) {
    return null;
  }
  const filteredWorkExperiences = useMemo(
    () => workExperiences
      .map(({ positions, ...rest }) => ({
        time: positions.find(({ to }) => !to)
          || positions.sort(
            ({ to: toa }, { to: tob }) => diffTime(toa, tob),
          )[0],
        positions: positions.sort(
          ({ to: toa }, { to: tob }) => diffTime(tob, toa),
        ),
        ...rest,
      })).sort(({ time: timea }, { time: timeb }) => {
        if (!timea.to && !timeb.to) {
          return diffTime(timeb.from, timea.from);
        }
        if (!timea.to) {
          return -1;
        }
        if (!timeb.to) {
          return 1;
        }
        return diffTime(timeb.to, timea.to);
      }),
    [workExperiences],
  );
  return (
    <>
      <Heading section title>Experience</Heading>
      <List>
        {filteredWorkExperiences.map(({ id, ...rest }) => (
          <ExperienceItem key={id} {...{ ...rest, id }} />
        ))}
      </List>
    </>
  );
};

export default ExperienceSection;
