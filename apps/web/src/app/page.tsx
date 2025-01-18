import { Container } from '@pdf-generation-comparison/ui/server';
import {
  NavigationItem,
  NavigationList,
  NavigationSection,
} from '@pdf-generation-comparison/ui';

import { engines } from '../constants/engines';

export default function Index() {
  return (
    <Container>
      <NavigationList>
        <NavigationSection title="Rendering Engines">
          {engines.map((lib) => (
            <NavigationItem key={lib} title={lib} href={`/engines/${lib}`} />
          ))}
        </NavigationSection>
      </NavigationList>
    </Container>
  );
}
