declare module '@fortawesome/fontawesome-svg-core/import.macro' {
  import { IconDefinition, IconName } from '@fortawesome/fontawesome-svg-core';

  function brands(iconName: IconName): IconDefinition;
  function duotone(iconName: IconName): IconDefinition;
  function light(iconName: IconName): IconDefinition;
  function regular(iconName: IconName): IconDefinition;
  function solid(iconName: IconName): IconDefinition;
  function thin(iconName: IconName): IconDefinition;
}
