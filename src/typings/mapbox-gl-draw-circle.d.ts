
declare module 'mapbox-gl-draw-circle' {
  // Funky fresh import hacking
  declare type DrawCustomMode = import('@mapbox/mapbox-gl-draw').DrawCustomMode
  export const CircleMode: DrawCustomMode;
  export const DragCircleMode: DrawCustomMode;
  export const DirectMode: DrawCustomMode;
  export const SimpleSelectMode: DrawCustomMode;
}
