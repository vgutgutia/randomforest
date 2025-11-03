/** @paper-design/shaders-react@0.0.60 */
import { MeshGradient as MeshGradient1 } from '@paper-design/shaders-react';

/**
 * Code exported from Paper
 * https://app.paper.design/file/01K95W8KQE6TWGTXKEQSZHVC1Z?node=01K95W9AQSGNME8J3A0BEQ6P69
 * on Nov 3, 2025 at 2:10 PM.
 */
export default function MeshGradient({ style = {}, variant = 'goal' }) {
  const configs = {
    goal: {
      colors: ['#DDF0DE', '#FFFFFF', '#6F9298', '#25523F'],
      distortion: 0.8,
      swirl: 0.1,
      defaultStyle: { height: '559px', width: '766px' }
    },
    about: {
      colors: ['#E0EAFF', '#004B43', '#85AB00', '#00967E'],
      distortion: 0.59,
      swirl: 0.53,
      defaultStyle: { height: '320px', width: '480px' }
    }
  };
  
  const config = configs[variant] || configs.goal;
  
  return <MeshGradient1 
    speed={1} 
    colors={config.colors} 
    distortion={config.distortion} 
    swirl={config.swirl} 
    grainMixer={0} 
    grainOverlay={0} 
    style={{ ...config.defaultStyle, ...style }} 
  />;
}
