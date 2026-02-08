# Scanner Component

A cyberpunk-style 3D particle scanner effect with an interactive draggable card stream.

## Installation

1. **Copy the Folder**: Copy this entire `Scanner` folder into your project's components directory (e.g., `src/components/Scanner`).

2. **Install Dependencies**: This component requires `three.js`. Run the following command in your project root:

   ```bash
   npm install three @types/three
   ```

## Usage

Import and use the component in your React application:

```tsx
import Scanner from './components/Scanner';

function App() {
  return (
    <div className="App">
      <Scanner />
    </div>
  );
}
```

## Structure

- `index.tsx`: Main React component containing PartcleSystem (Three.js), ParticleScanner (Canvas 2D), and CardStreamController logic.
- `styles.css`: Scoped styles for the scanner layour and animations.

## Customization

- **Images**: The card images are currently hardcoded in `CardStreamController.createCardWrapper` (lines ~700). You can modify the `cardImages` array to use your own assets.
- **Colors**: Core colors are defined in `styles.css` and within the `ParticleSystem` class in `index.tsx`.
