/** @paper-design/shaders-react@0.0.60 */
import { Metaballs as Metaballs1 } from '@paper-design/shaders-react';

/**
 * Code exported from Paper
 * https://app.paper.design/file/01K95W8KQE6TWGTXKEQSZHVC1Z?node=01K95XV1HRY276NQTRT9W2J0KC
 * on Nov 3, 2025 at 2:43 PM.
 */
export default function Metaballs({ style = {}, variant = 'default' }) {
  const variants = {
    default: {
      speed: 1,
      count: 10,
      size: 0.83,
      scale: 1,
    },
    variant: {
      speed: 1.2,
      count: 12,
      size: 0.75,
      scale: 1.1,
    }
  };
  
  const config = variants[variant] || variants.default;
  
  return <Metaballs1 colors={['#007676', '#62B100', '#CCDAEC', '#226C49', '#00DAB4']} colorBack="#00000000" speed={config.speed} count={config.count} size={config.size} scale={config.scale} style={{ backgroundColor: 'transparent', height: '320px', width: '480px', ...style }} />;
}
