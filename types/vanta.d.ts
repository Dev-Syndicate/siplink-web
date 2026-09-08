/**
 * Vanta ships no types. Only the globe effect is used, and only the options
 * the site actually passes are declared, so a typo in an option name is still
 * a compile error rather than silently ignored at runtime.
 */
declare module "vanta/dist/vanta.globe.min" {
  type VantaGlobeOptions = {
    el: HTMLElement;
    /**
     * Vanta bundles no three of its own — it reads this, or falls back to a
     * `THREE` global. Always pass the app's instance so the page does not end
     * up with two copies of three.js.
     */
    THREE: unknown;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    backgroundColor?: number;
    color?: number;
    color2?: number;
    size?: number;
  };

  export type VantaEffect = {
    destroy: () => void;
    resize: () => void;
    setOptions: (options: Partial<VantaGlobeOptions>) => void;
  };

  export default function GLOBE(options: VantaGlobeOptions): VantaEffect;
}
