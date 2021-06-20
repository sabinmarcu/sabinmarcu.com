import {
  useState,
  useCallback,
  useMemo,
} from 'react';

import { Icon } from '@mdi/react';
import {
  mdiStar,
  mdiStarHalfFull,
  mdiStarOutline,
} from '@mdi/js';

import { TextField } from '@material-ui/core';

import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useCV } from '../core';
import { Heading } from '../components/Heading';
import { DetailsItemIconRaw } from '../components/DetailsItem';
import {
  Pill,
  PillGroup,
  PillList,
  PillSeparator,
} from '../components/Pill';
import { EnhancedSkill } from '../types';
import { useMatchMedia } from '../../hooks/useMatchMedia';

export const StrengthsSection = ({ title = 'Strengths ' }) => {
  const { skills } = useCV();
  const isPrint = useMatchMedia('!print');
  const [showStars, setShowStars] = useLocalStorage('showStars', false);
  const shouldShowStars = useMemo(
    () => !isPrint && showStars,
    [isPrint, showStars],
  );
  const toggleStars = useCallback(
    () => setShowStars((s) => !s),
    [setShowStars],
  );
  const [filter, setFilter] = useState('');
  const filterHandler = useCallback(
    ({ target: { value } }) => setFilter(value.toLowerCase()),
    [setFilter],
  );

  const filteredSkills = skills
    .filter(({
      name,
      category,
    }) => name.toLowerCase().includes(filter)
      || category.toLowerCase().includes(filter));

  const groupedSkills: Record<string, EnhancedSkill[]> = useMemo(
    () => {
      if (!filteredSkills) {
        return null;
      }
      return filteredSkills.reduce(
        (prev: any, { category, ...rest }) => ({
          ...prev,
          [category]: [...(prev[category] || []), {
            ...rest,
            stars: new Array(5).fill(0).map((_, idx) => {
              const diff = rest.ability - idx;
              if (diff > 0) {
                if (diff >= 1) {
                  return [idx, mdiStar];
                }
                return [idx, mdiStarHalfFull];
              }
              return [idx, mdiStarOutline];
            }),
          }],
        }),
        {},
      );
    },
    [filteredSkills],
  );
  if (!groupedSkills) {
    return null;
  }
  return (
    <>
      <Heading section isTitle>
        {title}
        {!isPrint
          && (
          <DetailsItemIconRaw onClick={toggleStars}>
            <Icon path={showStars ? mdiStar : mdiStarOutline} size="1em" />
          </DetailsItemIconRaw>
          )}
      </Heading>
      {shouldShowStars && (
        <TextField
          label="Filter Skills"
          placeholder="React"
          value={filter}
          onChange={filterHandler}
          fullWidth
          variant="outlined"
          style={{ background: 'white', margin: '10px 0' }}
        />
      )}
      <PillList>
        {Object
          .entries(groupedSkills)
          .filter(([key]) => key !== 'dictlang')
          .map(([category, s]) => (
            <PillGroup key={category}>
              {s.map(({
                id,
                name,
                stars,
                ability,
              }) => (
                <Pill
                  key={id}
                  oneLine={shouldShowStars}
                  title={`${name}: ${ability}/5`}
                >
                  <span>{name}</span>
                  {shouldShowStars && (
                  <div>
                    <PillSeparator />
                      {stars.map(([key, star]) => (
                        <DetailsItemIconRaw key={key} padding="0">
                          <Icon path={star} size="1.2rem" />
                        </DetailsItemIconRaw>
                      ))}
                  </div>
                  )}
                </Pill>
              ))}
            </PillGroup>
          ))}
      </PillList>
      {groupedSkills.dictlang && groupedSkills.dictlang.length > 0 && (
        <>
          <Heading section isTitle>Languages</Heading>
          <PillList>
            <PillGroup>
              {groupedSkills.dictlang.map(({
                id,
                name,
                stars,
                ability,
              }) => (
                <Pill key={id} oneLine title={`${name}: ${ability}/5`}>
                  <span>{name}</span>
                  <div>
                    <PillSeparator />
                    {stars.map(([key, star]) => (
                      <DetailsItemIconRaw key={key} padding="0">
                        <Icon path={star} size="1.2rem" />
                      </DetailsItemIconRaw>
                    ))}
                  </div>
                </Pill>
              ))}
            </PillGroup>
          </PillList>
        </>
      )}
    </>
  );
};

export default StrengthsSection;