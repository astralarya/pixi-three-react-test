import {
  Canvas,
  type CanvasProps,
  type ConstructorRepresentation,
  extend,
  type ThreeToJSXElements,
} from "@react-three/fiber";
import { useRef, useState } from "react";
import { type WebGPURendererParameters } from "three/src/renderers/webgpu/WebGPURenderer.js";
import { WebGPURenderer } from "three/webgpu";
import * as THREE from "three/webgpu";
import { Application, extend as extendPixi } from "@pixi/react";
import { Graphics } from "pixi.js";
// import tunnel from "tunnel-rat";
//

extend(THREE as unknown as ConstructorRepresentation);
extendPixi({ Graphics });

declare module "@react-three/fiber" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface ThreeElements extends ThreeToJSXElements<typeof THREE> {}
}

export function PixiThreeCanvas({
  children,
  className,
  ...props
}: CanvasProps & { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasElement, setCanvasElement] = useState<
    HTMLCanvasElement | undefined
  >(undefined);
  const [canvasContext, setCanvasContext] = useState<
    GPUCanvasContext | undefined
  >(undefined);

  return (
    <div className={`${className} relative touch-none`} ref={containerRef}>
      <Canvas
        {...props}
        gl={async (props) => {
          const renderer = new WebGPURenderer({
            antialias: true,
            samples: 4,
            ...(props as WebGPURendererParameters),
          });
          await renderer.init();
          setCanvasElement(renderer.domElement);
          setCanvasContext(
            renderer.getContext() as unknown as GPUCanvasContext
          );
          return renderer;
        }}
        camera={{ manual: true }}
      >
        {children}
      </Canvas>
      {canvasContext && canvasElement && (
        <Application
          backgroundAlpha={0}
          preference="webgpu"
          context={canvasContext as unknown as WebGL2RenderingContext}
          autoStart={false}
          resizeTo={containerRef}
          clearBeforeRender={false}
          // canvas={canvasElement}
        >
          <pixiGraphics
            draw={(graphics) => {
              graphics.clear();
              graphics.setFillStyle({ color: "red" });
              graphics.rect(0, 0, 100, 100);
              graphics.fill();
            }}
          />
        </Application>
      )}
    </div>
  );
}
