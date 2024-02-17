export type EffectiveType = 'slow-2g' | '2g' | '3g' | '4g';

interface NetworkInformation {
  readonly saveData?: boolean;
  readonly effectiveType?: EffectiveType;
}

export interface NavigatorWithConnection extends Navigator {
  readonly connection?: NetworkInformation;
}
